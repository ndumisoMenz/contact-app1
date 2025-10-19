import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING as string);
    console.log(process.env.CONNECTION_STRING);
    console.log(
      `Database connected: ${connect.connection.host}, ${connect.connection.name}`
    );
  } catch (err: any) {
    console.error(err);
    process.exit(1);
  }
};

export default dbConnect;
