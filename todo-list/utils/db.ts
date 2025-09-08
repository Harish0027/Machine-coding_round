import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/todo";

if (!MONGO_URI) throw new Error("Please add Mongo URI to your environment.");

let isConnected = false; // global connection state

export const connectToMongoose = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};
