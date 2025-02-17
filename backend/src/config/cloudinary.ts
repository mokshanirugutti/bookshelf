import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs'

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
  });

  

export  const uploadToCloudinary = async (path: string) => {
    try {
        if(!path) return
        const result = await cloudinary.uploader.upload(path, {resource_type: "auto"});

        console.log(result)
        return result;
    } catch (error) {
        fs.unlinkSync(path);
        throw error;
    }
};