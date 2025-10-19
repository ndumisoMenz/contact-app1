export interface IContact {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export interface ContactStore {
  contacts: IContact[];
  setContacts: (contacts: IContact[]) => void;
  createContact: (newContact: IContact) => Promise<{ success: boolean; message: string }>;
  fetchContacts: () => Promise<void>;
  deleteContact: (cid: string) => Promise<{ success: boolean; message: string }>;
  updateContact: (cid: string, updatedContact: IContact) => Promise<{ success: boolean; message: string }>;
}