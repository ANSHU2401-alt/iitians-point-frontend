import React, { useState } from 'react'
import { useEffect } from 'react';
import Lenis from "lenis";
import { FaRegStar } from "react-icons/fa6";

const Feedback = () => {
  const [ind, setind] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const array = [<FaRegStar />, <FaRegStar />, <FaRegStar />, <FaRegStar />, <FaRegStar />];

  useEffect(() => {
    const video = document.createElement('video');
    video.src = "feedback_wave.mp4";
    video.preload = "auto";
    
    video.oncanplaythrough = () => {
      setTimeout(() => {
        setVideoLoaded(true);
        setLoading(false);
      }, 300);
    };
    
    video.onerror = () => {
      console.log("Video failed to load");
      setLoading(false);
    };

    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
      video.remove();
    };
  }, []);

  useEffect(() => {
    if (videoLoaded) {
      const lenis = new Lenis({
        smoothWheel: true,
        lerp: 0.05,
      });

      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);
      return () => lenis.destroy();
    }
  }, [videoLoaded]);
  if (loading) {
    return (
      <div className="min-h-screen w-[100vw] bg-black text-white flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-700 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <div className="text-white text-xl font-light tracking-wide">
            Loading your experience...
          </div>
          <div className="text-gray-500 text-sm">
            Please wait while we prepare the background
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="div min-h-screen w-[100vw] h-[100vh] bg-black text-white relative opacity-98 overflow-hidden">
        <video
          src="feedback_wave.mp4"
          loop
          autoPlay
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover -z-10"
          style={{
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 0.7s ease-in-out'
          }}
        />
        
        <div 
          className="div text-white font-semibold text-2xl flex justify-center items-center w-full py-1.5 mb-2"
          style={{
            opacity: videoLoaded ? 1 : 0,
            transform: videoLoaded ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
          }}
        >
          Please give a minute to fill this Feedback
        </div>
        
        <div className="div w-[100%] flex justify-center items-center">
          <div 
            className="div md:w-[50%] bg-zinc-700 rounded-xl px-2.5 opacity-100 backdrop-blur-sm bg-opacity-90"
            style={{
              opacity: videoLoaded ? 1 : 0,
              transform: videoLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease-in-out 0.2s, transform 0.5s ease-in-out 0.2s'
            }}
          >
            <div className="w-full flex justify-center items-center space-x-1 pt-1 pb-2">
              {array.map((value, index) => {
                if(ind !== null && ind >= index){
                  return (
                    <span 
                      key={index} 
                      className="text-yellow-300 text-lg hover:scale-105 transition-transform duration-200 cursor-pointer" 
                      onMouseEnter={() => setind(index)}
                    >
                      {value}
                    </span>
                  );
                } else {
                  return (
                    <span 
                      key={index} 
                      className="text-gray-200 text-lg hover:scale-105 transition-transform duration-200 cursor-pointer" 
                      onMouseEnter={() => setind(index)}
                    >
                      {value}
                    </span>
                  );
                }
              })}
            </div>

            <div className='text-2xl md:text-4xl font-semibold md:font-bold w-full flex justify-center items-center text-center'>
              We value your opinion
            </div>
            
            <form className='flex flex-col justify-center items-center w-[100%] py-3' method="post" action="https://backend-api-p3b2.onrender.com//feedback">
              <textarea 
                placeholder='Share your feedback here...' 
                className='hover:outline-0 outline-0 bg-zinc-600 px-3 rounded-md py-2 md:w-3/4 h-28 md:h-36 focus:ring-2 focus:ring-green-500 transition-all duration-200' 
                name="Feedback"
              ></textarea>
              <button 
                type="submit" 
                className='bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md mt-1.5 transition-all duration-200 transform hover:scale-105'
              >
                Send Feedback
              </button>
            </form>
          </div>
        </div>
        
        <div 
          className="text-center text-zinc-300 mt-5 space-y-2 font-bold text-xl md:text-2xl px-4"
          style={{
            opacity: videoLoaded ? 1 : 0,
            transform: videoLoaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease-in-out 0.4s, transform 0.5s ease-in-out 0.4s'
          }}
        >
          <p className="hover:text-white transition-colors duration-300">“Great systems are built from honest feedback.”</p>
          <p className="hover:text-white transition-colors duration-300">“Help us improve, one suggestion at a time.”</p>
          <p className="hover:text-white transition-colors duration-300">“Your experience today builds tomorrow’s better version.”</p>
        </div>
      </div>
    </>
  );
};

export default Feedback;
