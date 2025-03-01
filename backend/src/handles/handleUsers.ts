import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { generateToken } from '../config/jwt';


import fs from 'fs';
import { uploadToCloudinary } from '../config/cloudinary';


export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password, role = "user" } = req.body;


        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });

        if (existingUser) {
            res.status(400).json({ 
                error: 'User with this email or username already exists' 
            });
            return
         
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
                fs.unlinkSync(req.file.path); 
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

        res.status(200).json({
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




export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized access' });
            return;
        }

        const user = await User.findById(userId).select('-password');
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        

        // Return user profile
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            profilePicture: user.profilePicture
        });
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};




export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const { username, email, password } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'User  not found' });
            return;
        }

        // Update fields if provided
        if (username) user.username = username;
        if (email) user.email = email;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        // Handle profile picture upload
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.path);
            if (uploadResult && uploadResult.secure_url) {
                user.profilePicture = uploadResult.secure_url;
                fs.unlinkSync(req.file.path); 
            }
        }

        // Save the updated user
        await user.save();

        
        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};