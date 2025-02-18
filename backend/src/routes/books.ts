import { Router } from 'express';
import { getAllBooks, getBookById, createBook,  deleteBook, updateBook, postReview, getAllGenres } from '../handles/handleBooks';
import { validateAdmin, authMiddleware, validateBook, validateReview } from '../middleware/middlewares';
import { upload } from '../config/multer';


const router = Router();

// Public routes
router.get('/', getAllBooks);
router.get('/genres', getAllGenres);
router.get('/:id', getBookById);


// Protected routes
router.post('/', authMiddleware, validateAdmin, upload.single('bookCover'),validateBook, createBook);
router.post('/review/:id',authMiddleware, validateReview, postReview);

router.delete('/delete/:id',authMiddleware, deleteBook)
router.put('/:id', authMiddleware, validateBook, updateBook);

export default router;