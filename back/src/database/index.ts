import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', true);

const mongoConnection = {
    isConnected: 0
}

export const connect = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    if (mongoConnection.isConnected) return;

    const { connection } = await mongoose.connect(process.env.MONGO_URL!);

    mongoConnection.isConnected = connection.readyState;
    console.log('✅ MongoDB connected:', connection.name);
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    throw error;
  }
};

export const disconnect = async () => {
    if (mongoConnection.isConnected === 0) {
        return;
    }

    await mongoose.disconnect();
    mongoConnection.isConnected = 0;
}
