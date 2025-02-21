import mongoose from "mongoose";

export async function connectMongoDB() {
  try {
    const uri = process.env.MONGODB_URI;
    if (uri) await mongoose.connect(uri);
    console.log("successfully connected to mongoDB");
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
  } finally {
    await mongoose.disconnect();
  }
}
