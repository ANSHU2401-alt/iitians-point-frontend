import React, { useState, useEffect } from 'react'
import { IoMailOpenSharp } from "react-icons/io5";
import Lenis from "lenis";

const ContactUs = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "telephone.jpg";
    img.onload = () => {
      setImageLoaded(true);
    };

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

  // Show loading screen until image loads
  if (!imageLoaded) {
    return (
      <div className="w-full min-h-screen bg-zinc-950 flex justify-center items-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="div w-full min-h-screen bg-zinc-950 relative opacity-99.5 text-white">
        <img 
          src="telephone.jpg" 
          alt="Background" 
          className='h-[90%] w-full absolute -z-10 opacity-68'
          onLoad={() => setImageLoaded(true)}
        />
        <div className="div w-full flex justify-center items-center min-h-screen">
          <div className="div w-[60%] md:w-[35%] py-2 bg-black opacity-75 rounded-2xl">
            <form className='flex flex-col justify-center items-center space-y-1.5 py-3.5' method='post' action="https://backend-api-p3b2.onrender.com/Contact">
              <div className='font-semibold text-xl'>Get in Touch</div>
              <input type="text" placeholder='Enter name ' className='hover:outline-0 outline-0 bg-zinc-600 py-2 rounded-md px-2 w-[70%]' name="Name"></input>
              <input type="text" placeholder='Email ' className='hover:outline-0 outline-0 bg-zinc-600 py-2 rounded-md px-2 w-[70%]' name="Email"></input>
              <input type="text" placeholder='Username ' className='hover:outline-0 outline-0 bg-zinc-600 py-2 rounded-md px-2 w-[70%]' name="Username"></input>
              <input type="comment" placeholder='Query ' className='hover:outline-0 outline-0 bg-zinc-600 py-2 rounded-md px-2 w-[70%] ' name="comment"></input>
              <button type="submit" className='bg-green-400 px-2 py-2 rounded-md hover:bg-green-500'>Send</button>
            </form>
            <div className="div flex justify-center items-center space-x-1">
              <div className="div"><a href="mailto:kramanwas20@gmail.com"><IoMailOpenSharp className='w-[25px] h-[25px] cursor-pointer'/></a></div>
              <div className="div"><a href="mailto:aman_2401me45@iitp.ac.in"><IoMailOpenSharp className='w-[25px] h-[25px] cursor-pointer'/></a></div>
              <div className="div"><a href="mailto:iitianbros88@gmail.com"><IoMailOpenSharp className='w-[25px] h-[25px] cursor-pointer'/></a></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUs
