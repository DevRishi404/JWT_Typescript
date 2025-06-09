import { MongoClient } from "mongodb";
import { NextFunction, Request, Response } from "express";
import { connectToDb } from "../dbUtils/dbConn";

export let connection: MongoClient;

export const connectDbMiddleWare = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (!connection) {
            connection = await connectToDb();
            if (!connection) {
                res.status(500).json({ message: 'Database connection failed' });
                return;
            }
        }
        next();
    }
}
