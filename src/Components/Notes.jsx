import React from 'react'
import { useLocation } from 'react-router';
import Lenis from "lenis";
import { useEffect } from 'react';
const Notes = () => {
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
  const location = useLocation();
  const notes = location.state?.notes;
  return (<>
    <div className="div min-h-screen w-[100vw] text-white">
      <div className="div w-full">
{notes.map((elem, index) => {
  if (index % 2 === 0) {
    return (
      <div key={elem.id} className='w-[100%] h-[10vh] text-[14px] md:text-[20px] px-2 py-2.5 bg-zinc-950 hover:bg-zinc-800 flex justify-between items-center'>
        <div><a href={elem.source}>{index + 1}. {elem.title}</a></div>
        <div><a href={elem.source}>
          <img src="pdfimage.png" alt="None" className='w-8 h-8' />
        </a></div>
      </div>
    );
  } else {
    return (
      <div key={elem.id} className='w-[100%] h-[10vh] text-[14px] md:text-[20px] px-2 py-2.5 bg-zinc-950 hover:bg-zinc-900 flex justify-between items-center'>
        <div><a href={elem.source}>{index + 1}. {elem.title}</a></div>
        <div><a href={elem.source}>
          <img src="pdfimage.png" alt="None" className='w-8 h-8' />
        </a></div>
      </div>
    );
  }
})}

      </div>
    </div>
  </>
  )
}

export default Notes
