import { Contact } from '../models/contact.js';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactByID = async (contactId) => {
  return await Contact.findById(contactId);
};

export const createContact = (contact) => {
  return Contact.create(contact);
};

export const deleteContact = (contactId) => {
  return Contact.findByIdAndDelete(contactId);
};

export const changeContact = (contactId, contact) => {
  return Contact.findByIdAndUpdate(contactId, contact, { new: true });
};
