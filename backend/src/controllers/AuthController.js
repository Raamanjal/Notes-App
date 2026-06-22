import brcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


export async function register(req,res){

    try{const {name, email, password}=req.body;
    let user = await User.findOne({email});
    if(user){
       return res.status(409).json({message:"Email already exists"});
    }
    const hashedPassword= await brcrypt.hash(password,10);

    user = new User({name:name,email:email,password:hashedPassword});
    await user.save();

    const payload = {
        userId:user._id,
        email:user.email
    }

    const token=jwt.sign(payload,process.env.JWT_SECRET ||"RandomTokenKey",{expiresIn:'1h'});

    return res.status(200).json({
        message:"User Registered Successfully",
        name:name,
        email:email,
        token
    });
}
catch(err){
    console.log(err.message);
    console.log("Error Registering the User");
    return res.status(500).json({message:"Internal Server Error"});
}

}

export async function login(req,res){

    try{const{email,password}=req.body;

    //find User
    let user= await User.findOne({email});
    if(!user){
        return res.status(404).json({message:"User Not Found"});
    }

    //compare password
    const isMatch= await brcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Incorrect password"});
        }
         const payload = {
        userId:user._id,
        email:user.email
    }

    const token=jwt.sign(payload,process.env.JWT_SECRET ||"RandomTokenKey",{expiresIn:'1h'});

    return res.status(200).json({
        token
    });
    }
    catch(err){
    console.log(err.message);
    console.log("Error Logging in");
    return res.status(500).json({message:"Internal Server Error"});
}
}
