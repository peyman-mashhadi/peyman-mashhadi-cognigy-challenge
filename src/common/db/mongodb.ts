import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
export const connectToDatabase = async () => {
  try {
    const url = process.env.MONGO_DB_URL || "mongodb://mongo:27017/mydb";

    return await mongoose.connect(url, {
      bufferCommands: false,
      autoIndex: true,
      autoCreate: true,
    });
  } catch (err) {
    console.error("Connect to Database ERROR : ", err);
  }
};
