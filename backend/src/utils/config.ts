import { cleanEnv } from 'envalid'
import { port, str } from 'envalid/dist/validators'
import dotenv from 'dotenv'
dotenv.config()


export default cleanEnv(process.env, {
  PORT: port(),
  MONGODB_URI: str(),
  ACCESS_SECRET: str(),

  APP_KEY: str(),
  API_KEY: str()
})