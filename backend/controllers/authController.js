import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/token.js";
import validator from "validator";
import sendMail from "../config/sendMail.js";

export const signup = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({ message: "User already exists" });
        } 
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (!validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })) {
            return res.status(400).json({ message: "Password must have 1 number, minimum 1 uppercase and 1 lowercase latter with a special charcter and 8 charcter long." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword, role});
        const token = generateToken(user);
        user.token = token;
        await user.save();

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        
       return res.status(201).json({
            success: true,  
            message: "User created successfully",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Sign up Error: ${error}` });
    }
};
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = generateToken(user);
            console.log(token);
            
            user.token = token;
            user.save();
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            user
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `login Error ${error}` });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        return res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        await res.clearCookie("token", { 
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", 
        });
        return res.status(200).json({
            success: true,
            message: "Logout Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Logout Error : ${error}` });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.body; 
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        } 
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }   
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Delete user Error : ${error}` });
    }
};


export const sentOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Please provide an email" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }   
        // OTP generation and sending logic goes here
        const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit OTP
        user.resetOtp = otp;
        user.otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
        user.isOtpVerified = false;
        await user.save();
        // Here you would typically send the OTP via email 
        await sendMail(email, otp);
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Send OTP Error : ${error}` });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Please provide email and OTP" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }   
        if (user.resetOtp.trim() !== otp.trim()) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        if (Date.now() > user.otpExpiry) {
            return res.status(400).json({ message: "OTP has expired" });
        }
        user.isOtpVerified = true;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Verify OTP Error : ${error}` });
    }   
};

export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;    
        if (!email || !newPassword) {
            return res.status(400).json({ message: "Please provide email and new password" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!user.isOtpVerified) {
            return res.status(400).json({ message: "OTP not verified" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = null;
        user.otpExpiry = null;
        user.isOtpVerified = false;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Reset Password Error : ${error}` });
    }
};

export const googleAuth = async (req, res) => {
    try {
        const { name, email, role } = req.body;   
        if (!name || !email) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ name, email, role });
        }
        const token = generateToken(user);
        user.token = token;
        await user.save();
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            success: true,
            message: "Google Authentication Successful",
            user
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Google Auth Error : ${error}` });
    }
};

