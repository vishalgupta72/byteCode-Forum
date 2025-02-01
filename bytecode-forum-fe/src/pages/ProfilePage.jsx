import React from "react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
  WebIcon,
} from "../components/Icons";
import './Profile.css'

const ProfilePage = () => {
  return (
    <div className="user-parent flex flex-row">
      {/* user hero left */}
      <div className="user-hero-left flex flex-col w-1/3 p-4">
        {/* user hero */}
        <div className="user-hero bg-gray-800 shadow-md w-full rounded-xl">
          <div className="p-4 justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              alt="User"
              className="profile-pic"
            />
            <h1 className="text-2xl font-bold text-center">Vishal Gupta</h1>
            <p className="text-sm text-center">Software Developer</p>
            <p className="text-sm text-center">Indore, MP India</p>
          </div>

          <div className="flex gap-4 justify-between p-4">
            <button className="create-post-button active:scale-95">
              Follow{" "}
            </button>
            <button className="create-post-button active:scale-95">
              Message{" "}
            </button>
          </div>
        </div>
        {/* user hero close */}

        {/* user social */}
        <div className="user-social bg-gray-800 shadow-md rounded-xl mt-6">
          <h1 className="text-2xl font-bold text-center mt-4">Social Links</h1>
          <div className="flex flex-wrap gap-2 p-2 m-2">
            <WebIcon /> Website
          </div>
          <div className="flex flex-wrap gap-2 p-2 m-2">
            <LinkedInIcon /> LinkedIn
          </div>
          <div className="flex flex-wrap gap-2 p-2 m-2">
            <TwitterIcon /> Twitter
          </div>
          <div className="flex flex-wrap gap-2 p-2 m-2">
            <InstagramIcon /> Instagram
          </div>
          <div className="flex flex-wrap gap-2 p-2 m-2">
            <FacebookIcon /> Facebook
          </div>
        </div>
        {/* user social close */}
      </div>
      {/* user hero left close */}

      {/* user hero right */}
      <div className="user-hero-right flex flex-col w-2/3 p-4">
        {/* user details */}
        <div className="user-details bg-gray-800 shadow-md rounded-xl">
          {/* <h1 className="text-2xl font-bold text-center mt-4">User Details</h1> */}
          <div className="flex flex-wrap gap-4 p-4 -mb-4">
            Full Name:
            <h1>Vishal Gupta</h1>
          </div>
          <hr className="w-11/12 mx-auto my-4 border-gray-300" />
          <div className="flex flex-wrap gap-4 p-4 -mb-4">
            Email:
            <h1>Qq0dD@example.com</h1>
          </div>
          <hr className="w-11/12 mx-auto my-4 border-gray-300" />
          <div className="flex flex-wrap gap-4 p-4 -mb-4">
            Phone:
            <h1>1234567890</h1>
          </div>
          <hr className="w-11/12 mx-auto my-4 border-gray-300" />
          <div className="flex flex-wrap gap-4 p-4 -mb-4">
            Address:
            <h1>Indore, MP India</h1>
          </div>
          <hr className="w-11/12 mx-auto my-4 border-gray-300" />
        </div>
        {/* user details close */}

        <div className="flex justify-between gap-4 mt-6 ">
          <div className="flex flex-col gap-4 user-details bg-gray-800 shadow-md rounded-xl w-1/2 p-4">
          <button className="user-btn-follower w-full active:scale-95">
             10 Follower
            </button>

            <button className="user-btn-following active:scale-95">
             10 Following
            </button>
          </div>

          <div className="flex flex-col gap-4 user-details bg-gray-800 shadow-md rounded-xl w-1/2 p-4">
          <button className="user-btn-posts active:scale-95">
             10 Posts
            </button>

            <button className="user-btn-likes active:scale-95">
             10 Likes
            </button>

            <button className="user-btn-comments active:scale-95">
             10 Comments
            </button>

          </div>
        </div>
      </div>
      {/* user hero right close */}
    </div>
  );
};

export default ProfilePage;
