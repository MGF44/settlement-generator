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
import setGen, { createOptions, createSettlement } from "./controllers/setgen";
dotenv.config();


// const startSettlementGenerator = async () => {


// };

const serverStartup = async () => {
  const mdbe = await mongoose.connect(process.env.MONGODB_URI as string)
  const app = express()
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }));

  const PORT = 3000;

  app.get('/setgen', setGen)

  app.listen(3000, async () => {
    console.log(`Server started at port ${PORT}`)
  })
 
}

serverStartup()


// startSettlementGenerator();
// { "name": "Knights’ Guild", "SV": undefined },
// { "name": "Architects’ Guild", "SV": undefined },
// { "name": "Sailors’ Guild", "SV": undefined },
// { "name": "Writers’ Guild", "SV": undefined },
// { "name": "Adventurers’ Guild", "SV": undefined },
// { "name": "Mages’ Guild", "SV": undefined },
// { "name": "Bards’ Guild", "SV": undefined },
// { "name": "Artists’ Guild", "SV": undefined },
// { "name": "Hunters’ Guild", "SV": undefined },
// { "name": "Fishermen’s Guild", "SV": undefined },
// { "name": "Thieves’ Guild", "SV": undefined },
// { "name": "Merchants’ Guild", "SV": undefined },
// { "name": "Scholars’ Guild", "SV": undefined },
