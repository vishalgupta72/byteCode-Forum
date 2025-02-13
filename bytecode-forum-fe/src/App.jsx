import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";

import "./App.css"; 
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";


{
  /* Public Routes */
}
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CommunityPage from "./pages/CommunityPage";
import CodesharePage from "./pages/CodesharePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RagisterPage";
import PostPage from "./pages/PostDetailPage";

{
  /* Protected Routes */
}
import ProfilePage from "./pages/ProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import ContactPage from "./pages/ContactPage";
import SettingsPage from "./pages/SettingsPage";
import { Provider } from "react-redux";
import {store} from "./redux/store"

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from 'react';


function debounce(func, wait){
  let timeout;
  function debounced(...args){
    clearTimeout(timeout);
    timeout = setTimeout(()=>{
      func.apply(this, args)
    }, wait)
  }

  debounced.clearTimeout = ()=>{
    clearTimeout(timeout);
  }

  return debounced;
}

function App() {

  const [search, setSearch] = useState("");
  
  const handleSearch = useCallback(
    debounce((value)=>{
      setSearch(value);
    }, 300)
    ,[])
    
    console.log(search);


  function DynamicRoutic() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state=>state.userReducer);

    useEffect(() => {
      const userData = localStorage.getItem("user");

      if(userData){
        dispatch({type: "LOGIN_SUCCESS", payload: userData});
        navigate("/");
      }
      else{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({type: "LOGIN_ERROR"});
        navigate("/login");
      }
    }, []);

    return (
      <Routes>
        {/* Public Routes */}
        <Route exact path="/" element={<HomePage search={search} />}></Route>
        <Route exact path="/about" element={<AboutPage />}></Route>
        <Route exact path="/community" element={<CommunityPage />}></Route>
        <Route exact path="/code-share" element={<CodesharePage />}></Route>
        <Route exact path="/contact" element={<ContactPage />}></Route>
        <Route exact path="/login" element={<LoginPage />}></Route>
        <Route exact path="/signup" element={<RegisterPage />}></Route>
        <Route exact path="/post/:id" element={<PostPage />}></Route>

        {/* Protected Routes */}
        <Route exact path="/profile" element={<ProfilePage />}></Route>
        <Route exact path="/settings" element={<SettingsPage />}></Route>
        <Route exact path="/create-post" element={<CreatePostPage />}></Route>
        <Route exact path="/edit/:id" element={<EditPostPage />}></Route>
      </Routes>
    );
  }

  return (
    <>
      <Provider store={store}>
      <Router>
        <Navbar setSearch={handleSearch} />
        <Sidebar />
        <div className="page sm:ml-[320px] lg:ml-[350px] p-2 lg:p-5">
          <DynamicRoutic />
        </div>
      </Router>
      </Provider>
    </>
  );
}

export default App;
