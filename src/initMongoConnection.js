import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;

const DB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority&appName=MyCluster`;

export async function initMongoConnection() {
  try {
    await mongoose.connect(DB_URI);
    console.log('Mongo connection successfully established!');
  } catch (err) {
    console.error(err);
    throw err;
  }
}
