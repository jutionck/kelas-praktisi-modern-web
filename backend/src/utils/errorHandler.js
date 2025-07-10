const handleAsyncError = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const globalErrorHandler = (err, req, res, next) => {
  console.error('Error stack:', err.stack);

  let statusCode = 500;
  let message = 'Internal server error';

  if (err.message.includes('Validation failed')) {
    statusCode = 400;
    message = err.message;
  } else if (err.message.includes('not found')) {
    statusCode = 404;
    message = err.message;
  } else if (err.message.includes('required')) {
    statusCode = 400;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
};

module.exports = {
  handleAsyncError,
  globalErrorHandler,
  notFoundHandler,
};
