// import {create} from "zustand"

// export const useContactStore=create((set)=>({
//     contacts:[],
//     setContacts:(contacts)=>set({contacts}),
//     createContact:async (newContact)=>{
//         if(!newContact.name || !newContact.email || !newContact.phone || !newContact.notes){
//             return {success:false,message:"please fill in all fields"}
//         }
//         const res=await fetch("/api/contacts",{
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify(newContact)
//         })
//         const data=await res.json();
//         set((state)=>({contacts:[...state.contacts,data.data]}));
//         return {success:true,message:"Contact created successfully"}
//     },
//     fetchContacts:async()=>{
//         const res=await fetch("/api/contacts");
//         const data=await res.json();
//         set({contacts:data.data})
//     },
//     deleteContact:async(cid)=>{
//         const res=await fetch(`/api/contacts/${cid}`,{
//             method:"DELETE",
//         });
//         const data=await res.json();
//         if(!data.success)return{success:false,message:data.message};
//         set(state=>({contacts:state.contacts.filter(contact=>contact._id!==cid)}));
//         return{success:true,message:data.message}
//     },
//     updateContact:async(cid,updatedContact)=>{
//         const res=await fetch(`/api/contacts/${cid}`,{
//             method:"PUT",
//             headers:{
//                 "Content-Type":"application/json",
//             },
//             body:JSON.stringify(updatedContact)
//         })
//         const data=await res.json();
//         if(!data.success)return{success:false,message:data.message};
//         set((state)=>({
//             contacts:state.contacts.map((contact)=>(contact._id==cid? data.data:contact))
//         }))
//     }
// }))


import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL;

export const useContactStore = create((set) => ({
  contacts: [],
  setContacts: (contacts) => set({ contacts }),

  createContact: async (newContact) => {
    if (!newContact.name || !newContact.email || !newContact.phone || !newContact.notes) {
      return { success: false, message: "Please fill in all fields" };
    }

    try {
      const res = await fetch(`${API_URL}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact),
      });

      const data = await res.json();
      set((state) => ({ contacts: [...state.contacts, data.data] }));

      return { success: true, message: "Contact created successfully" };
    } catch (err) {
      console.error("Error creating contact:", err);
      return { success: false, message: "Failed to create contact" };
    }
  },

  fetchContacts: async () => {
    try {
      const res = await fetch(`${API_URL}/api/contacts`);
      const data = await res.json();
      set({ contacts: data.data });
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  },

  deleteContact: async (cid) => {
    try {
      const res = await fetch(`${API_URL}/api/contacts/${cid}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        contacts: state.contacts.filter((contact) => contact._id !== cid),
      }));

      return { success: true, message: data.message };
    } catch (err) {
      console.error("Error deleting contact:", err);
      return { success: false, message: "Failed to delete contact" };
    }
  },

  updateContact: async (cid, updatedContact) => {
    try {
      const res = await fetch(`${API_URL}/api/contacts/${cid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContact),
      });

      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        contacts: state.contacts.map((contact) =>
          contact._id === cid ? data.data : contact
        ),
      }));

      return { success: true, message: "Contact updated successfully" };
    } catch (err) {
      console.error("Error updating contact:", err);
      return { success: false, message: "Failed to update contact" };
    }
  },
}));
