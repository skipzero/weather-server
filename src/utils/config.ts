import { cleanEnv, str, port } from 'envalid';

export  const env = cleanEnv(process.env, {
  NODE_ENV: str(),
  PUBLIC_URL: str(),
  PORT: port(),
  MONGODB_URI_PROD: str(),
  MONGODB_URI_DEV: str(),
  SESSION_SECRET: str(),
})

