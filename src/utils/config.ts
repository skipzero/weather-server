import { cleanEnv, str, port } from 'envalid';

export  const env = cleanEnv(process.env, {
  NODE_ENV: str(),
  PUBLIC_URL: str(),
  PORT: port(),
  MONGODB_URI: str(),
  SESSION_SECRET: str(),
})

