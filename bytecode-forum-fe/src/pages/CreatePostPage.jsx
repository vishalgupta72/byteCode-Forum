import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import './CreatePost.css';
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreatePostPage = () => {
  const contentValueRef = useRef('');
  const [allCategory, setAllCategory] = useState([]);
  const [tagsOptions, setTagsOptions] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const title = e.currentTarget.title.value;
    // const tags = e.currentTarget.tags;
    const tags = Array.from(e.currentTarget.tags).map(input => input.value);
    const categoryId = e.currentTarget.category.value;
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData._id;
    
    if(tags.length === 0){
      alert("Please select at least one more tag");
      return;
    }
    const user_post = {userId, title, tags, categoryId, content: contentValueRef.current };
    // console.log('Post Data:', user_post);
    
    try {


      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/posts`, user_post);
      // console.log(response);

      if(response.status === 201){
        Swal.fire({
          title: "Post Created Successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Post Creation Failed!",
        text: err.response?.data?.message || "An error occurred",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
    // Add logic to send data to the backend
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/categories`);
        setAllCategory(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/tags`);
        const formattedTags = response.data.map(tag => ({
          value: tag._id, // Use `_id` as the value
          label: tag.name // Use `name` as the label
        }));
        setTagsOptions(formattedTags); // Update state with formatted tags
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchCategories();
    fetchTags();
  }, []);

  return (
    <div className="create-post w-full">
      <h1 className='text-4xl font-extralight text-center mb-4'>Create your Post page</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="form-group m-4">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter the post title"
            required
          />
        </div>

        <div className="flex flex-row gap-10 m-4">
          {/* Tags/Topics Searchable Multi-Select */}
          <div className="form-group">
            <label htmlFor="tags">Tags/Topics</label>
            <Select
              className='tags'
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: '#262d34',
                  borderRadius: '5px',
                }),
                menu: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: '#262d34',
                }),
                menuList: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: '#262d34',
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: state.isFocused ? '#4a6888' : 'transparent',
                }),
                multiValueRemove: (baseStyles) => ({
                  ...baseStyles,
                  color: 'black',
                }),
              }}
              id="tags"
              name="tags"
              isMulti
              options={tagsOptions} // Use dynamic options
              placeholder="Select tags"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              required
            >
              <option value="">Select a category</option>
              {allCategory.length > 0 ? (
                allCategory.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option value="">Loading categories...</option>
              )}
            </select>
          </div>
        </div>

        {/* Content/Body Editor */}
        <div className="form-group content-editor m-4">
          <label htmlFor="content">Content/Body</label>
          <ReactQuill
            theme="snow"
            onChange={(htmlValue) => { contentValueRef.current = htmlValue }}
            placeholder="Write your post content here..."
            required
          />
        </div>

        {/* Submit Button */}
        <div className='flex justify-end'>
          <button type="submit" className="btn-create-post active:scale-95 m-4">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
