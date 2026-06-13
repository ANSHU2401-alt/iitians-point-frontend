import React, { useState } from 'react'
import { useEffect } from 'react';
import Lenis from "lenis";
import { FaRegStar } from "react-icons/fa6";
const Feedback = () => {
    const [ind, setind] = useState(0);
    useEffect(() => {
    const lenis = new Lenis({
    smoothWheel: true,
    lerp: 0.05,
    })

    const raf = (time) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
}, [])
   const array=[<FaRegStar />,<FaRegStar />,<FaRegStar />,<FaRegStar />,<FaRegStar />];
  return (<>
    <div className="div min-h-screen w-[100vw] h-[100vh] bg-black text-white relative opacity-98">
        <video
  src="feedback_wave.mp4"
  loop
  autoPlay
  muted
  playsInline
  className="fixed top-0 left-0 w-full h-full object-cover -z-10"
/>
        <div className="div text-white font-semibold text-2xl flex justify-center items-center w-full py-1.5 mb-2">Please give a minute to fill this Feedback</div>
        <div className="div w-[100%] flex justify-center items-center">
            <div className="div md:w-[50%] bg-zinc-700 rounded-xl px-2.5 opacity-100">
                <div className="w-full flex justify-center items-center space-x-1 pt-1 pb-2">

                    {array.map((value, index) => {
                        if(ind!=null&& ind>=index){
                    return (<>
                        <span key={index} className="text-yellow-300 text-lg hover:scale-105" onMouseEnter={()=>{
                            setind(index)
                        }} >
                        {value}
                        </span>
                        </>
                    );
                }
                else{
                    return (<>
                        <span key={index} className="text-gray-200 text-lg hover:scale-105" onMouseEnter={()=>{
                            setind(index)
                        }} >
                        {value}
                        </span>
                        </>
                    );
                }
                    })}

                </div>

            <div className='text-2xl md:text-4xl font-semibold md:font-bold w-full flex justify-center items-center'>We value your opinion</div>
            <form className='flex flex-col justify-center items-center w-[100%] py-3' method="post" action="https://backend-api.onrender.com/create/feedback">
                <textarea placeholder='Feedback' className='hover:outline-0 outline-0 bg-zinc-600 px-1 rounded-md py-1 md:w-3/4 h-28 md:h-36' name="Feedback"></textarea>
                <button type="submit" className='bg-green-500 hover:bg-green-600 px-2 py-2 rounded-md mt-1.5'>Send</button>
            </form>
            
        </div>
        </div>
        <div className="text-center text-zinc-300 mt-5 space-y-2 font-bold text-xl md:text-2xl">
  <p>“Great systems are built from honest feedback.”</p>
  <p>“Help us improve, one suggestion at a time.”</p>
  <p>“Your experience today builds tomorrow’s better version.”</p>
</div>
    </div>
  </>
  )
}

export default Feedback
