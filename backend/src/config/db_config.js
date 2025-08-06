import mongoose from "mongoose";
import serverConfig from "./serverConfig.js";

async function connectDB() {
  try {
    await mongoose.connect(serverConfig.DB_URL);
    console.log("Successfully connected to the MongoDB");
  } catch (error) {
    console.log("Not able to connect to the MongoDB server");
    console.log(error);
  }
}

export default connectDB;
