import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";


const authmiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
        message: "Authorization header missing"
        });
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({ message: "no token found, authorization failed"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET||"RandomTokenKey");
        req.user = {
        userId:decoded.userId,
        email:decoded.email
    }
    next();
    } catch(err){
        res.status(401).json({ message: 'Token is not valid' });
    }
}   

export default authmiddleware;