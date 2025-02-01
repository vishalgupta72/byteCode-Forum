const express = require('express');
const router = express.Router();
const Profile = require('../models/ProfileModel');
const User = require('../models/UserModel');

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the profile by userId
    const profile = await Profile.findOne({ userId })
      .populate('userId', 'username email')  // Populate user information like username and email
      .exec();

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
});

// Update user profile
router.put('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { bio, profilePicture, location, socialLinks } = req.body;

    // Find the user profile
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Update the profile
    profile.bio = bio || profile.bio;
    profile.profilePicture = profilePicture || profile.profilePicture;
    profile.location = location || profile.location;
    profile.socialLinks = socialLinks || profile.socialLinks;

    await profile.save();

    res.status(200).json({ message: 'Profile updated successfully', profile });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
});

// Create a new user profile (in case it doesn't exist)
router.post('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { bio, profilePicture, location, socialLinks } = req.body;

    // Check if the profile already exists
    const existingProfile = await Profile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists' });
    }

    // Create a new profile
    const newProfile = new Profile({
      userId,
      bio,
      profilePicture,
      location,
      socialLinks,
    });

    await newProfile.save();

    res.status(201).json({ message: 'Profile created successfully', profile: newProfile });
  } catch (err) {
    res.status(500).json({ message: 'Error creating profile', error: err.message });
  }
});

// Delete user profile
router.delete('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the profile by userId and delete it
    const profile = await Profile.findOneAndDelete({ userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting profile', error: err.message });
  }
});

module.exports = router;
