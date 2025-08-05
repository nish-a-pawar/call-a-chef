import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./src/config/db_config.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.send('Call-a-chef api is running');
})
const PORT = process.env.PORT || 5000;
app.listen(PORT ,()=>{
    connectDB();
    console.log(`server started on ${PORT}`)
} )