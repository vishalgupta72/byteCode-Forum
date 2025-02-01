const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Post = require('../models/PostModel');

// Create a new category
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if the category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const newCategory = new Category({ name, description });
    await newCategory.save();

    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (err) {
    res.status(500).json({ message: 'Error creating category', error: err.message });
  }
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories.length) {
      return res.status(404).json({ message: 'No categories found' });
    }

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories', error: err.message });
  }
});

// Get posts by category
router.get('/:categoryName/posts', async (req, res) => {
  try {
    // Find the category by name
    const category = await Category.findOne({ name: req.params.categoryName });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Find posts with the matching category _id
    const posts = await Post.find({ category: category._id })
      .populate({ path: 'author', select: 'name' }) 
      .populate({ path: 'category', select: 'name' })
      .populate({ path: 'tags', select: 'name' });

    if (!posts.length) {
      return res.status(404).json({ message: 'No posts found for this category' });
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts for this category', error: err.message });
  }
});


module.exports = router;
