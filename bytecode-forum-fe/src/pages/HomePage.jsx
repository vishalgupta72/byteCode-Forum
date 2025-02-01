import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { DotIcon } from "../components/Icons";
import axios from "axios";


const HomePage = () => {

  // get all posts form Database
  // const [posts, setPosts] = React.useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/posts`);
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(()=>{
    document.title = "Home Page";

    getPosts();
  },[])


  return (
    <div className="home-contianer mt-4">

      { localStorage.getItem("token") !=null ? 
      <div className="flex gap-4 justify-between user-create-post">
        {/* profile pic */}
        <div className="profile w-12">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
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
      <div className="user-create-post ">
        <div className="flex flex-row gap-4 justify-between">
        <div className="profile">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
            alt="User"
            className="profile-pic"
          />

          <div className="user-profile-dis">
            <p className="text-base">John Doe</p>
            <p className="text-sm text-gray-400">2 hours ago</p>
          </div>
        </div>

        <div>
          <DotIcon />
        </div>
        </div>
        {/* <h1>sdkjhfudsihfiushi</h1> */}
        

        <h1 className="text-4xl mb-2 mt-2">post heading</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
          officia fugit assumenda ullam eligendi odio vel nulla dolore
          perspiciatis incidunt pariatur, dolores quis, eveniet alias, maxime
          illo facere nisi eum asperiores aliquam. Odit modi minima dolorum
          saepe amet voluptates necessitatibus enim veritatis alias, nemo
          cumque, quis earum velit exercitationem. Distinctio iure molestias,
          aliquid dolore, repellat a, laborum nisi assumenda inventore quae?
        </p>

        {/* tags name */}
        <div className="tags flex flex-row gap-4 text-sm text-gray-400 pt-1 m-3">
          <p>#React</p>
          <p>#Node</p>
          <p>#Express</p>
        </div>

        <div className="meta flex flex-row gap-4 text-sm text-gray-400 pt-1 justify-between ">
          <p>10 Views</p>
          <p>10 Likes</p>
          <p>10 Comments</p>
        </div>
      </div>
      {/* post details */}
    </div>
    
  );
};

export default HomePage;
