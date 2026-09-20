import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}

//register user 
const registerUser = async (req,res) => {
    const {name,email,password} = req.body;
    try{
        if (!name || !email || !password){
            return res.status(400).json({message: "Please fill all the fields"});
        }
        // check if user already exists 
        const existingUser = await userModel.findOne({email});
        if (existingUser){
            return res.json({success: false, message: "User already exists"});
        }
        //validate email format and strong password
        if (!validator.isEmail(email)){
            return res.json({success:false, message: "Please enter valid email address"});
        }
        if (password.length < 8 ){
            return res.json({success:false, message: " password length must be greater than 8 characters"});
        }

        //hashing user password
        const  salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password: hashedPassword
        });
        const user = await newUser.save()
        const token = createToken(user._id);
        return res.json({success:true,token:token, message: "User registered successfully"});

    }catch(err){
        console.log(err);
        return res.json({success:false, message: "Error"});
    }
}

//login user 

const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user){
            return res.json({success:false, message: "User not found"});
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch){
            return res.json({success:false, message: "Invalid password"});
        }
        const token = createToken(user._id);
        return res.json({success:true,token:token, message: "User logged in successfully"});
    } catch (err) {
        console.log(err);
        return res.json({success:false, message: "Error"});
    }
}

export {loginUser, registerUser}