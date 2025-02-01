const express = require('express');
const router = express.Router();
const Tag = require('../models/TagModel');
const Post = require("../models/PostModel")

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the tag already exists
    const existingTag = await Tag.findOne({ name });
    if (existingTag) {
      return res.status(400).json({ message: 'Tag already exists' });
    }

    const newTag = new Tag({ name });
    await newTag.save();

    res.status(201).json({ message: 'Tag created successfully', tag: newTag });
  } catch (err) {
    res.status(500).json({ message: 'Error creating tag', error: err.message });
  }
});

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find();

    if (!tags.length) {
      return res.status(404).json({ message: 'No tags found' });
    }

    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tags', error: err.message });
  }
});

// Get posts by tag
router.get('/:tagName/posts', async (req, res) => {
  try {
    // Find the tag by name
    const tag = await Tag.findOne({ name: req.params.tagName });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    // Find posts with the matching tag _id
    const posts = await Post.find({ tags: tag._id })
      .populate({ path: 'author', select: 'name' })
      .populate({ path: 'category', select: 'name' })
      .populate({ path: 'tags', select: 'name' });

    if (!posts.length) {
      return res.status(404).json({ message: 'No posts found for this tag' });
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts for this tag', error: err.message });
  }
});


module.exports = router;
