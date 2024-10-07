import { Contact } from '../models/contact.js';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactByID = async (contactId) => {
  return await Contact.findById(contactId);
};
