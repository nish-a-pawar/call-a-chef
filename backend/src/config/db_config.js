import mongoose from 'mongoose';
import dotenv from "dotenv"
// import serverConfig from './serverConfig.js';
dotenv.config()

async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URL);
        
        console.log("Successfully connected to the MongoDB");
    } catch (error) {
        console.log("Not able to connect to the MongoDB server");
        console.log(error);
    }
}

export default connectDB;