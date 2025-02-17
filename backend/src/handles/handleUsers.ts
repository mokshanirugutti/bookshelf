import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { generateToken } from '../config/jwt';

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { uploadToCloudinary } from '../config/cloudinary';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password, role } = req.body;


        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });

        if (existingUser) {
            res.status(400).json({ 
                error: 'User with this email or username already exists' 
            });
         
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        let profilePicture = null;
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.path);
            if (uploadResult && uploadResult.secure_url) {
                profilePicture = uploadResult.secure_url;
                fs.unlinkSync(req.file.path); // Remove file after upload
            }
        }
        // Create new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
            role,
            profilePicture
        });

        await user.save();

        // Generate JWT
        const token = generateToken(user._id.toString());

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role : user.role,
                profilePicture: user.profilePicture
            }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        console.log(`login requet for ${username} and  ${password}`)
        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }
        console.log('found user')
        console.log(user)

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        // Generate JWT
        const token = generateToken(user._id.toString());

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};