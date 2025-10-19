// import mongoose from "mongoose";

// export const connectDB = async (): Promise<void> => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI as string);
//     console.log(`MongoDB connected: ${conn.connection.host}`);
//   } catch (error: any) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// import mongoose from "mongoose";

// const connectDB = async (): Promise<void> => {
//   try {
//     // Connect to first database (CONNECTION_STRING)
//     const db1 = await mongoose.createConnection(process.env.CONNECTION_STRING as string);
//     console.log(
//       `DB1 connected: ${db1.host}, ${db1.name}`
//     );

//     // Connect to second database (MONGO_URI)
//     const db2 = await mongoose.createConnection(process.env.MONGO_URI as string);
//     console.log(
//       `DB2 connected: ${db2.host}, ${db2.name}`
//     );

//     console.log("Both databases connected successfully!");
//   } catch (error: any) {
//     console.error("Failed to connect to databases:", error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;



// import mongoose from "mongoose";

// const connectDB = async (): Promise<void> => {
//   const conn1 = process.env.CONNECTION_STRING;
//   const conn2 = process.env.MONGO_URI;

//   if (!conn1 || !conn2) {
//     console.error("DB connection strings are missing in .env!");
//     process.exit(1);
//   }

//   try {
//     const db1 = await mongoose.createConnection(conn1);
//     console.log(`DB1 connected: ${db1.host}, ${db1.name}`);

//     const db2 = await mongoose.createConnection(conn2);
//     console.log(`DB2 connected: ${db2.host}, ${db2.name}`);

//     console.log("Both databases connected successfully!");
//   } catch (error: any) {
//     console.error("Failed to connect to databases:", error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  const conn1Uri = process.env.CONNECTION_STRING;
  const conn2Uri = process.env.MONGO_URI;

  if (!conn1Uri || !conn2Uri) {
    console.error("DB connection strings are missing in .env!");
    process.exit(1);
  }

  try {
    // First connection
    const db1 = await mongoose.createConnection(conn1Uri).asPromise();
    console.log(`DB1 connected: ${db1.host}, ${db1.name}`);

    // Second connection
    const db2 = await mongoose.createConnection(conn2Uri).asPromise();
    console.log(`DB2 connected: ${db2.host}, ${db2.name}`);

    console.log("Both databases connected successfully!");
  } catch (error: any) {
    console.error("Failed to connect to databases:", error.message);
    process.exit(1);
  }
};

export default connectDB;



