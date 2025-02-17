import { Request, Response, NextFunction } from 'express';
import { bookCreationSchema } from '../zodSchemas/BookSchema';
import { ZodError } from 'zod';

export const validateBook = (req: Request, res: Response, next: NextFunction): void => {
    try {
        bookCreationSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ error: error });
            return;
        } 
        res.status(400).json({ error: 'Invalid request data' });
    }
}; 