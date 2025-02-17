import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], 
        default: 'user'
    },
    profilePicture: {
        type: String, 
        default: null 
    },
    reviewedBooks: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
}, { timestamps: true });

export const User = mongoose.model('User', userSchema); 