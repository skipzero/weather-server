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
const port = process.env.PORT
const mongoDB_URI: string = process.env.MONGODB_URI!;
app.use(cors({
  credentials: true
}))

app.use(compression())
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/', router)

const server = http.createServer(app)

server.listen(port, () => {
  console.log(`listening on port ${port}`)
})

mongoose.Promise = Promise

mongoose.connect(mongoDB_URI)
mongoose.connection.on('error', (err: Error) => console.error(err)) 