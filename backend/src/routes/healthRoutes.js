const express = require('express');
const { handleAsyncError } = require('../utils/errorHandler');

const router = express.Router();

router.get(
  '/',
  handleAsyncError(async (req, res) => {
    const healthInfo = {
      success: true,
      message: 'Wishlist API is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
    };

    res.json(healthInfo);
  })
);

module.exports = router;
