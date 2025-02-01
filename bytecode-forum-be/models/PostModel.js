const mongoose = require('mongoose');

// Define the Post Schema
const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference the User model
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 100, // Limit the title length
        unique: true,
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag', // Reference to the Tag model
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference the Category model
        required: true, // Ensure every post belongs to a category
    },
    content: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference the User model
        },
    ],
    dislikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment', // Reference the Comment model
        },
    ],
    isPublished: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});

// Export the Post Model
module.exports = mongoose.model('Post', postSchema);
