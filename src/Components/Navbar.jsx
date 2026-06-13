import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  const searchinput = useRef(null);
  const [dark, setDark] = useState(false);

  const toggleDarkMode = () => {
    setDark(prev => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="w-full bg-slate-700 dark:bg-slate-800 text-white p-2.5 md:px-2 md:py-3 justify-between md:justify-around md:flex items-center sticky top-0 z-50 transition-colors duration-300">
      
      <div className="cursor-pointer font-semibold text-xl">
        IITian - Bros
      </div>

      <div className="flex gap-2.5 md:gap-2.5 items-center flex-wrap space-x-2">

        <div className="cursor-pointer hover:font-semibold w-[50px] md:w-[75px] flex">
          <Link to="/">Home</Link>
        </div>

        <div className="cursor-pointer hover:font-semibold w-[50px] md:w-[75px] flex">
          <Link to="/about">About</Link>
        </div>

        <div className="cursor-pointer hover:font-semibold w-[50px] md:w-[75px] flex">
          <Link to="/todo">Tasks</Link>
        </div>

        <div className="cursor-pointer hover:font-semibold w-[75px] md:w-[90px] flex">
          <Link to="/Contribute">Contribute</Link>
        </div>

        <div className="cursor-pointer hover:font-semibold w-[75px] hidden md:flex">
          <Link to="/contact">Contact</Link>
        </div>

        <div className="flex items-center space-x-2.5">
          <button className="px-2 py-1 text-white border border-white rounded-2xl cursor-pointer hover:font-semibold w-[60px]">
            <Link to="/login">Login</Link>
          </button>

          <button className="px-2 py-1 bg-white text-black rounded-2xl cursor-pointer hover:font-semibold w-[80px]">
            <Link to="/SignUp">Sign Up</Link>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;