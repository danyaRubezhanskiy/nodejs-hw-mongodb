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

import fs from 'node:fs/promises';
import path from 'node:path';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

export async function getContactsController(req, res, next) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  try {
    const data = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      userId: req.user._id,
    });
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
    const contact = await getContactByID(req.user._id, contactId);
    if (contact == null) {
      return next(createError(404, 'Contact not found'));
    }

    if (contact.userId.toString() != req.user.id.toString()) {
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
  let photo = null;

  if (typeof req.body != 'undefined') {
    if (process.env.ENABLE_CLOUDINARY == 'true') {
      const result = await uploadToCloudinary(req.file.path);
      await fs.unlink(req.file.path);
      console.log(result);
      photo = result.secure_url;
    } else {
      await fs.rename(
        req.file.path,
        path.resolve('src', 'public/photos', req.file.filename),
      );
      photo = `http://localhost:3000/photos/${req.file.filename}`;
    }
  }

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user._id,
    photo,
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
  const result = await deleteContact(req.user._id, contactId);
  if (result == null) {
    return next(createError(404, 'Contact not found'));
  }
  res.status(204).send();
}

export async function patchContactController(req, res, next) {
  let photo = null;

  if (typeof req.body != 'undefined') {
    if (process.env.ENABLE_CLOUDINARY == 'true') {
      const result = await uploadToCloudinary(req.file.path);
      await fs.unlink(req.file.path);
      console.log(result);
      photo = result.secure_url;
    } else {
      await fs.rename(
        req.file.path,
        path.resolve('src', 'public/photos', req.file.filename),
      );
      photo = `http://localhost:3000/photos/${req.file.filename}`;
    }
  }

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    photo,
  };
  const { contactId } = req.params;
  const result = await changeContact(req.user._id, contactId, contact);
  if (result == null) {
    return next(createError(404, 'Contact not found'));
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}
