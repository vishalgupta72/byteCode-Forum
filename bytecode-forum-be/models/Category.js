const mongoose = require('mongoose');

// Define the Category Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50, // Limit the length of category names
    },
    description: {
        type: String,
        maxlength: 200, // Optional description for the category
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

// Export the Category Model
module.exports = mongoose.model('Category', categorySchema);
