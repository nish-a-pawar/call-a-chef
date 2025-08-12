import express from "express";
import cors from "cors";
import connectDB from "./config/db_config.js";

import serverConfig from "./config/serverConfig.js";
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { setupLocationSocket } from "./socket/locationSocket.js";

import mealRouter from './routes/mealRoutes.js';


dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
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
setupLocationSocket(io);
server.listen(serverConfig.PORT, () => {
  connectDB();
  console.log(`Server got started at port ${serverConfig.PORT}`);

// Middleware
app.use(cors());
app.use(express.json());

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
