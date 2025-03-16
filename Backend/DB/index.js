import mongoose from "mongoose";

export const connectDB = async () => {
  try {
     console.log(`MONGODB_URL: ${process.env.MONGODB_URL}`);
    const conn = await mongoose.connect(process.env.MONGODB_URL);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Not Connected : ${error.message}`);

    process.exit(1);
  }
};
