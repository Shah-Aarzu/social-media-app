import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://new_user_31:aarzu6126@social-media-app-db.jd9cw.mongodb.net/?retryWrites=true&w=majority&appName=social-media-app-db");

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Not Connected : ${error.message}`);

    process.exit(1);
  }
};
