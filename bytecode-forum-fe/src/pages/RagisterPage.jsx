import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserCredential.css";
import { CircleIcon, UserIcon } from "../components/Icons";
import axios from "axios";
import Swal from "sweetalert2";

const RagisterPage = () => {
  const [error, setError] = useState("");
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (/** @type {Event} */ e) => {
    // debugger;
    e.preventDefault();

    const name = e.currentTarget.name.value;
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    const user = { name, email, password };
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/register`,
        user
      );
      if (result.status === 201) {
        Swal.fire({
          title: "Signup Successful!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/login");
      }
      // formRef.current.reset();
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      Swal.fire({
        title: "Signup Failed",
        text: err.response?.data?.message || "An error occurred",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } finally {
      setIsLoading(false); // Stop loading spinner
    }

    // console.log("signing in with:", { name, email, password });
    setError("");
  };

  return (
    <div className="user-login shadow-md">
      <UserIcon />
      <form onSubmit={handleSubmit} className=" p-6 rounded ">
        <h2 className="text-center text-2xl mb-4 -mt-4">Sing-Up</h2>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <div className="form-group mb-4">
          <input
            type="text"
            id="text"
            name="name"
            className="shadow "
            required
          />
          <span>name</span>
        </div>
        <div className="form-group mb-4">
          <input
            type="email"
            id="email"
            name="email"
            className="shadow "
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
            "Sign up"
          )}
        </button>
      </form>

      {/* remember me and forgot password */}
      <div className="justify-center w-4/5 p-6 -mt-4">
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-sm text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RagisterPage;
