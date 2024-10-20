import { Contact } from '../models/contact.js';

export const getAllContacts = async ({ page, perPage }) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const [total, contacts] = await Promise.all([
    Contact.countDocuments(),
    Contact.find().skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return {
    contacts,
    totalItems: total,
    page,
    perPage,
    totalPages,
    hasNextPage: totalPages - page > 0,
    hasPreviousPage: page > 1,
  };
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
