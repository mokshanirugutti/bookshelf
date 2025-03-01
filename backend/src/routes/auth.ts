import { Router } from 'express';
import { getUserProfile, login, register, updateUserProfile } from '../handles/handleUsers';
import { userLoginSchema, userProfileUpdateSchema, userRegistrationSchema } from '../zodSchemas/userSchema';
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { validateAdmin } from '../middleware/validateAdmin';

import { upload } from '../config/multer';
import { authMiddleware } from '../middleware/validateAuth';

const router = Router();

// Middleware to validate registration
const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        userRegistrationSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            // const firstError = error.errors[0];
            res.status(400).json({ error: error });
        }
    }
};

// Middleware to validate login
const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    try {
        userLoginSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const firstError = error.errors[0];
            res.status(400).json({ error: firstError.message});
        }
    }
};

const validateProfileUpdate = (req: Request, res: Response, next: NextFunction) => {
    try {
        userProfileUpdateSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const firstError = error.errors[0];
            res.status(400).json({ error: firstError.message });
        }
    }
};

// Use the validation middleware in the route
//routes
router.post('/login', validateLogin, login);
router.post('/register',upload.single('profilePicture'), validateRegistration, validateAdmin ,register);
router.get('/profile',authMiddleware,getUserProfile);
router.put('/profile', authMiddleware, upload.single('profilePicture'), validateProfileUpdate, updateUserProfile);

export default router;