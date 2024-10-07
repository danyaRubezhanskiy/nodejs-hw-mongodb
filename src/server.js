import express from 'express';
import cors from 'cors';

export function setupServer() {
  const app = express();

  app.use(cors());

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
