import mongoose from "mongoose";

const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    notes:{
        type:String,
        required:true
    },
},{
    timestamps:true // this makes sure when objected is created or updated it has createdAt and updatedAt info
})

const Contact=mongoose.model('Contact',contactSchema)

export default Contact