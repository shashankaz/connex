import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "connex-api",
    });
    console.log(`Database Connected to ${mongoose.connection.host}`);
    console.log(`DBName: ${mongoose.connection.name}`);
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
