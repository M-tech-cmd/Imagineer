import express, { Router } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import imageRoutes from './routes/ImageRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/imagineer', imageRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve static frontend
app.use(express.static(path.join(__dirname, 'dist')));

// ✅ Catch-all route for React
const router = Router();
router.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.use(router);

// ✅ Use Render’s port or fallback
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

startServer();
