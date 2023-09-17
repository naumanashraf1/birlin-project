import { envSchema } from '../validators/enviroment';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.join(path.resolve(), `.env`),
});

const nodeEnvVar = envSchema.validateSync(process.env, {
  abortEarly: true,
  stripUnknown: true,
});

const {
  MONGO_DB_CONNECT_STRING,
  NODE_ENV: node_env,
  PORT: port,
  BUCKET: CLOUD_BUCKET,
  MEM_COST,
  ROUNDS,
  BASE64_SALT_SEPARATOR,
  BASE64_SIGNER_KEY,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY,
} = nodeEnvVar;

export const SECURITY_CONFIG = {
  MEM_COST,
  ROUNDS,
  BASE64_SALT_SEPARATOR,
  BASE64_SIGNER_KEY,
};

export const MONGO_URL = MONGO_DB_CONNECT_STRING;
export const NODE_ENV: string = node_env.toString().trim();
export const PORT = port;
export const BUCKET = CLOUD_BUCKET;
export const StripPubKey = STRIPE_SECRET_KEY;
export const StripSecKey = STRIPE_SECRET_KEY;
