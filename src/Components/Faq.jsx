import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Lenis from "lenis";
const Faq = () => {
const [FAQ, setFAQ] = useState([]);
async function getit(){
    let x=await axios('FAQ.json');
    setFAQ(x.data);
    console.log(x.data)
}
useEffect(() => {
  getit()
}, [])
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.5,
    })

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])
  return (<>
              <div className="div relative min-h-screen w-[100vw] bg-black backdrop-opacity-98 text-white flex flex-col justify-center space-y-3 ">
                    <img src="question.jpg" alt="None" className='absolute -z-1 md:h-[100%] md:w-[100%] h-[0%]'/>
                {FAQ.map(value => {return(<>
              <div className="ml-4 div hover:bg-emerald-600
               cursor-pointer rounded-2xl">
                    <div className="div font-semibold text-2xl px-2 py-2">Q. {value.ques}</div>
                    <div className="div px-2 py-2 text-[18px] md:text-xl">Ans. {value.ans}</div>
                    
                </div>
              </>)
            })}
              </div>
  </>
  )
}

export default Faq
