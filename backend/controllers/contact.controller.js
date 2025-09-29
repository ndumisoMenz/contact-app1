import Contact from "../models/contact.model.js";
import mongoose from "mongoose";

export const getContacts=async(req,res)=>{
    try {
        
        const contacts=await Contact.find({});
        res.status(200).json({success:true,data:contacts})
    } catch (error) {
        console.log("error in fetching contacts:",error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
}


export const createContact=async(req,res)=>{
    const contact=req.body;

    if(!contact.name || !contact.email || !contact.phone || !contact.notes ){
        return res.status(400).json({success:false,message:"please provide all fields"})
    }

    const newContact=new Contact(contact)

    try{
        await newContact.save();
        res.status(201).json ({success:true,data:newContact});
    }catch(error){
        console.error("Error in create contact:",error.message);
        res.status(500).json({success:false, message: "server error"})
    }
}

export const updateContact=async(req,res)=>{
    const {id}=req.params;

    const contact=req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid Contact Id"});
    }

    try{
        const updatedContact=await Contact.findByIdAndUpdate(id,contact,{new :true});
        res.status(200).json({success:true,data:updatedContact});
    }catch(error){
        res.status(500).json({success:false,message:"Server Error"});
    }
}

export const deleteContact=async(req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"invalid Product Id"})
    }

    try{
        await Contact.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product deleted"});
    }catch(error){
        console.log("error in deleting product:",error.message)
        res.status(500).json({success:false,message:"Server Error"})
    }
}