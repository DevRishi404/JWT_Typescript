import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URI || "mongodb://localhost:27017";

const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

export const connectToDb = async () => {
    try {
        console.log("Connecting to MongoDB...");
        const connection = await client.connect();
        console.log("Connected to MongoDB");
        return connection;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}