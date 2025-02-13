import React, { useEffect, useState } from "react";
import './PostDetail.css';
import axios from "axios";
import { useParams } from "react-router-dom";

const PostDetailPage = () => {
  const [comments, setComments] = useState([
    { id: 1, author: "John Doe", text: "Great post! Thanks for sharing." },
    { id: 2, author: "Jane Smith", text: "I completely agree with your points." },
  ]);
  const [newComment, setNewComment] = useState("");
  const [post, setPost] = useState({});
  const { id } = useParams();

  // Fetch post details by ID
  const getPostDetails = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/posts/${id}`);
      console.log(result.data);
      setPost(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    setComments([
      ...comments,
      { id: comments.length + 1, author: "You", text: newComment },
    ]);
    setNewComment("");
  };

  const handleLikeDislike = async() => {
    const userId = post.author?._id; // Ensure post.author exists
    const postId = post._id;

    if (!userId || !postId) {
      console.error("Post or user ID is missing");
      return;
    }

    const postLikeDislike = { userId, postId };

    if (!localStorage.getItem("token")) {
      alert("Please log in");
      return;
    }

    try {
      let result = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/posts/like-dislike`, postLikeDislike);
      console.log(result );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Post Details";
    getPostDetails();
  }, []);

  return (
    <div className="post-detail-page mt-6 shadow-lg">
      {/* Post Header */}
      <div className="post-header">
        <h1>{post.title}</h1>
        <p className="post-meta">
          By <strong>{post.author?.name}</strong> | Posted on {(() => {
            if (!post.createdAt) return "";
            const datePart = post.createdAt.slice(0, 10);
            const timePart = post.createdAt.slice(11, 19);
            const [hours, minutes, seconds] = timePart.split(":").map(Number);
            const date = new Date();
            date.setHours(hours, minutes + 30, seconds); // Add 30 minutes
            date.setHours(date.getHours() + 5); // Add 5 hours
            const updatedTime = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
            return `${datePart} at ${updatedTime}`;
          })()}
        </p>
      </div>

      {/* Post Content */}
      <div className="post-content">
        <p className="text-base" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Post Interactions */}
      <div className="post-interactions">
        <button onClick={handleLikeDislike} className="like-btn p-2 rounded-lg mr-4">
          👍 Like ({Array.isArray(post.likes) ? post.likes.length : 0})
        </button>
        <button onClick={handleLikeDislike} className="dislike-btn p-2 rounded-lg">
          👎 Dislike ({Array.isArray(post.dislikes) ? post.dislikes.length : 0})
        </button>
      </div>

      {/* Comments Section */}
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