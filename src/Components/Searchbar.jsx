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
  
  const rightfn = () => {
    gsap.to(toright.current, {
      left: 0,
      opacity: 1,
      duration: 0.8,
      delay: 0.4,
      ease: "power2.out"
    });
  }
  
  const leftfn = () => {
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
    let getIt = await axios(str);
    setgetnotes(getIt.data);
    console.log(getIt.data)
  }
  
  useEffect(
    () => {
      getnotesfn('notes.json')
    },
    [],
  )
  
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser does not support speech recognition</p>;
  }
  
  const handleMicClick = () => {
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
    if (transcript) {
      props.setsearch(transcript);
      if (searchinput.current) {
        searchinput.current.value = transcript;
      }
    }
  }, [transcript]);
  
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
        <div className="div rounded-2xl flex justify-start items-center w-[25%] pl-2 bg-white">
          <CiSearch className="transition-all duration-200 hover:scale-125 cursor-pointer text-gray-600" onClick={() => {
            searchinput.current.focus();
          }} />
          <input 
            type="text" 
            ref={searchinput} 
            placeholder="Search" 
            className='w-[95%] md:w-[90%] focus:outline-0 p-1 bg-white text-black placeholder-gray-500' 
            onChange={(e) => {
              props.setsearch(e.target.value);
              console.log(props.search);
              if (e.target.value === "") {
                props.setsearch(null);
              }
            }}
          />
          <div className="div pr-2 scale-85 md:scale-120 hover:scale-140 cursor-pointer transition-all relative" onClick={() => {
            if (listening) {
              SpeechRecognition.stopListening();
            } else {
              SpeechRecognition.startListening({
                continuous: true,
                language: "en-IN",
              });
            }
          }}>
            <AiOutlineAudio className={`text-${listening ? 'red-500' : 'gray-600'} text-xl`} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Searchbar
