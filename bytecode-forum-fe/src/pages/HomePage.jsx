import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { DotIcon } from "../components/Icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const HomePage = ({search}) => {

  // get all posts form Database
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  
  useEffect(()=>{
    document.title = "Home Page";
    const getPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/posts`);
        const data = await response.data;
        setPosts(data);
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    getPosts();
  },[])

  // Memoize the filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>post.title.toLowerCase().includes(search.toLowerCase()));
  }, [posts, search]);


  const handleGetPost = (post)=>{
    navigate(`/post/${post._id}`);
  }

  return (
    <div className="home-contianer mt-4">

      { localStorage.getItem("token") !=null ? 
      <div className="flex gap-4 justify-between user-create-post">
        {/* profile pic */}
        <div className="profile w-12">
          <img src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
            alt="User"
            className="profile-pic"
          />
        </div>
        <div className="user-create-post-dis">
          
          <p>Let's share what going on your mind</p>
        </div>

        <div className="user-create-post-button">
          <button className="create-post-button active:scale-95">
            <Link to="/create-post">Create Post </Link>
          </button>
        </div>
      </div>
      : "" }


      {/* posts */}
      {filteredPosts.map((post) =>(
        <div key={post._id} onClick={()=>handleGetPost(post)} className="user-create-post cursor-pointer ">
        <div className="flex flex-row gap-4 justify-between">
        <div className="profile">
          <img src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
            alt="User"
            className="profile-pic"
          />

          <div className="user-profile-dis">
            <p className="text-base">{post.author?.name}</p>
            <p className="text-sm text-gray-400">
              {/* for time */}
            {(() => {
                // Extract the date and time portions
                const datePart = post.createdAt.slice(0, 10);
                const timePart = post.createdAt.slice(11, 19);

                // Parse the time into a Date object
                const [hours, minutes, seconds] = timePart.split(":").map(Number);
                const date = new Date();
                date.setHours(hours, minutes + 30, seconds); // Add 30 minutes
                date.setHours(date.getHours() + 5); // Add 5 hours

                // Format the updated time back into HH:mm:ss
                const updatedTime = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

                return `${datePart} at ${updatedTime}`;
              })()}
            </p>
          </div>
        </div>

        <div>
          <DotIcon />
        </div>
        </div>
        

        <h1 className="text-2xl mb-2 mt-2">{post.title}</h1>
        <p className="text-sm" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* tags name */}
        <div className="tags flex flex-row gap-4 text-sm text-gray-400 pt-1 m-3">
          
          {post.tags.map((tag) => (
            <p key={tag._id}>#{tag.name}</p>
          ))}
          {/* <p>#React</p>
          <p>#Node</p>
          <p>#Express</p> */}
        </div>

        <div className="meta flex flex-row gap-4 text-sm text-gray-400 pt-1 justify-between ">
          <p>{post.views} Views</p>
          <p>{post.likes?.length} Likes</p>
          <p>{post.comments?.length} Comments</p>
        </div>
      </div>
      ))}
      {/* post details */}
    </div>
    
  );
};

export default HomePage;
