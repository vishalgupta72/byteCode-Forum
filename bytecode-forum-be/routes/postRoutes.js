const express = require("express");
const router = express.Router();
const Post = require("../models/PostModel");
const Category = require("../models/Category");
const Tag = require("../models/TagModel");
const User = require("../models/UserModel");

// Create a new post
router.post("/", async (req, res) => {
  try {
    const { userId, title, tags, categoryId, content } = req.body;

    if (!userId || !title || !categoryId || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }


    const duplicateTitle = await Post.findOne({ title });
    if(duplicateTitle){
      return res.status(204).json({ message: "Post title already exists" });
    }
    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if all tags exist
    const existingTags = await Tag.find({ _id: { $in: tags } });
    if (existingTags.length !== tags.length) {
      return res.status(404).json({ message: "One or more tags not found" });
    }
    // Create a new post
    const newPost = new Post({
      author: userId,
      title,
      tags,
      category: categoryId,
      content,
    });

    const savedPost = await newPost.save();


    // Optionally populate references in the response
    await savedPost.populate("author")
    await savedPost.populate("category")
    const populatedPost = await savedPost.populate("tags");

    res.status(201).json({ message: "Post created successfully", post: populatedPost });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Error creating post", error: err.message });
  }
});


// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
    .populate({ path: 'author', select: 'name' })
    .populate({ path: 'category', select: 'name' })  
    .populate({ path: 'tags', select: 'name' })      
    .sort({ createdAt: -1 });

    if (!posts.length) {
      return res.status(404).json({ message: "No posts found" });
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err.message });
  }
});

// Get a single post
router.get("/:id", async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId).populate([
      { path: 'author', select: 'name' },
      { path: 'category', select: 'name' }, 
      { path: 'tags', select: 'name' }       
    ]);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Increment view count (optional)
    post.views += 1;
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching post", error: err.message });
  }
});

// Update a post
router.put("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, tags, categoryId, content } = req.body;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if all tags exist
    const existingTags = await Tag.find({ _id: { $in: tags } });
    if (existingTags.length !== tags.length) {
      return res.status(404).json({ message: "One or more tags not found" });
    }

    // Update the post
    post.title = title || post.title;
    post.tags = tags || post.tags;
    post.categoryId = categoryId || post.categoryId;
    post.content = content || post.content;

    await post.save();

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (err) {
    res.status(500).json({ message: "Error updating post", error: err.message });
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const postId = req.params.id;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete the post
    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting post", error: err.message });
  }
});

module.exports = router;
