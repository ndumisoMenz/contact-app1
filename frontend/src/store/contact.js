import {create} from "zustand"

export const useContactStore=create((set)=>({
    contacts:[],
    setContacts:(contacts)=>set({contacts}),
    createContact:async (newContact)=>{
        if(!newContact.name || !newContact.email || !newContact.phone || !newContact.notes){
            return {success:false,message:"please fill in all fields"}
        }
        const res=await fetch("/api/contacts",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newContact)
        })
        const data=await res.json();
        set((state)=>({contacts:[...state.contacts,data.data]}));
        return {success:true,message:"Contact created successfully"}
    },
    fetchContacts:async()=>{
        const res=await fetch("/api/contacts");
        const data=await res.json();
        set({contacts:data.data})
    },
    deleteContact:async(cid)=>{
        const res=await fetch(`/api/contacts/${cid}`,{
            method:"DELETE",
        });
        const data=await res.json();
        if(!data.success)return{success:false,message:data.message};
        set(state=>({contacts:state.contacts.filter(contact=>contact._id!==cid)}));
        return{success:true,message:data.message}
    },
    updateContact:async(cid,updatedContact)=>{
        const res=await fetch(`/api/contacts/${cid}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(updatedContact)
        })
        const data=await res.json();
        if(!data.success)return{success:false,message:data.message};
        set((state)=>({
            contacts:state.contacts.map((contact)=>(contact._id==cid? data.data:contact))
        }))
    }
}))