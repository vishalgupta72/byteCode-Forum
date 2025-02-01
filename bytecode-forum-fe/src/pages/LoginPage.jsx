import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserCredential.css";
import { CircleIcon, UserIcon } from "../components/Icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (/** @type {Event} */ e) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true); // Start loading spinner

    const user = { email, password };

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
        user
      );

      if (result.status === 200) {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user", JSON.stringify(result.data.user));

        dispatch({ type: "LOGIN_SUCCESS", payload: result.data.user });

        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          confirmButtonText: "OK",
        });

        navigate("/");
      }
      // formRef.current.reset();
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      Swal.fire({
        title: "Login Failed",
        text: err.response?.data?.message || "An error occurred",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  return (
    <>
      <div className="user-login shadow-md">
        <UserIcon />
        <form onSubmit={handleSubmit} className="p-6 rounded">
          <h2 className="text-center text-2xl mb-4 -mt-4">Login</h2>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="form-group mb-4">
            <input
              type="email"
              id="email"
              name="email"
              className="shadow"
              ref={emailRef}
              required
            />
            <span>email</span>
          </div>
          <div className="form-group mb-6">
            <input
              type="password"
              id="password"
              name="password"
              className="shadow appearance-none"
              required
            />
            <span>password</span>
          </div>
          <button
            type="submit"
            className={`btn-login font-bold py-2 px-4 focus:outline-none focus:shadow-outline active:scale-95 flex items-center justify-center gap-2 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <CircleIcon /> <span>Loading...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* remember me and forgot password */}
        <div className="justify-center w-4/5 p-6 -mt-4">
          <Link to="/forgot-password" className="text-sm text-blue-500">
            Forgot Password?
          </Link>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-sm text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
