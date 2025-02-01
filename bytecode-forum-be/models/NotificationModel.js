const mongoose = require('mongoose');

// Define the Notification Schema
const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference the User model (the recipient of the notification)
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['like', 'comment', 'reply', 'follow', 'mention'], // Types of notifications
    },
    data: {
        type: mongoose.Schema.Types.Mixed, // Store additional data based on notification type
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false, // Default is unread
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

// Export the Notification Model
module.exports = mongoose.model('Notification', notificationSchema);
