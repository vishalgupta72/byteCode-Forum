const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const {protect} = require('../middlewares/authMiddleware')

const generateToken = (id) =>{
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
}
// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await digestMessage(password);
    const newUser = await User.create({name, email, password: hashedPassword})
    // Create new user

    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully', user: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id)
  } });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the password
    const hashedPassword = await digestMessage(password);
    const isMatch = hashedPassword === user.password;
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate a token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2 days' });

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId).select('-password');  // Exclude password field

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user profile', error: err.message });
  }
});


// Protected route data
const getProtectedData = (req, res) => {
  res.status(200).json({ message: 'Access granted to protected route', user: req.user });
};

// Protected route
router.get('/protected', protect, getProtectedData);

async function digestMessage(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return hash;
}


module.exports = router;
