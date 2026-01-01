import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/userModel.js";

export const getCurrentUser = async (req, res) => {
    try {
        console.log(req.userId);
        
        const user = await User.findById(req.userId).select("-password").populate('enrolledCourses');
        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user); 
    } catch (error) {
        return res.status(500).json({ message: `GET CURRENT USER error: ${error}` });
    }   
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, description } = req.body;
        let photoUrl
        
        if (req.file) {
            photoUrl = await uploadOnCloudinary(req.file.path); 
        }
        
        const updatedData = {};
        if (name) updatedData.name = name;
        if (description) updatedData.description = description.trim();
        if (photoUrl) updatedData.photoUrl = photoUrl;
        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updatedData },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // await user.save();
        
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully", 
            user
        });
    } catch (error) {
        return res.status(500).json({ message: `Update Profile error: ${error}` });
    }
}