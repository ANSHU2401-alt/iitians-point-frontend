import React, { useRef, useState } from 'react';
import { useLocation } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoIosPlayCircle, IoMdClose } from "react-icons/io";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";

const Titles = (props) => {
  const { state } = useLocation();
  const { title, subtitle } = state || {};
  const i = useRef(0);
  const [frame, setframe] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullscreen = () => {
    const iframeContainer = document.getElementById('video-container');
    if (!isFullscreen) {
      if (iframeContainer.requestFullscreen) {
        iframeContainer.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <>
      <div className="div bg-zinc-950 min-h-screen text-white w-[100vw] relative">
        {frame && (
          <div 
            id="video-container"
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col"
          >
            <div className="flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent">
              <div className="text-white font-semibold text-lg">
                Now Playing
              </div>
              <div className="flex gap-4">
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-red-500 transition-colors"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? <FiMinimize2 size={24} /> : <FiMaximize2 size={24} />}
                </button>
                <button
                  onClick={() => setframe(null)}
                  className="text-white hover:text-red-500 transition-colors"
                  title="Close"
                >
                  <IoMdClose size={28} />
                </button>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  src={`${frame}?autoplay=1&rel=0&modestbranding=1`}
                  frameBorder="0"
                  className="w-full h-full"
                  title="Video Player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        <div className="text-2xl mb-3 font-bold px-4 py-3 border-b border-zinc-800">
          Title: {title}
        </div>

        <div className="px-3 pb-20">
          {subtitle && subtitle.map((element, index) => {
            const isEven = index % 2 === 0;
            i.current = index + 1;
            
            return (
              <div 
                key={index}
                className={`flex justify-between items-center my-2 ${
                  isEven ? 'bg-zinc-800' : 'bg-zinc-900'
                } hover:bg-zinc-700 transition-all duration-200 py-3 px-4 cursor-pointer rounded-lg group`}
              >
                <div className="flex items-center gap-3 text-[15px] md:text-[18px]">
                  <span className="text-red-500 font-bold">#{index + 1}</span>
                  <span className="group-hover:text-red-400 transition-colors">
                    {element.TITLE}
                  </span>
                </div>
                
                <button
                  className="transform transition-all duration-200 hover:scale-110 active:scale-95"
                  onClick={() => setframe(element.video)}
                  title="Play Video"
                >
                  <IoIosPlayCircle className='h-[30px] w-[30px] md:h-[35px] md:w-[35px] text-red-500 hover:text-red-400' />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Titles;
