import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'fs';
import contactsRouts from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRoutes from './routers/auth.js';
import cookieParser from 'cookie-parser';
import { auth } from './middlewares/auth.js';
import swaggerUi from 'swagger-ui-express';

const swaggerJsonPath = path.resolve('docs/swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerJsonPath, 'utf-8'));

export function setupServer() {
  const app = express();

  app.use(cors());

  app.use('/api-docs', swaggerUi.serve);
  app.get('/api-docs', swaggerUi.setup(swaggerDocument));

  app.use(cookieParser());

  app.use('/photos', express.static(path.resolve('src', 'public/photos')));

  app.use('/auth', authRoutes);
  app.use('/contacts', auth, contactsRouts);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
