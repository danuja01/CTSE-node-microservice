import mongoose from 'mongoose';
import logger from '@/utils/logger';

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI).catch((err) => logger.error('Failed to connect to database:', err));
  mongoose.connection.on('connected', () => logger.info('Connected to database successfully'));
  mongoose.connection.on('error', (err) => logger.error('Failed to connect to database:', err));
};

export default connectDB;
