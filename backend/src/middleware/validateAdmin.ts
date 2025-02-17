import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { authMiddleware } from './validateAuth'; 

// Middleware to check if the user is an admin
export const validateAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    // Check if the request is for creating an admin user
    if (req.body.role === 'admin') {
        // First, call the authMiddleware to authenticate the user
        await authMiddleware(req, res, async () => {
            try {
                // Find the user by userId
                const user = await User.findById(req.userId);

                if (!user) {
                    return res.status(404).json({ error: 'User  not found' });
                }

                // Check if the user has the admin role
                if (user.role !== 'admin') {
                    return res.status(403).json({ error: 'Access denied. Admins only.' });
                }

                next(); // User is admin, proceed to the next middleware
            } catch (error) {
                res.status(500).json({ error: 'Server error' });
            }
        });
    } else {
        // If the role is not admin, allow the request to proceed
        next();
    }
};