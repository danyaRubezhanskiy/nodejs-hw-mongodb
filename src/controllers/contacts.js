import {
  getAllContacts,
  getContactByID,
  createContact,
  deleteContact,
  changeContact,
} from '../services/contacts.js';

import createError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export async function getContactsController(req, res, next) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  try {
    const data = await getAllContacts({ page, perPage, sortBy, sortOrder });
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get contacts',
      error: error.message,
    });
  }
}

export async function getContactController(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await getContactByID(contactId);
    if (contact == null) {
      return next(createError(404, 'Contact not found'));
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function createContactController(req, res) {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const result = await createContact(contact);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
}

export async function deleteContactController(req, res, next) {
  const { contactId } = req.params;
  const result = await deleteContact(contactId);
  if (result == null) {
    return next(createError(404, 'Contact not found'));
  }
  res.status(204).send();
}

export async function patchContactController(req, res, next) {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };
  const { contactId } = req.params;
  const result = await changeContact(contactId, contact);
  if (result == null) {
    return next(createError(404, 'Contact not found'));
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}
