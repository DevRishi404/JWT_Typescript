import express from 'express';
import { connection } from '../middlewares/connectDbMiddleware';
import bcrypt from 'bcrypt';
import { User } from '../models/UserModel';
import jwt from 'jsonwebtoken';


const app = express();

app.get('/login', async (req, res) => {
    try {
        const db = connection.db('sample_mflix');
        const collection = db.collection('users');

        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Username and password are required' });
            return;
        }

        // Find the user by email
        const user = await collection.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        // Generate JWT token
        if (!process.env.JWT_SECRET_KEY) {
            res.status(500).json({ message: 'JWT secret key not configured' });
            return;
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
        return;
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get("/register", async (req, res) => {
    try {
        const db = connection.db('sample_mflix');
        const collection = db.collection('users');

        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Username and password are required' });
            return;
        }

        // Find if existing user 
        const isExisting = await collection.findOne({ email });
        if (isExisting) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const newUser: User = { email, password: hashedPassword };

        const result = await collection.insertOne(newUser);

        if (result.acknowledged) {
            res.status(201).json({ message: 'User registered successfully' });
        } else {
            throw new Error('User registration failed');
        }

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default app;