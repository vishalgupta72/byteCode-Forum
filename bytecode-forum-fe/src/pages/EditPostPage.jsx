import React, { useState } from "react";
import "./EditPost.css";

const EditPostPage = () => {
  // Initial post data (you can replace this with data fetched from an API)
  const [post, setPost] = useState({
    title: "How to Build a Tech Forum with React",
    content:
      "Building a tech forum can be an exciting project for developers looking to create a platform for community discussions. This post explores the steps to get started with React, Node.js, and MongoDB.",
    tags: ["React", "Node.js", "MongoDB"],
    category: "Development",
  });

  const [tagsInput, setTagsInput] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleAddTag = () => {
    if (tagsInput.trim() !== "") {
      setPost({ ...post, tags: [...post.tags, tagsInput.trim()] });
      setTagsInput("");
    }
  };

  const handleRemoveTag = (tag) => {
    setPost({ ...post, tags: post.tags.filter((t) => t !== tag) });
  };

  const handleSaveChanges = () => {
    console.log("Updated Post Data:", post);
    alert("Post updated successfully!");
  };

  return (
    <div className="edit-post-page mt-4 bg-gray-800">
      <h1>Edit Post</h1>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleInputChange}
          placeholder="Enter post title"
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea
          name="content"
          value={post.content}
          onChange={handleInputChange}
          placeholder="Enter post content"
        />
      </div>

      <div className="form-group">
        <label>Tags</label>
        <div className="tags-container">
          {post.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}{" "}
              <button
                type="button"
                className="remove-tag-btn"
                onClick={() => handleRemoveTag(tag)}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <div className="add-tag">
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="Add a tag"
          />
          <button type="btn-add-tag" onClick={handleAddTag}>
            Add Tag
          </button>
        </div>
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          value={post.category}
          onChange={handleInputChange}
          className="ml-0"
        >
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="Business">Business</option>
        </select>
      </div>

      <div className="flex flex-col items-end">
        <button
          className="btn-save"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditPostPage;
