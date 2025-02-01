import React, { useState } from "react";
import './PostDetail.css'

const PostDetailPage = () => {
  const [comments, setComments] = useState([
    { id: 1, author: "John Doe", text: "Great post! Thanks for sharing." },
    { id: 2, author: "Jane Smith", text: "I completely agree with your points." },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    setComments([
      ...comments,
      { id: comments.length + 1, author: "You", text: newComment },
    ]);
    setNewComment("");
  };

  return (
    <div className="post-detail-page bg-gray-800 mt-6 shadow-lg">
      <div className="post-header">
        <h1>How to Build a Tech Forum with React</h1>
        <p className="post-meta">
          By <strong>John Doe</strong> | Posted on January 10, 2025
        </p>
      </div>

      <div className="post-content">
        <p>
          Building a tech forum can be an exciting project for developers
          looking to create a platform for community discussions. This post
          explores the steps to get started with React, Node.js, and MongoDB.
        </p>
        <p>
          Start by setting up your project structure and initializing your
          dependencies. Use React for the front end and Node.js for the backend
          to create a seamless user experience. Don't forget to integrate
          MongoDB for efficient data storage and retrieval!
        </p>
      </div>

      <div className="post-interactions">
        <button className="like-btn p-2 rounded-lg mr-4">👍 Like (12)</button>
        <button className="dislike-btn p-2 rounded-lg">👎 Dislike (3)</button>
      </div>

      <div className="comments-section">
        <h2>Comments</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>
              <strong>{comment.author}</strong>: {comment.text}
            </p>
          </div>
        ))}
        <div className="add-comment flex flex-col items-end">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button className="btn" onClick={handleAddComment}>
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
