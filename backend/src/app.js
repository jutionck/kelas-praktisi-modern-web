const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const wishlistRoutes = require('./routes/wishlistRoutes');
const healthRoutes = require('./routes/healthRoutes');

const {
  corsOptions,
  securityHeaders,
  requestLogger,
} = require('./middleware/validation');
const { globalErrorHandler, notFoundHandler } = require('./utils/errorHandler');

const app = express();

app.set('trust proxy', 1);

app.use(securityHeaders);

app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(requestLogger);

app.use('/api/wishlist', wishlistRoutes);
app.use('/health', healthRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Wishlist API',
    version: '1.0.0',
    documentation: '/api/docs',
    health: '/health',
  });
});

app.use(notFoundHandler);

app.use(globalErrorHandler);

module.exports = app;
