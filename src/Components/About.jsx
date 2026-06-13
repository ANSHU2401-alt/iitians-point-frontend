import React from 'react'
import Comments from './Comments'
import { useEffect } from 'react';
import Lenis from "lenis";
const About = () => {
  useEffect(() => {
    const lenis = new Lenis({
    smoothWheel: true,
    lerp: 0.2,
    })

    const raf = (time) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
}, [])
  return (
    <div className='w-[100vw] bg-black min-h-[100vh] text-white relative px-2 overflow-x-hidden'>
      {/* <video src="galaxy.mp4" autoPlay loop muted className='-z-10 absolute h-[100%]' onLoadedMetadata={(e) => {
    e.currentTarget.playbackRate = 0.8;
  }}></video> */}
      <div className="div flex justify-center items-center space-x-5 py-3 px-2.5" >
        <div className="div w-[60%] md:w-[40%] px-2 min-h-1 flex items-center justify-center " >
        <div className="div">
          <h1 className='text-2xl font-bold py-2 mb-3 flex justify-center px-2 hover:bg-emerald-800 transition-all 1s cubic-bezier(0.075, 0.82, 0.165, 1) hover:rounded-md delay-[80ms] cursor-pointer'>OUR MISSION</h1>
            Our mission at IITian Bros is to bridge the gap between aspiration and achievement by providing students with clear guidance, authentic resources, and peer-driven support. We aim to simplify complex academic and career paths by sharing real IIT experiences, structured learning materials, and practical insights to help students grow with confidence.</div>
        </div>
        <img src="https://plus.unsplash.com/premium_photo-1745299853438-ab59e19fa167?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="None" className='cursor-pointer hover:border-5 border-emerald-600 rounded-full w-[140px] h-[140px] md:w-[225px] md:h-[225px]'/>
      </div>
      <div className="mt-3.5 div flex justify-center items-center space-x-5 py-3 px-2.5">
            <img src="https://plus.unsplash.com/premium_photo-1723874571151-052a8894a37d?q=80&w=809&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="None" className='cursor-pointer hover:border-5 border-emerald-600 rounded-full w-[140px] h-[140px] md:w-[225px] md:h-[225px] '/>
        <div className="div w-[60%] md:w-[40%] px-2 min-h-1 flex items-center justify-center">
        <div className="div"><h1 className='text-2xl font-bold py-2 mb-3 flex justify-center px-2 hover:bg-emerald-800 transition-all 1s cubic-bezier(0.075, 0.82, 0.165, 1) hover:rounded-md delay-[80ms] cursor-pointer'>OUR APPROACH</h1>
            Our Approach at IITian Bros is built around clarity, structure, and real-world relevance. We focus on breaking down complex academic and career decisions into simple, manageable steps that students can actually follow.</div></div>
      </div>
      

        <div className="mt-3.5 div flex justify-center items-center space-x-5 py-3 px-2.5">
        <div className="div w-[60%] md:w-[40%] px-2 min-h-1 flex items-center justify-center">
        <div className="div"><h1 className='text-2xl font-bold py-2 mb-3 flex justify-center px-2 hover:bg-emerald-800 transition-all 1s cubic-bezier(0.075, 0.82, 0.165, 1) hover:rounded-md delay-[80ms] cursor-pointer'>OUR COMMITEMENT</h1>
           Our Commitment at IITian Bros is to consistently deliver honest, high-quality, and student-focused content that empowers learners at every stage of their journey.By staying connected with real student experiences and evolving educational needs, we strive to build a supportive learning environment where curiosity is encouraged, doubts are addressed, and growth becomes a shared goal.</div></div>
            <img src="starbucks.jpeg" alt="None" className='cursor-pointer hover:border-5 border-emerald-600 rounded-full w-[140px] h-[140px] md:w-[225px] md:h-[225px]'/>
      </div>

      
      <div className="mt-3.5 div flex justify-center items-center space-x-5 py-3 px-2.5">
            <img src="https://plus.unsplash.com/premium_photo-1682308429561-930e3df7ca6a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGhpbG9zb3BoeXxlbnwwfHwwfHx8MA%3D%3D" alt="None" className='cursor-pointer hover:border-5 border-emerald-600 rounded-full w-[140px] h-[140px] md:w-[225px] md:h-[225px]'/>
        <div className="div w-[60%] md:w-[40%] px-2 min-h-1 flex items-center justify-center">
        <div className="div"><h1 className='text-2xl font-bold py-2 mb-3 flex justify-center px-2 hover:bg-emerald-800 transition-all 1s cubic-bezier(0.075, 0.82, 0.165, 1) hover:rounded-md delay-[80ms] cursor-pointer'>OUR PHILOSOPHY</h1>
            At IITian Bros, we believe that education should be driven by curiosity, not fear. Learning works best when students feel understood, supported, and motivated. Our philosophy is rooted in peer-to-peer growth, where shared experiences turn into shared success.</div></div>
      </div>

        <div className="p-4 div w-[100vw] flex justify-center items-center">
            <img src="cup.png" alt="None" className='w-[100%] md:w-[80%] rounded-xl'/>
        </div>

       <div className="forcomments">
        <h1 className='text-2xl
         font-bold py-2 mb-3 flex justify-center mt-8 underline cursor-pointer'>WHAT STUDENT'S SAY</h1>
        <Comments/>
      </div>
    </div>
  )
}

export default About
