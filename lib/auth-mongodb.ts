// Native MongoDB client used ONLY by the Auth.js adapter.
// StudyHub app data (courses, assignments, resources) still uses
// Mongoose through lib/mongodb.ts.
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

const globalForMongo = globalThis as typeof globalThis & {
  _authMongoClientPromise?: Promise<MongoClient>;
};

const clientPromise =
  globalForMongo._authMongoClientPromise ??
  (globalForMongo._authMongoClientPromise = new MongoClient(uri).connect());

export default clientPromise;
