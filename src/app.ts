// Express app setup (middleware, routes)
import express from 'express';
import { groceriesRouter } from './api/groceries/index.js';
import { logger } from './utils/logger.js';

import { clerkMiddleware } from '@clerk/express'

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(clerkMiddleware())

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/groceries', groceriesRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

export { app };