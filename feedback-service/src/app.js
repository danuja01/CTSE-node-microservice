import express from 'express';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './database';
import { errorHandler } from './middleware/errors';
import logger from './utils/logger';

require('dotenv').config();

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: 'Too many requests',
  standardHeaders: true,
  legacyHeaders: true
});

app.use(limiter);

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        'img-src': ["'self'", 'https: data:']
      }
    }
  })
);

app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use(express.json({ limit: '1mb' }));

app.use(compression());

app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => res.status(200).json({ message: 'Server Up and Running!' }));

app.use(errorHandler);

connectDB();

global.__basedir = __dirname;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
