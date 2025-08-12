import express from "express";
import cors from "cors";
import connectDB from "./config/db_config.js";

import serverConfig from "./config/serverConfig.js";
import userRouter from "./routes/userRoutes.js";
import mealRouter from "./routes/mealRoutes.js"
import dotenv from "dotenv";
import http from "http";




dotenv.config();
const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.get("/ping", (req, res) => {
  console.log(" Ping received");
  res.send("Call-a-chef api is running! Pong!!");
});

app.use("/auth", userRouter);




// Health check route
app.get("/check", (req, res) => {
    res.send('Call-a-chef API is running');
});

// Routes
app.use("/meals", mealRouter);

// Start the server
app.listen(serverConfig.PORT, async () => {
    try {
        await connectDB(); // Connect to database
        console.log(`✅ Server started on port ${serverConfig.PORT}`);
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1); // Stop server if DB fails
    }
});
