//Using Mongoose rather than MongoDB Driver
import mongoose from 'mongoose';

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI in .env.local');
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  return mongoose.connect(MONGODB_URI);
}
