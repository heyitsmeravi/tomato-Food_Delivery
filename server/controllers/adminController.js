import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}

const registerAdmin = async (req,res) => {
    const {name, email, password, role} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({success:false, message:"Please fill all fields"});
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({success:false, message:"Please enter a valid email"});
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new adminModel({
            name,
            email,
            password: hashedPassword,
            role: role || "admin"
        });
        await newAdmin.save();
        res.status(201).json({success:true, message:"Admin registered successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
}

const loginAdmin = async (req,res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({success:false, message:"Please fill all fields"});
    }
    try{
        const admin = await adminModel.findOne({email});
        if(!admin){
            return res.status(400).json({success:false, message:"Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch){
            return res.status(400).json({success:false, message:"Invalid credentials"});
        }
        const token = createToken(admin._id);
        res.status(200).json({success:true, message:"Admin logged in successfully", token});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
}

export {registerAdmin , loginAdmin };