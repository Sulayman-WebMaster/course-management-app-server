import express from 'express';
import cors from 'cors';
import connectDB from './utils/database.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import courseRoutes from './Routes/courseRoute.js';


dotenv.config();
const app = express();

// Connect to the database
connectDB()
// applicaton level middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:[process.env.CLIENT_URL, 'http://localhost:5173'],
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));   
app.get('/',(req,res)=>{
    res.send("server is ok")
})
// Import routes
app.use('/api', courseRoutes);
app.listen(process.env.PORT, () => {
    console.log(`server running on ${process.env.PORT}`)
});
