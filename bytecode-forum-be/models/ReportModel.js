const mongoose = require('mongoose');

// Define the Report Schema
const reportSchema = new mongoose.Schema({
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference the User model (the user who reports)
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['post', 'comment'], // Can be either a post or comment report
    },
    reportedItem: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'type', // Dynamically references either Post or Comment model
        required: true,
    },
    reason: {
        type: String,
        required: true,
        maxlength: 500, // Limit the reason text length
    },
    status: {
        type: String,
        enum: ['pending', 'resolved', 'ignored'], // Report status
        default: 'pending', // Default is pending
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

// Export the Report Model
module.exports = mongoose.model('Report', reportSchema);
