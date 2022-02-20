/* eslint-disable no-process-env */
import mongoose from "mongoose";

// this environment variable is preset by jest-mongodb
const MONGO_URL = process.env.MONGO_URL as string;

export class DB {
  static connect() {
    return mongoose.connect(MONGO_URL, {
      dbName: "test",
    });
  }

  static close() {
    return Promise.all([
      mongoose.connection.dropDatabase(),
      mongoose.connection.close(),
    ]);
  }
}
