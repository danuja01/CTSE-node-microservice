import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer;
let setupDone = false;

export async function setupTestEnvironment() {
  if (!setupDone) {
    mongoServer = await MongoMemoryServer.create();
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
