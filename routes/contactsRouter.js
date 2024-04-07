import express from 'express';
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from '../controllers/contactsControllers.js';
import validateBody from '../helpers/validateBody.js';
import isEmptyBody from '../middlewares/isEmptyBody.js';
import isValidId from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';

import {
  contactFavoriteSchema,
  createContactSchema,
  updateContactSchema,
} from '../models/Contact.js';

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', getAllContacts);

contactsRouter.get('/:id', isValidId, getOneContact);

contactsRouter.post('/', isEmptyBody, validateBody(createContactSchema), createContact);

contactsRouter.put(
  '/:id',
  isValidId,
  isEmptyBody,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  '/:id/favorite',
  isValidId,
  isEmptyBody,
  validateBody(contactFavoriteSchema),
  updateStatusContact
);

contactsRouter.delete('/:id', isValidId, deleteContact);

export default contactsRouter;
