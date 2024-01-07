import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from './routes/Users';
import authRoutes from './routes/auth';
import cookieParser from "cookie-parser";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));

app.use("/auth",authRoutes)
app.use("/register", userRoutes)

app.listen(3000, () => {
    console.log("Server running successfully!")
})