import express from 'express';
import cors from 'cors';
import { getAllContacts, getContactByID } from './services/contacts.js';

export function setupServer() {
  const app = express();

  app.use(cors());

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to get contacts',
        error: error.message,
      });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactByID(contactId);
      if (contact == null) {
        return res.status(404).json({ message: 'Contact not found' });
      }

      res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      console.error(error);
    }
  });

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
