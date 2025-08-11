import express from 'express';
import cors from 'cors';
import connectDB from "./config/db_config.js";
import serverConfig from './config/serverConfig.js';
import mealRouter from './routes/mealRoutes.js';

const app = express();

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
