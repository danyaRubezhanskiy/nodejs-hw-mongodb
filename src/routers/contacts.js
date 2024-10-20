import express from 'express';

import {
  getContactController,
  getContactsController,
  createContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema } from '../validation/contacts.js';

const router = express.Router();

const jsonParser = express.json();
router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactController));

router.post(
  '/',
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(createContactController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

router.patch(
  '/:contactId',
  isValidId,
  jsonParser,
  ctrlWrapper(patchContactController),
);

export default router;
