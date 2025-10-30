import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {

  try {
    const conn=await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`DB1 connected: ${conn.connection.host}`);

    

    console.log("Database connected successfully!");
  } catch (error: any) {
    console.error("Failed to connect to databases:", error.message);
    process.exit(1);
  }
};

export default connectDB;




