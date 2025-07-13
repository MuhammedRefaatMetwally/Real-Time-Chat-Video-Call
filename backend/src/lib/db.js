import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongo Connected" + connection.connection.host);
  } catch (error) {
    console.log("Error in connecting to mongoDB" + error);

    process.exit(1);
  }
};
