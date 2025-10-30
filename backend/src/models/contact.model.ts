import mongoose, { Document, Schema,Types } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  notes: string;
  user: Types.ObjectId;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    notes: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
