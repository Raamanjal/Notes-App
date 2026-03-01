import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("MongoDB Connected Successfully")
    }
    catch(error){
        console.error(error.message());
        console.log("MongoDB failed to Connect.");
        process.exit(1);
    }
}