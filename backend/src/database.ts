import mongoose from "mongoose";

export async function connectMongoDB() {
  try {
    const uri = process.env.MONGODB_URI;
    console.log(uri + " connection string");
    if (uri) await mongoose.connect(uri, { dbName: "chatdb" });
    console.log("successfully connected to mongoDB");
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
  }
}
