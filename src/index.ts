
import dotenv from "dotenv";
import mongoose from "mongoose";

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import dataRouter from "./routers/data";

import genRouter from "./routers/generators";



dotenv.config();

const serverStartup = async () => {
  const mdbe = await mongoose.connect(process.env.MONGODB_URI as string)
  const app = express()

  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }));

  const PORT = 8000;

  app.use('/default-data', dataRouter)
  app.use('/gen', genRouter)

  app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`)
  })
}

serverStartup()
