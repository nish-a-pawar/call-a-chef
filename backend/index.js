import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//connect to db 
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser :true,
    useUnifiedTopology:true
})
.then(()=>console.log("✅ MongoDB connected to call-a-chef!"))
.catch((err)=>console.log('❌ Connection Error :' ,err ))

app.get("/",(req,res)=>{
    res.send('Call-a-chef api is running');
})
const PORT = process.env.PORT || 5000;
app.listen(PORT ,()=>{
    console.log(`server started on ${PORT}`)
} )