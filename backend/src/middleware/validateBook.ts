import { Request, Response, NextFunction } from 'express';
import { bookCreationSchema } from '../zodSchemas/BookSchema';
import { ZodError } from 'zod';

export const validateBook = (req: Request, res: Response, next: NextFunction): void => {
    try {
        if (req.body.price) {
            req.body.price = parseFloat(req.body.price); 
        }

        if (req.body.rating) {
            req.body.rating = parseFloat(req.body.rating);
        }
        // console.log(req.body)
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