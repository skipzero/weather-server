import express from 'express';
import {Application} from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors';

import mongoose from 'mongoose'

import router from './routes';
import { PORT, MONGODB_URI } from './utils/config'

const app: Application = express()
const mongoDB_URI: string = process.env.MONGODB_URI!;
app.use(cors({
  credentials: true
}))

app.use(compression())
app.use(bodyParser.json())
app.use(cookieParser())
app.get('/', (req, res) => {
  res.send('<h1>Welcome to JWT Auth....')
})
app.use('/', router)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

try {
  await mongoose.connect(
    MONGODB_URI as string
  )
  console.log('connected to database')
} catch (err) {
  console.log(`Error: ${err}`)
}

// mongoose.Promise = Promise

// mongoose.connect(mongoDB_URI)
// mongoose.connection.on('error', (err: Error) => console.error(err)) 