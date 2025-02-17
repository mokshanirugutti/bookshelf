import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

import { connectDB } from './db/db';
import authRoute from './routes/auth';
import bookRoute from './routes/books';



dotenv.config();



const app = express();

const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup WebSocket

// Routes
app.use('/auth', authRoute);
app.use('/books', bookRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});