import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import {
  AboutIcon,
  ChatIcon,
  CodeShareIcon,
  CommunityIcon,
  ContactIcon,
  HomeIcon,
  NotificationIcon,
  RocketIcon,
  SearchBoxIcon,
} from "./Icons";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state=>state.userReducer);

  const logout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({type: "LOGIN_ERROR"});
    navigate("/login");
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <nav className="navbar gap-4">
      <RocketIcon />
      <div className="navbar-brand">
        {/* <img src="your-logo.png" alt="Logo" className="logo" /> */}
        <span className="brand-name">ByteCode-Forum</span>
      </div>

      <div className="navbar-center flex-1 flex justify-center">
        <div className="navbar-left-icon">
          {/* Home icon */}
          <NavLink to="/" title="Home">
            <HomeIcon />
          </NavLink>

          {/* about icon */}
          <NavLink to="/about" title="About">
          <AboutIcon />
          </NavLink>

          {/* community icon */}
          <NavLink to="/community" title="Community">
          <CommunityIcon />
          </NavLink>

          {/* code share icon */}
          <NavLink to="/code-share" title="Code Share">
          <CodeShareIcon />
          </NavLink>

          <NavLink to="/contact" title="Contact">
          <ContactIcon />
          </NavLink>
        </div>

        {/* search box containter */}
        <div className="search-box-container">
          {/* search box icon */}
          <SearchBoxIcon />

          {/* search box */}
          <input
            type="text"
            placeholder="Type here to search..."
            className="search-box"
            title="Search"
          />
        </div>
      </div>

      <div className="navbar-right-icon">
        {/* Chat Icon  */}
        <ChatIcon />

        {/* notification icon  */}
        <NotificationIcon />



        


        { localStorage.getItem("token") !==null ? 
        // {/* user profile */}
        <div className="profile" onClick={toggleDropdown}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
            alt="User"
            className="profile-pic"
          />
          <span className="profile-name">Vishal Gupta</span>
          <span
            className={`triangle-icon ${isDropdownOpen ? "rotate-icon" : ""}`}
          >
            ▼
          </span>
          {isDropdownOpen && (
            <div className="dropdown-menu flex flex-col">
              <NavLink to="/profile" title="Profile">Profile</NavLink>
              <NavLink to="/settings" title="Settings">Settings</NavLink>
              <NavLink to="/login" onClick={()=>logout()} title="Logout">Logout</NavLink>
            </div>
          )}
        </div>
        // {/* user profile close */}
        :
        // {/* login button */}
        <div>
          <button className="btn-login active:scale-95" onClick={()=>disbaled}><Link to="/login">Login</Link></button>
        </div>
        }

      </div>
    </nav>
  );
};

export default Navbar;
