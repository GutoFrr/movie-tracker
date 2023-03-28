// server
import express from 'express';
const app = express();

// packages
import 'express-async-errors';
import cors from 'cors';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// routes
import reviews from './routes/reviewsRoutes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.use(cors());
app.use(express.json());

app.use('/api/reviews', reviews);
app.use('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../client/dist', 'movie.html'))
);

export default app;
