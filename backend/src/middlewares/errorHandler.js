import ApiError from '../utils/ApiError.js';
import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (!(err instanceof ApiError)) {
    statusCode = statusCode || 500;
    message = message || 'Internal Server Error';
  }

  logger.error(`[${statusCode}] ${message}`, err.stack);

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;