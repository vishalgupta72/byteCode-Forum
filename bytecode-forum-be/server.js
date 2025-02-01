const express = require('express');
const mongoose = require('mongoose');
// const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');  // User routes
const profileRoutes = require('./routes/profileRoutes');  // Profile routes
const postRoutes = require('./routes/postRoutes');  // Post routes
const commentRoutes = require('./routes/commentRoutes');  // Comment routes
const notificationRoutes = require('./routes/notificationRoutes');  // Notification routes
const categoryRoutes = require('./routes/categoryRoutes');  // Category routes
const tagRoutes = require('./routes/tagRoutes');  // Tag routes
const reportRoutes = require('./routes/reportRoutes');  // Report routes

// Load environment variables
// dotenv.config();
require("dotenv").config();
// Initialize express app
const app = express();

// Middleware setup
app.use(cors());  // Allow cross-origin requests
app.use(bodyParser.json());  // Parse incoming JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.on("connected", () => {
  console.log("connected to MongoDB");
});
mongoose.connection.on("error", (e) => {
  console.log("Error connecting to MongoDB", e);
});

// Use routes
app.use('/api/users', userRoutes);  // User routes (Register, Login, Profile)
app.use('/api/tags', tagRoutes);  // Tag routes
app.use('/api/categories', categoryRoutes);  // Category routes
app.use('/api/posts', postRoutes);  // Post routes
app.use('/api/profiles', profileRoutes);  // Profile routes
app.use('/api/comments', commentRoutes);  // Comment routes
app.use('/api/notifications', notificationRoutes);  // Notification routes
app.use('/api/reports', reportRoutes);  // Report routes

// Home route to check if the server is running
app.get('/', (req, res) => {
  res.send('Byte Code Forum API is running');
});

// Set the server port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
