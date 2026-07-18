import config from '../config/index.js';

const logger = {
  info: (...args) => {
    if (config.isDev) console.log('[INFO]', ...args);
  },
  warn: (...args) => {
    console.warn('[WARN]', ...args);
  },
  error: (...args) => {
    console.error('[ERROR]', ...args);
  },
  debug: (...args) => {
    if (config.isDev) console.debug('[DEBUG]', ...args);
  },
};

export default logger;