import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db_config.js";
import serverConfig from "./config/serverConfig.js";
import userRouter from "./routes/userRoutes.js";
import mealRouter from "./routes/mealRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import http from "http";
import cartRouter from "./routes/cartRoutes.js";





dotenv.config();
const app = express();

// Middleware
app.use(cookieParser()); 

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // frontend URL
    credentials: true, // allow cookies
  })
);

app.use(express.json());

// Test route
app.get("/ping", (req, res) => {
  console.log("Ping received");
  res.send("Call-a-chef api is running! Pong!!");
});

// Public routes
app.use("/auth", userRouter);

// Protected routes
app.use("/api/cart", cartRouter);




app.get("/check", (req, res) => {
    res.send('Call-a-chef API is running');
});

// Routes
app.use("/meals", mealRouter);

// Health check
app.get("/check", (req, res) => {
  res.send("Call-a-chef API is running");
});

// Start server
app.listen(serverConfig.PORT, async () => {
  try {
    await connectDB();
    console.log(`Server started on port ${serverConfig.PORT}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
});
