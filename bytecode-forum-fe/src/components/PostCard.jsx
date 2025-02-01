import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.content.slice(0, 100)}...</p>
      <button>Read More</button>
    </div>
  );
};

export default PostCard;
