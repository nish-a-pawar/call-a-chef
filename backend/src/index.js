import express from 'express';
import cors from 'cors';
import connectDB from "./config/db_config.js";
import serverConfig from './config/serverConfig.js';
import mealRouter from './routes/mealRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());


app.get("/check",(req,res)=>{
    res.send('Call-a-chef api is running');
})

app.use("/meals", mealRouter);

app.listen(serverConfig.PORT, () => {
    connectDB(); // Executing db connection function
    console.log(`Server got started at port ${serverConfig.PORT}`)
})