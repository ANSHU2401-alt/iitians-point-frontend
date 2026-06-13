import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1494178270175-e96de2971df9";
    img.onload = () => {
      setTimeout(() => {
        setImageLoaded(true);
      }, 300);
    };
    const timeout = setTimeout(() => {
      setImageLoaded(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("LOGIN CLICKED"); 

    try {
      const res = await axios.post(
        "https://backend-api-p3b2.onrender.com/login",
        {
          Name: name,
          Password: password
        },
        { withCredentials: true }
      );

      console.log("LOGIN RESPONSE:", res.data); 

      if (res.data.success) {
        setTimeout(() => {
          navigate("/");
        }, 100);
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.log("LOGIN ERROR:", err);
    }
  };

  if (!imageLoaded) {
    return (
      <div className="min-h-screen flex bg-black justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-black">

      {/* LEFT IMAGE */}
      <div className="hidden md:flex w-2/3">
        <img
          src="https://images.unsplash.com/photo-1494178270175-e96de2971df9"
          className="object-cover w-full h-full"
          alt="Login background"
          style={{ opacity: imageLoaded ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}
        />
      </div>

      {/* LOGIN FORM */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/3 p-8">
        <div className="w-full text-white animate-fadeIn">
          <h2 className="text-2xl font-bold text-center mb-6">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mb-6 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            />

            <button
              type="submit"
              className="w-full bg-violet-600 py-2 rounded-lg hover:bg-violet-700 transition-colors duration-200"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-400 mt-4">
            Don't have an account? <Link to="/SignUp" className="text-violet-400 hover:text-violet-300">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
