import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Titles from './Titles'
const Cards = (props) => {
    const [videoforiframe, setvideoforiframe] = useState(null)
  return (<>
   <div className="relative p-3 w-[30%] h-[18vh] md:h-[45vh] md:w-[18%]
bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900
text-white rounded-md
hover:scale-105
hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]
transition-all duration-300">
      <Link to="/titles" state={{ title: props.title, subtitle: props.subtitle }}><div className="h-[23%] div text-[11px] md:text-[16px] flex justify-center items-start cursor-pointer font-semibold" onClick={()=>{
      }}>{props.title}</div></Link>
      <Link to="/titles" state={{ title: props.title, subtitle: props.subtitle }}><div className='w-[100%] h-[75%] flex justify-center items-center'>
        <img src={props.image} alt="None" className=' h-[93%] md:h-[95%] cursor-pointer w-[95%] rounded-md mt-1' onClick={()=>{
      }}/></div></Link></div>
  </>
  )
}
export default Cards