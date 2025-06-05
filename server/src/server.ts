import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectToDb } from './dbUtils/dbConn';
import { MongoClient } from 'mongodb';

import authRoute from './routes/authRoutes';

const app = express();
const PORT = process.env.PORT || 8001;
export let connection: MongoClient;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(async (req: Request, res: Response, next: NextFunction) => {
    if (!connection) {
        connection = await connectToDb();
        if (!connection) {
            res.status(500).json({ message: 'Database connection failed' });
            return;
        }
    }
    next();
    
})

app.use('/api/auth', authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});