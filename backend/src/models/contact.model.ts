// import mongoose from "mongoose";

// const contactSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true
//     },
//     phone:{
//         type:String,
//         required:true
//     },
//     notes:{
//         type:String,
//         required:true
//     },
// },{
//     timestamps:true // this makes sure when objected is created or updated it has createdAt and updatedAt info
// })

// const Contact=mongoose.model('Contact',contactSchema)

// export default Contact

import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    notes: { type: String, required: true }
  },
  { timestamps: true }
);

const Contact = mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
