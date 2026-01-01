import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';


const uploadOnCloudinary = async (filepath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    try {
        if (!filepath) {
            return null
        }
        const result = await cloudinary.uploader.upload(filepath, {
            resource_type: 'auto',
        });

        fs.unlinkSync(filepath); // Delete the local file after upload
        return result.secure_url;
    } catch (error) {
         fs.unlinkSync(filepath); // Delete the local file in case of error
        console.error('Cloudinary Upload Error:', error);
        throw new Error('Failed to upload to Cloudinary');
    }
}


export default uploadOnCloudinary;