import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev: (process.env.NODE_ENV || 'development') === 'development',
  isProd: process.env.NODE_ENV === 'production',

  database: {
    url: process.env.DATABASE_URL,
  },

  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },

  storage: {
    path: process.env.STORAGE_PATH || './storage',
  },

  uploads: {
    path: process.env.UPLOAD_PATH || './uploads',
  },

  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
};

export default config;