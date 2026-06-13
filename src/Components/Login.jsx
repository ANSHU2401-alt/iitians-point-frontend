import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("LOGIN CLICKED"); // DEBUG

    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          Name: name,
          Password: password
        },
        { withCredentials: true }
      );

      console.log("LOGIN RESPONSE:", res.data); // DEBUG

      if (res.data.success) {

        // 🔥 IMPORTANT: small delay ensures cookie is stored
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

  return (
    <div className="min-h-screen flex bg-black">

      {/* LEFT IMAGE */}
      <div className="hidden md:flex w-2/3">
        <img
          src="https://images.unsplash.com/photo-1494178270175-e96de2971df9"
          className="object-cover w-full h-full"
        />
      </div>

      {/* LOGIN FORM */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/3 p-8">

        <div className="w-full text-white">

          <h2 className="text-2xl font-bold text-center mb-6">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin}>

            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-gray-800 rounded-lg"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mb-6 bg-gray-800 rounded-lg"
              required
            />

            <button
              type="submit"
              className="w-full bg-violet-600 py-2 rounded-lg"
            >
              Login
            </button>

          </form>

          <p className="text-center text-gray-400 mt-4">
            <Link to="/SignUp">Sign Up</Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;