import React from 'react'
import { GoDownload } from "react-icons/go";
import { useEffect } from 'react';
import Lenis from "lenis";
const Weightage = () => {
    useEffect(() => {
      const lenis = new Lenis({
        smoothWheel: true,
        lerp: 0.15,
      })
  
      const raf = (time) => {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
  
      requestAnimationFrame(raf)
  
      return () => lenis.destroy()
    }, [])
  return (<>
  <div className="div bg-black text-white">
    <a href="pcmweightage.pdf" target='_blank' className='text-xl  text-green-400'>
      <div className="div flex justify-center items-center spacex-1">
        <div className="div"><GoDownload /></div>
      <div className="div">Download</div>
      </div>
    </a>
    <img src="pcmweightage-images-0.jpg" alt="None" />
    <img src="pcmweightage-images-1.jpg" alt="None" />
    <img src="pcmweightage-images-2.jpg" alt="None" />
  </div>
  </>
  )
}

export default Weightage
