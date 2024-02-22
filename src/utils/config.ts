import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const  SECRET = process.env.SECRET

const APP_KEY = process.env.APP_KEY
const API_KEY = process.env.API_KEY

const config = {
  PORT,
  MONGODB_URI,
  SECRET,
  APP_KEY,
  API_KEY

}

export default config;