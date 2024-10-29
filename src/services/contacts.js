import { Contact } from '../models/contact.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  userId,
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  Contact.find().where('userId').equals(userId);

  const [total, data] = await Promise.all([
    Contact.countDocuments({ userId }),
    Contact.find({ userId })
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return {
    data,
    totalItems: total,
    page,
    perPage,
    totalPages,
    hasNextPage: totalPages - page > 0,
    hasPreviousPage: page > 1,
  };
};

export const getContactByID = async (userId, contactId) => {
  return await Contact.findOne({ _id: contactId, userId });
};

export const createContact = (contact) => {
  return Contact.create(contact);
};

export const deleteContact = (userId, contactId) => {
  return Contact.findOneAndDelete({ _id: contactId, userId });
};

export const changeContact = (userId, contactId, contact) => {
  return Contact.findOneAndUpdate({ _id: contactId, userId }, contact, {
    new: true,
  });
};
