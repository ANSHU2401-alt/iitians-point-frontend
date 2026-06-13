import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { LuEyeClosed } from "react-icons/lu";
import Lenis from "lenis";

const SignUp = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const p1 = useRef(null);
  const p2 = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1585543253202-04d3d9f11961?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    
    img.onload = () => {
      setTimeout(() => {
        setImageLoaded(true);
        setLoading(false);
      }, 300);
    };
    
    img.onerror = () => {
      console.log("Image failed to load");
      setLoading(false);
    };

    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (imageLoaded) {
      const lenis = new Lenis({
        smoothWheel: true,
        lerp: 0.15,
      });

      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);
      return () => lenis.destroy();
    }
  }, [imageLoaded]);
  if (loading) {
    return (
      <div className="min-h-screen flex bg-black justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-700 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <div className="text-white text-xl font-light tracking-wide">
            Setting up your experience...
          </div>
          <div className="text-gray-500 text-sm">
            Please wait while we prepare everything
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-black text-white overflow-hidden w-[100vw]">
      <div
        className="hidden md:flex w-[50%] m-5"
      >
        <img 
          src="https://images.unsplash.com/photo-1585543253202-04d3d9f11961?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Sign up illustration" 
          className="rounded-2xl object-cover w-full h-full"
          style={{
            opacity: imageLoaded ? 1 : 0,
            transform: imageLoaded ? 'scale(1)' : 'scale(1.05)',
            transition: 'opacity 0.7s ease-in-out, transform 0.7s ease-in-out'
          }}
        />
      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-[50%] p-4">
        <div 
          className="w-full max-w-md bg-zinc-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg"
          style={{
            opacity: imageLoaded ? 1 : 0,
            transform: imageLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease-in-out 0.2s, transform 0.5s ease-in-out 0.2s'
          }}
        >
          <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
            Create Account
          </h2>

          <form className="space-y-4" method="post" action="https://backend-api.onrender.com/create">
            <div className="flex flex-col gap-2">
              <input
                type="text" name="Name"
                placeholder="Full Name"
                className="flex-1 px-3 py-2 rounded-md bg-zinc-700 outline-none hover:bg-zinc-600 focus:ring-2 focus:ring-green-500 transition-all duration-200"
                required
              />
            </div>

            <input
              type="email" name="Email"
              placeholder="Email Address"
              className="w-full px-3 py-2 rounded-md bg-zinc-700 outline-none hover:bg-zinc-600 focus:ring-2 focus:ring-green-500 transition-all duration-200"
              required
            />

            <div className="flex">
              <input
                type={show ? "text" : "password"}
                name="Password"
                onChange={(e) => {
                  const value = e.target.value;
                  p1.current = value;

                  const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
                  const hasNumber = /[0-9]/;
                  const hasUpperCase = /[A-Z]/;

                  if (value.length > 0 && value.length < 5) {
                    setPasswordError("Weak password - Too short");
                  }
                  else if (value.length >= 5 && !specialChar.test(value)) {
                    setPasswordError("Weak password - Add special character");
                  }
                  else if (value.length >= 5 && !hasNumber.test(value)) {
                    setPasswordError("Weak password - Add numbers");
                  }
                  else if (value.length >= 5 && !hasUpperCase.test(value)) {
                    setPasswordError("Weak password - Add uppercase letters");
                  }
                  else if (value.length >= 8 && specialChar.test(value) && hasNumber.test(value) && hasUpperCase.test(value)) {
                    setPasswordError("Strong password ✓");
                  }
                  else {
                    setPasswordError("");
                  }
                }}
                placeholder="Password"
                className="flex-1 px-3 py-2 rounded-l-md bg-zinc-700 outline-none hover:bg-zinc-600 focus:ring-2 focus:ring-green-500 transition-all duration-200"
                required
              />
              <div
                className="px-3 py-2 bg-zinc-700 rounded-r-md flex items-center justify-center cursor-pointer hover:bg-zinc-600 transition-colors duration-200"
                onClick={() => setShow(!show)}
              >
                <LuEyeClosed />
              </div>
            </div>

            {passwordError && (
              <p className={`text-sm mt-1 ${passwordError.includes("Strong") ? 'text-green-400' : 'text-red-400'}`}>
                {passwordError}
              </p>
            )}

            <div className="flex">
              <input
                type={show1 ? "text" : "password"} 
                name="ConfirmPassword" 
                onChange={(e) => {
                  p2.current = e.target.value;
                }}
                placeholder="Confirm Password"
                className="flex-1 px-3 py-2 rounded-l-md bg-zinc-700 outline-none hover:bg-zinc-600 focus:ring-2 focus:ring-green-500 transition-all duration-200"
                required
              />
              <div 
                className="px-3 py-2 bg-zinc-700 rounded-r-md flex items-center justify-center cursor-pointer hover:bg-zinc-600 transition-colors duration-200" 
                onClick={() => setShow1(!show1)}
              >
                <LuEyeClosed />
              </div>
            </div>

            {p1.current && p2.current && p1.current !== p2.current && (
              <p className="text-red-400 text-sm mt-1">
                Passwords do not match
              </p>
            )}

            <input
              type="date" name="DOB"
              placeholder="Date of Birth"
              className="w-full px-3 py-2 rounded-md bg-zinc-700 outline-none hover:bg-zinc-600 focus:ring-2 focus:ring-green-500 transition-all duration-200"
              required
            />

            <button 
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-md font-semibold transition-all duration-200 transform hover:scale-[1.02]"
              disabled={passwordError && !passwordError.includes("Strong")}
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-400 mt-4 text-sm">
            Already have an account?{" "}
            <a href="/Login" className="text-green-400 hover:text-green-300 transition-colors duration-200">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
