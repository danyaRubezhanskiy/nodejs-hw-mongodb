import 'dotenv/config';
import { initMongoConnection } from './initMongoConnection.js';
import { setupServer } from './server.js';

async function bootstrap() {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
