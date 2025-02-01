const mongoose = require('mongoose');

// Define the Comment Schema
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference the User model
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', // Reference the Post model
        required: true,
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment', // Reference the Comment model for nested comments
        default: null,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Users who liked this comment
        },
    ],
    dislikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Users who disliked this comment
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Export the Comment Model
module.exports = mongoose.model('Comment', commentSchema);
