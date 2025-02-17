import mongoose, { Schema } from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  bookCover: { type: String, required: true }, 
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 }, 
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
  reviews: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, 
    content: String,
    rating: Number,
  }],
  
}, { timestamps: true }); 

const Book = mongoose.model('Book', bookSchema);

export default Book; 