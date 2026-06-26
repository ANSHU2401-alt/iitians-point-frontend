import React, { useEffect, useRef, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import gsap from "gsap";
import axios from 'axios'
import Notes_display from './Notes_display';
import { RxCross2 } from "react-icons/rx";
import { AiOutlineAudio } from "react-icons/ai";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Link } from 'react-router-dom';

const Searchbar = (props) => {
  const [shownotes, setshownotes] = useState(false)
  const searchinput = useRef(null)
  const toright = useRef(null)
  const ll = useRef(null)
  const [localSearch, setLocalSearch] = useState('') 
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const rightfn = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true)
      gsap.to(toright.current, {
        left: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out"
      });
    }
  }
  
  const leftfn = () => {
    setIsMenuOpen(false)
    const mm = gsap.matchMedia();
    mm.add("(max-width: 767px)", () => {
      gsap.to(toright.current, {
        left: "-50%",
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    });

    mm.add("(min-width: 768px)", () => {
      gsap.to(toright.current, {
        left: "-19%",
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    });
  };

  const [getnotes, setgetnotes] = useState([])
  
  async function getnotesfn(str) {
    try {
      let getIt = await axios.get(str);
      setgetnotes(getIt.data);
      console.log(getIt.data)
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }
  
  useEffect(() => {
    getnotesfn('/notes.json') 
  }, [])
  
  const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();
  if (!browserSupportsSpeechRecognition) {
    return (
      <div className={`${props.className} relative search flex justify-between p-1.5 items-center w-full opacity-60 z-10 opacity-100`}>
        <div className="hamburger cursor-pointer" onClick={rightfn}>
          <RxHamburgerMenu className='text-white' />
        </div>
        <div className="div rounded-2xl flex justify-start items-center w-[75%] md:w-[50%] lg:w-[25%] pl-2 bg-white">
          <CiSearch className="transition-all duration-200 hover:scale-125 cursor-pointer text-gray-600" onClick={() => {
            searchinput.current?.focus();
          }} />
          <input 
            type="text" 
            ref={searchinput} 
            placeholder="Search" 
            className='w-[95%] md:w-[90%] focus:outline-0 p-1 bg-white text-black placeholder-gray-500' 
            onChange={(e) => {
              const value = e.target.value.toLowerCase(); 
              setLocalSearch(value);
              props.setsearch(value); 
            }}
          />
        </div>
      </div>
    );
  }
  
const handleMicClick = () => {
  console.log("Clicked");
  console.log("Supported:", browserSupportsSpeechRecognition);

  if (listening) {
    SpeechRecognition.stopListening();
  } else {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
    });
  }
};
  
  useEffect(() => {
    if (transcript && transcript.trim() !== "") {
      const lowerTranscript = transcript.toLowerCase(); 
      setLocalSearch(lowerTranscript);
      props.setsearch(lowerTranscript);
      if (searchinput.current) {
        searchinput.current.value = lowerTranscript;
        const event = new Event('input', { bubbles: true });
        searchinput.current.dispatchEvent(event);
      }
    }
  }, [transcript]);
  
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setLocalSearch(value);
    props.setsearch(value);
    console.log("Searching for:", value);
};
  
  return (
    <>
      <div className={`${props.className} relative search flex justify-between p-1.5 items-center w-full opacity-60 z-10 opacity-100`}>
        <div className="bg-zinc-950 div w-[50%] md:w-[19%] rounded-md absolute top-0 md:left-[-19%] left-[-50%] text-black flex flex-col gap-3 cc p-2 min-h-1 justify-center" ref={toright}>
          <div className="p-2 div cursor-pointer" onClick={leftfn}>
            <RxHamburgerMenu className='text-white' />
          </div>
          
          <div className="div bg-zinc-700 hover:bg-zinc-800 cursor-pointer text-white p-2 rounded-md gtroad flex justify-center items-center">
            <Link to="/Notes" state={{ notes: getnotes }}>Notes</Link>
          </div>
          <div className="div bg-zinc-700 hover:bg-zinc-800 cursor-pointer text-white p-2 rounded-md gtroad flex justify-center items-center">PYQS</div>
          <div className="div bg-zinc-700 hover:bg-zinc-800 cursor-pointer text-white p-2 rounded-md gtroad flex justify-center items-center">
            <Link to="/todo">Todo</Link>
          </div>
          <div className="div bg-zinc-700 hover:bg-zinc-800 cursor-pointer text-white p-2 rounded-md gtroad flex justify-center items-center">
            <Link to="/Formula">Formula Sheets</Link>
          </div>
          <div className="div bg-zinc-700 hover:bg-zinc-800 cursor-pointer text-white p-2 rounded-md gtroad flex justify-center items-center">
            <Link to="/Weightage">Weightage</Link>
          </div>
          <div className="div bg-zinc-700 hover:bg-zinc-800 cursor-pointer text-white p-2 rounded-md gtroad flex justify-center items-center">
            <Link to="/FAQ">FAQs</Link>
          </div>
          <div className="div bg-zinc-700 hover:bg-zinc-800 cursor-pointer text-white p-2 rounded-md gtroad flex justify-center items-center">
            <a href="https://jeemain.nta.nic.in/" target='blank'>Jee Main</a>
          </div>
          <div className="div bg-zinc-700 hover:bg-zinc-800 cursor-pointer text-white p-2 rounded-md gtroad flex justify-center items-center">
            <a href="https://jeeadv.ac.in/" target='blank'>Jee Advanced</a>
          </div>
        </div>
        
        <div className={"hamburger cursor-pointer"} onClick={rightfn}>
          <RxHamburgerMenu className='text-white' />
        </div>
        <div className="div rounded-2xl flex justify-start items-center w-[75%] md:w-[50%] lg:w-[25%] pl-2 bg-white">
          <CiSearch className="transition-all duration-200 hover:scale-125 cursor-pointer text-gray-600" onClick={() => {
            searchinput.current?.focus();
          }} />
          <input 
            type="text" 
            ref={searchinput} 
            placeholder="Search" 
            className='w-[95%] md:w-[90%] focus:outline-0 p-1 bg-white text-black placeholder-gray-500' 
            value={localSearch} 
            onChange={handleSearch}
          />
          <div className="div pr-2 scale-85 md:scale-120 hover:scale-140 cursor-pointer transition-all relative" onClick={handleMicClick}>
            <AiOutlineAudio className={`text-${listening ? 'red-500' : 'gray-600'} text-xl`} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Searchbar
