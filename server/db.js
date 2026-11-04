import 'dotenv/config';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('[db] MONGODB_URI is missing — copy .env.example to .env and fill it in.');
  process.exit(1);
}

/** Single shared connection for the whole API process. */
export const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 8000,
  maxPoolSize: 10,
});

let db = null;

/**
 * Connects to MongoDB Atlas, ensures indexes, and returns the app database.
 * Throws (rejects) on failure so the caller can decide whether to exit.
 */
export async function connectDB() {
  await client.connect();
  db = client.db('digivibz');
  const contacts = db.collection('contacts');
  // Inbox is read newest-first; filters are by status/email/date.
  await contacts.createIndex({ createdAt: -1 });
  await contacts.createIndex({ status: 1, createdAt: -1 });
  await contacts.createIndex({ email: 1 });
  console.log('[db] MongoDB Atlas connected (db: digivibz, collection: contacts)');
  return db;
}

/** Contact-message collection (only valid after connectDB resolved). */
export function contacts() {
  if (!db) throw new Error('[db] connectDB() has not completed yet');
  return db.collection('contacts');
}

export async function closeDB() {
  await client.close();
}
