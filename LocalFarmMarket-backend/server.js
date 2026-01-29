import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'js-yaml';
import mongoose from 'mongoose';
import redis from 'redis';

import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import sellerRoutes from "./src/routes/sellerRoutes.js";

const app = express();

// ======================================
// Configuration
// ======================================
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lmf_db';
const REDIS_ENABLED = process.env.REDIS_ENABLED !== 'false';

// ======================================
// Middleware
// ======================================
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5174', // ✅ must be specific, not '*'
  credentials: true,               // ✅ allow credentials (cookies, auth headers)
}));
app.use(morgan('dev'));

// Swagger documentation
const swaggerDocument = yaml.load(fs.readFileSync('./src/docs/api-docs.yaml', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ======================================
// Database Connections
// ======================================
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

// Redis Connection
const createRedisClient = () => {
  if (!REDIS_ENABLED) {
    console.log('ℹ️ Redis disabled by configuration');
    return null;
  }

  const redisOptions = {
    socket: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || 6379,
      reconnectStrategy: (retries) => {
        if (retries > 5) {
          console.log('⚠️ Max Redis reconnection attempts reached');
          return new Error('Max retries reached');
        }
        return Math.min(retries * 100, 5000);
      },
    },
  };

  if (process.env.REDIS_PASSWORD) {
    redisOptions.password = process.env.REDIS_PASSWORD;
  }

  const client = redis.createClient(redisOptions);

  client.on('connect', () => {
    console.log('✅ Redis Connected');
  });

  client.on('error', (err) => {
    console.error('❌ Redis Error:', err.message);
  });

  client.on('reconnecting', () => {
    console.log('ℹ️ Redis reconnecting...');
  });

  return client;
};

// ======================================
// Routes
// ======================================
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes); // Category product routes
app.use('/api/orders', orderRoutes);


app.use("/api/seller", sellerRoutes);

// Health check
app.get('/health', (req, res) => {
  const status = {
    status: 'OK',
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    redis: app.locals.redis?.isOpen ? 'connected' : 'disconnected',
  };
  res.json(status);
});

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error to the console
  res.status(500).json({
    message: 'Something went wrong!',
    error: err.message || 'Internal Server Error',
  });
};

// Use the error handler middleware
app.use(errorHandler);

// ======================================
// Server Initialization
// ======================================
const startServer = async () => {
  try {
    await connectDB();
    const redisClient = createRedisClient();
    if (redisClient) {
      await redisClient.connect().catch(err => {
        console.warn('⚠️ Redis connection failed (running without Redis):', err.message);
      });
    }

    app.locals.redis = redisClient;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📘 Swagger docs at http://localhost:${PORT}/api-docs`);
      console.log(`🔍 Health check at http://localhost:${PORT}/health`);
    });
  } catch (err) {
    console.error('❌ Server startup error:', err.message);
    process.exit(1);
  }
};

startServer();

export default app;
