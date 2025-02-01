const mongoose = require('mongoose');

// Define the Tag Schema
const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50,
    },
    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category',
    //     required: true,
    // },
    description: {
        type: String,
        maxlength: 100, // Optional description for the tag
    },
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

// Export the Tag Model
module.exports = mongoose.model('Tag', tagSchema);
