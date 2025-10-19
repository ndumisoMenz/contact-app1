import mongoose, { Document, Model, Schema } from "mongoose";

// Define the TypeScript interface for a User document
export interface IUser extends Document {
  username: string;
  password: string;
  role: "admin" | "manager" | "user";
}

// Define the Mongoose schema
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "manager", "user"],
    },
  },
  {
    timestamps: true,
  }
);

// Create the Mongoose model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
