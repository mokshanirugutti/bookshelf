import { Request, Response } from 'express';
import Book from '../models/Book'
import { uploadToCloudinary } from '../config/cloudinary';
import fs from 'fs'

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        
        // Get page and limit from query parameters, defaulting to 1 and 5
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;
        
        // Calculate the number of documents to skip
        const skip = (page - 1) * limit;

        const { genre } = req.query;

        // console.log(`request genre ${genre}`)
        const query = genre ? { genre: new RegExp(genre as string, 'i') } : {};

        // Fetch the books with pagination
        const books = await Book.find(query)
            .select('-reviews') // Exclude reviews
            .sort({ createdAt: 1 }) 
            .skip(skip) // Skip the documents
            .limit(limit); 

        // Get the total count of books for pagination info
        const totalBooks = await Book.countDocuments(query);

        // Calculate total pages
        const totalPages = Math.ceil(totalBooks / limit);

        // Return the paginated response
        res.json({
            totalBooks,
            totalPages,
            currentPage: page,
            books,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching books' });
    }
};


// Get single book
export const getBookById = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await Book.findById(req.params.id)
            

        if (!book) {
            res.status(404).json({ error: 'Book not found' });
            return;
        }

        res.json({"book":book});
    } catch (error) {
        res.status(500).json({ error: `Error fetching book - ${error}` });
    }
};

// Create book (protected route)
export const createBook = async (req: Request, res: Response): Promise<void> => {
    try {
        let bookCover = null;
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.path);
            if (uploadResult && uploadResult.secure_url) {
                bookCover = uploadResult.secure_url;
                fs.unlinkSync(req.file.path); 
            }
        }
        const book = new Book({
            ...req.body,
            bookCover,
            creator: req.userId // From auth middleware
        });

        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: `Error creating book - ${error} ` });
    }
};


export const updateBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        // Find the book by ID
        const book = await Book.findById(id);

        if (!book) {
            res.status(404).json({ error: 'Book not found' });
            return;
        }

        // check if the user is the creator of the book
        if (book.creator.toString() !== req.userId) {
            res.status(403).json({ error: 'You are not authorized to update this book' });
            return;
        }

        // update book
        Object.assign(book, updatedData);
        await book.save();

        res.json(book);
    } catch (error) {
        res.status(500).json({ error: `Error updating book - ${error}` });
    }
};

// Delete book (protected route)
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // Find the book by ID
        const book = await Book.findById(id);

        if (!book) {
            res.status(404).json({ error: 'Book not found' });
            return;
        }

        //  check if the user is the creator of the book
        if (book.creator.toString() !== req.userId) {
            res.status(403).json({ error: 'You are not authorized to delete this book' });
            return;
        }

        // Delete book
        await Book.findByIdAndDelete(id);

        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Error deleting book - ${error}` });
    }
};



export const postReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // Get the book ID from the request parameters
        const { content, rating } = req.body; 

        
        const book = await Book.findById(id);

        if (!book) {
            res.status(404).json({ error: 'Book not found' });
            return;
        }

        
        const newReview = {
            userId: req.userId, 
            content,
            rating,
        };

        // Add the new review to the book's reviews array
        book.reviews.push(newReview);
                
        // Calculate the new average rating
        const totalRatings = book.reviews.reduce((acc, review) => acc + review.rating!, 0);
        const averageRating = totalRatings / book.reviews.length;
        
        // Update the book's rating
        book.rating = averageRating;

        // Save the updated book document
        await book.save();

        res.status(201).json({ message: 'Review added successfully', book });
    } catch (error) {
        res.status(500).json({ error: `Error posting review - ${error}` });
    }
};


export const getAllGenres = async (req : Request, res: Response): Promise<void> => {
    try {
        // console.log('trying to get genre')
        const genres = await Book.distinct('genre');
        res.status(200).json({genres });
    } catch (error) {
        res.status(500).json({ error: `Error fetching genres - ${error}` });
    }

}