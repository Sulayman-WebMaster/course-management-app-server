import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        
    } catch(e){
        console.error("Error connecting to database", e);
        process.exit(1); 
    }
}
export default connectDB;