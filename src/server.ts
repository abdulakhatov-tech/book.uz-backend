import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express, { Application } from 'express';

import routes from './routes';

// loading environment variables from.env file
dotenv.config();

const app: Application = express();

// middleware
app.use(express.static("public"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',  // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes config
app.use('/api', routes)

const startServer = () => {
    const PORT = process.env.PORT || 8080;

    app.listen(PORT, async() => {
        try {
            await  mongoose.connect(`${process.env.MONGO_URI}/db` as string);
            console.log('MongoDB connected.')
            console.log(`Server is running on port ${process.env.PORT}.`);
        } catch (error) {
            console.log(error);
        }
    })
}


startServer();