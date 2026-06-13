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
  return (
    <>
      <div className={`${props.className} relative search flex justify-between p-1.5 items-center w-full opacity-60 z-10 opacity-100`}>
        <div className="bg-zinc-950 div w-[50%] md:w-[19%] rounded-md  absolute top-0 md:left-[-19%] left-[-50%] text-black flex flex-col gap-3 cc p-2 min-h-1 justify-center" ref={toright}>
          <div className="p-2 div cursor-pointer" onClick={leftfn}><RxHamburgerMenu className='invert' /></div>
          {/* <button className="div bg-zinc-700 hover:bg-zinc-800 cursor-pointer text-white p-2 rounded-md gtroad flex justify-center items-center" onClick={()=>{
              setshownotes(true)
            }}>Notes</button>
            <div className="div">{shownotes && <div className=' absolute top-0 left-0 z-40 w-[80vw] md:w-[100vw] min-h-[90vh] md:min-h-[70vh] bg-zinc-800'>
              <div className="div cut w-full justify-end flex p-2"><RxCross2 /></div>
                  <div className="div flex flex-wrap items-center justify-center gap-2 p-2 text-white p-3">{getnotes.map(value => (
                  <div className="div flex flex-col justify-center items-center">
                    <a href={value.source} target='_blank'><img src="pdfimage.png" alt="None" className='h-[70px] w-[55px]'/></a>
                    <Notes_display
                              id={value.id}
                              title={value.title}
                              source={value.source}
                            />
                  </div>
                ))}</div></div>}</div> */}
          <div className="div bg-zinc-700 hover:bg-zinc-800 cursor-pointer text-white p-2 rounded-md gtroad flex justify-center items-center"><Link to="/Notes" state={{ notes: getnotes }}>Notes</Link></div>
          <div className="div bg-zinc-700 hover:bg-zinc-800 cursor-pointer text-white p-2 rounded-md gtroad flex justify-center items-center">PYQS</div>
          <div className="div bg-zinc-700 hover:bg-zinc-800 cursor-pointer text-white p-2 rounded-md gtroad flex justify-center items-center"><Link to="/todo">Todo</Link></div>
          <div className="div bg-zinc-700 hover:bg-zinc-800 cursor-pointer text-white p-2 rounded-md gtroad flex justify-center items-center"><Link to="/Formula">Formula Sheets</Link></div>
          <div className="div bg-zinc-700 hover:bg-zinc-800 cursor-pointer text-white p-2 rounded-md gtroad flex justify-center items-center"><Link to="/Weightage">Weightage</Link>
            {/* weightage */}
          </div>
          <div className="div bg-zinc-700 hover:bg-zinc-800 cursor-pointer text-white p-2 rounded-md gtroad flex justify-center items-center"><Link to="/FAQ">FAQs</Link></div>
          <div className="div bg-zinc-700 hover:bg-zinc-800 cursor-pointer text-white p-2 rounded-md gtroad flex justify-center items-center"><a href="https://jeemain.nta.nic.in/" target='blank'>Jee Main</a></div>
          <div className="div bg-zinc-700 hover:bg-zinc-800 cursor-pointer text-white p-2 rounded-md gtroad flex justify-center items-center"><a href="https://jeeadv.ac.in/" target='blank'>Jee Advanced</a></div>
        </div>
        <div className={"hamburger cursor-pointer"} onClick={rightfn}><RxHamburgerMenu /></div>
        <div className="div rounded-2xl flex justify-start items-center w-[25%] pl-2 bg-slate-600"><CiSearch className="transition-all
        duration-200 hover:scale-125 cursor-pointer" onClick={() => {
            searchinput.current.focus();
          }} /><input type="text" ref={searchinput} placeholder="Search" className='w-[95%] md:w-[90%] focus:outline-0 p-1' onChange={(e) => {
            props.setsearch(e.target.value);
            console.log(props.search);
            if (props.search == "") {
              props.setsearch(null);
            }
          }}></input>
          <div className="div pr-2 scale-85 md:scale-120 hover:scale-140 cursor-pointer transition-all relative" onClick={() => {
            handleMicClick();
            { props.setsearch(transcript) }
            { searchinput.current.value = transcript }
          }}><AiOutlineAudio color="#d1d5db" />
          </div>
        </div></div></>
  )
}
export default Searchbar