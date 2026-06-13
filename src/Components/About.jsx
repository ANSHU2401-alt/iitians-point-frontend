import React, { useEffect, useState } from 'react'
import Comments from './Comments'
import Lenis from "lenis";

const About = () => {

  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    const images = document.images
    let loaded = 0

    if (images.length === 0) {
      setLoading(false)
      return
    }

    const done = () => {
      loaded++
      if (loaded === images.length) {
        setTimeout(() => setLoading(false), 300)
      }
    }

    for (let i = 0; i < images.length; i++) {
      if (images[i].complete) done()
      else {
        images[i].addEventListener("load", done)
        images[i].addEventListener("error", done)
      }
    }
  }, [])

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
        <div className="text-xl animate-pulse">
          Loading About Page...
        </div>
      </div>
    )
  }

  return (
    <div className='w-[100vw] bg-black min-h-[100vh] text-white relative px-2 overflow-x-hidden'>

      {/* SECTION 1 */}
      <div className="flex justify-center items-center space-x-5 py-3 px-2.5">

        <div className="w-[60%] md:w-[40%] px-2 min-h-1 flex items-center justify-center">
          <div>
            <h1 className='text-2xl font-bold py-2 mb-3 flex justify-center px-2 hover:bg-emerald-800 transition-all cursor-pointer rounded-md'>
              OUR MISSION
            </h1>
            Our mission at IITian Bros is to bridge the gap between aspiration and achievement by providing students with clear guidance, authentic resources, and peer-driven support. We aim to simplify complex academic and career paths by sharing real IIT experiences, structured learning materials, and practical insights to help students grow with confidence.
          </div>
        </div>

        <img
          src="https://plus.unsplash.com/premium_photo-1745299853438-ab59e19fa167"
          alt="None"
          className='cursor-pointer hover:scale-110 hover:rotate-3 transition-transform duration-300 rounded-full w-[140px] h-[140px] md:w-[225px] md:h-[225px]'
        />
      </div>

      {/* SECTION 2 */}
      <div className="mt-3.5 flex justify-center items-center space-x-5 py-3 px-2.5">

        <img
          src="https://plus.unsplash.com/premium_photo-1723874571151-052a8894a37d"
          alt="None"
          className='cursor-pointer hover:scale-110 hover:-rotate-3 transition-transform duration-300 rounded-full w-[140px] h-[140px] md:w-[225px] md:h-[225px]'
        />

        <div className="w-[60%] md:w-[40%] px-2 min-h-1 flex items-center justify-center">
          <div>
            <h1 className='text-2xl font-bold py-2 mb-3 flex justify-center px-2 hover:bg-emerald-800 transition-all cursor-pointer rounded-md'>
              OUR APPROACH
            </h1>
            Our Approach at IITian Bros is built around clarity, structure, and real-world relevance. We focus on breaking down complex academic and career decisions into simple, manageable steps that students can actually follow.
          </div>
        </div>
      </div>

      {/* SECTION 3 */}
      <div className="mt-3.5 flex justify-center items-center space-x-5 py-3 px-2.5">

        <div className="w-[60%] md:w-[40%] px-2 min-h-1 flex items-center justify-center">
          <div>
            <h1 className='text-2xl font-bold py-2 mb-3 flex justify-center px-2 hover:bg-emerald-800 transition-all cursor-pointer rounded-md'>
              OUR COMMITEMENT
            </h1>
            Our Commitment at IITian Bros is to consistently deliver honest, high-quality, and student-focused content that empowers learners at every stage of their journey.By staying connected with real student experiences and evolving educational needs, we strive to build a supportive learning environment where curiosity is encouraged, doubts are addressed, and growth becomes a shared goal.
          </div>
        </div>

        <img
          src="starbucks.jpeg"
          alt="None"
          className='cursor-pointer hover:scale-110 hover:rotate-2 transition-transform duration-300 rounded-full w-[140px] h-[140px] md:w-[225px] md:h-[225px]'
        />
      </div>

      {/* SECTION 4 */}
      <div className="mt-3.5 flex justify-center items-center space-x-5 py-3 px-2.5">

        <img
          src="https://plus.unsplash.com/premium_photo-1682308429561-930e3df7ca6a"
          alt="None"
          className='cursor-pointer hover:scale-110 hover:rotate-6 transition-transform duration-300 rounded-full w-[140px] h-[140px] md:w-[225px] md:h-[225px]'
        />

        <div className="w-[60%] md:w-[40%] px-2 min-h-1 flex items-center justify-center">
          <div>
            <h1 className='text-2xl font-bold py-2 mb-3 flex justify-center px-2 hover:bg-emerald-800 transition-all cursor-pointer rounded-md'>
              OUR PHILOSOPHY
            </h1>
            At IITian Bros, we believe that education should be driven by curiosity, not fear. Learning works best when students feel understood, supported, and motivated. Our philosophy is rooted in peer-to-peer growth, where shared experiences turn into shared success.
          </div>
        </div>
      </div>

      {/* IMAGE BANNER */}
      <div className="p-4 w-[100vw] flex justify-center items-center">
        <img
          src="cup.png"
          alt="None"
          className='w-[100%] md:w-[80%] rounded-xl hover:scale-[1.02] transition-transform duration-300'
        />
      </div>

      {/* COMMENTS */}
      <div className="forcomments">
        <h1 className='text-2xl font-bold py-2 mb-3 flex justify-center mt-8 underline cursor-pointer'>
          WHAT STUDENT'S SAY
        </h1>
        <Comments />
      </div>

    </div>
  )
}

export default About
