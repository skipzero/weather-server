import crypto from 'crypto';
import config from './config';
const SECRET = process.env.SECRET

const random = () => crypto.randomBytes(128).toString('base64');

export const authentication = (salt: string, password: string) => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}