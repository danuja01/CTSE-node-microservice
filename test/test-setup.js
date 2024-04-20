import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer;
let setupDone = false;

export async function setupTestEnvironment() {
  if (!setupDone) {
    // Specify the version you want to use
    mongoServer = await MongoMemoryServer.create({
      binary: {
        version: '7.0.7' // Specify the version you want to use
      }
    });

    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    setupDone = true;
  }
}

export async function teardownTestEnvironment() {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
}
