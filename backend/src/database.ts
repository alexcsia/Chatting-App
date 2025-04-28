import mongoose from "mongoose";

export const connectMongoDB = async (mongoUri?: string) => {
  const uri = mongoUri || process.env.MONGO_URI;
  if (!uri) {
    throw new Error("mongodb uri is missing");
  }
  await mongoose.connect(uri);
  console.log("successfully connected to mongoDB");
};
