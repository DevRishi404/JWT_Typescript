import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';
import { connectDbMiddleWare } from './middlewares/connectDbMiddleware';

import authRoute from './routes/authRoutes';

const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(connectDbMiddleWare());

app.use('/api/auth', authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});