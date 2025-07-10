const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

const gracefulShutdown = (signal) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);

  server.close((err) => {
    if (err) {
      console.error('Error during server shutdown:', err);
      process.exit(1);
    }

    console.log('Server closed successfully');
    process.exit(0);
  });
};

const server = app.listen(PORT, () => {
  console.log(`
Wishlist API Server is running!
Environment: ${NODE_ENV}
Port: ${PORT}
Local URL: http://localhost:${PORT}
Health Check: http://localhost:${PORT}/health
API Base: http://localhost:${PORT}/api
  `);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

module.exports = server;
