import express from 'express';
import http from 'http';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import router from './routes';

dotenv.config()
const app = express()
const PORT = process.env.PORT
const mongoDB_URI: string = process.env.MONGODB_URI!;
app.use(cors({
  credentials: true
}))

app.use(compression())
app.use(bodyParser.json())
app.use(cookieParser())
app.get('/', (req, res) => {
  res.send('HELLO Silly')
})
app.use('/', router)

console.log('===========', process.env)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

mongoose.Promise = Promise

mongoose.connect(mongoDB_URI)
mongoose.connection.on('error', (err: Error) => console.error(err)) 