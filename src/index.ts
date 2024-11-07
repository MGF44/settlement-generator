import {
  Archetype,
  MagicLevel,
  SetOptions,
  SettlementIncrementor,
  SettlementSize,
} from "./types/generator-options";
import randomInt, {
  randomNumbersWithFixedSum,
} from "./shared/random-int";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { getClimates } from "./db/querys/nature/climate";
import { getLandforms } from "./db/querys/nature/landform";
import { getSpecies } from "./db/querys/species/species";
import { IClimate } from "./db/interfaces/land/climate";
import ILandform from "./db/interfaces/land/landform";
import { ISpecies } from "./db/interfaces/npc/species";
import numberPops from "./generator-functions/population";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import setGen, { createSettlement } from "./controllers/setgen";
import dataRouter from "./routers/data";
import { WebSocketServer } from 'ws';

dotenv.config();

const serverStartup = async () => {
  const mdbe = await mongoose.connect(process.env.MONGODB_URI as string)
  const app = express()
  const wss = new WebSocketServer({ port: 3001 });

  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }));

  const PORT = 3000;

  wss.on('connection', (ws) => {
    console.log('A new client connected.');

    ws.on('message', async (message) => {
      const { name, climate, landform, archetype, species, size, incrementor, mLevel } = JSON.parse(message.toString())
      const options: SetOptions = {
        name, climate, terrain: landform,
        size: size as SettlementSize,
        incrementor: incrementor as SettlementIncrementor,
        magicLevel: mLevel as MagicLevel,
        archetype: archetype as Archetype,
        species: species.map((species: ISpecies) => ({ species, distribution: 1 })),
        population: numberPops(size, incrementor),
        hasGuilds: true
      }
      const gen = createSettlement(options)
      while (true) {
        const { value, done } = await gen.next()
        if (!!done) {
          break;
        }
        ws.send(`${JSON.stringify(value)}`)
      }
      ws.close()
    });

    // Event listener for client disconnection
    ws.on('close', () => {
      console.log('A client disconnected.');
    });
  })

  app.use('/default-data', dataRouter)

  app.listen(3000, async () => {
    console.log(`Server started at port ${PORT}`)
  })
}

serverStartup()
