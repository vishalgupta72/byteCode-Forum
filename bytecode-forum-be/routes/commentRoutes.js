const express = require('express');
const router = express.Router();
const Comment = require('../models/CommentModel');
const Post = require('../models/PostModel');

// Create a new comment
router.post('/:postId', async (req, res) => {
  try {
    const { userId, content } = req.body;  // assuming the body contains userId and content of the comment
    const postId = req.params.postId;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Create a new comment
    const newComment = new Comment({
      userId,
      postId,
      content,
      date: new Date(),
    });

    // Save the comment to the database
    await newComment.save();

    // Add the comment ID to the post's comments array (optional)
    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json({ message: 'Comment created successfully', comment: newComment });
  } catch (err) {
    res.status(500).json({ message: 'Error creating comment', error: err.message });
  }
});

// Get all comments for a post
router.get('/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;

    // Find all comments related to the post
    const comments = await Comment.find({ postId }).populate('userId', 'username').sort({ date: -1 });

    if (!comments.length) {
      return res.status(404).json({ message: 'No comments found for this post' });
    }

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching comments', error: err.message });
  }
});

// Update a comment
router.put('/:commentId', async (req, res) => {
  try {
    const { content } = req.body;
    const commentId = req.params.commentId;

    // Find the comment by ID and update it
    const updatedComment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment updated successfully', comment: updatedComment });
  } catch (err) {
    res.status(500).json({ message: 'Error updating comment', error: err.message });
  }
});

// Delete a comment
router.delete('/:commentId', async (req, res) => {
  try {
    const commentId = req.params.commentId;

    // Find the comment by ID and delete it
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Remove the deleted comment ID from the post's comments array (optional)
    const post = await Post.findById(deletedComment.postId);
    if (post) {
      post.comments = post.comments.filter(comment => comment.toString() !== commentId);
      await post.save();
    }

    res.status(200).json({ message: 'Comment deleted successfully', comment: deletedComment });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting comment', error: err.message });
  }
});

module.exports = router;
