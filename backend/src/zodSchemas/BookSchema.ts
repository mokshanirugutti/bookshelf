import { z } from 'zod';
import { Types } from 'mongoose';

export const reviewSchema = z.object({
    userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: "Invalid userId",
    }),
    content: z.string()
        .min(10, { message: "Review content must be at least 10 characters long" })
        .max(500, { message: "Review content must be at most 500 characters long" }), 
    rating: z.number()
        .min(0, { message: "Rating must be at least 0" })
        .max(5, { message: "Rating must be at most 5" }),
});


export const bookCreationSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
    description: z.string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .max(200, { message: "Description must be at most 200 characters long" }),
    author: z.string().min(3, { message: "Author must be at least 3 characters long" }),
    genre: z.string().min(3, { message: "Genre must be at least 3 characters long" }),
    
    price: z.number().min(0, { message: "Price must be at least 0" }),
    reviews: z.array(reviewSchema).optional(),
    
});

export const bookUpdateSchema = bookCreationSchema.partial(); 