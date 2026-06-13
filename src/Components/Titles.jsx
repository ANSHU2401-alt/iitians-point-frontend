import React, { useRef, useState } from 'react'
import { useLocation } from "react-router-dom";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { IoIosPlayCircle } from "react-icons/io";
const Titles = (props) => {
  const { state } = useLocation();
  const { title, subtitle } = state || {};
  const i = useRef(0)
  const [frame, setframe] = useState(null);
  return (<>
    <div className="div bg-zinc-950 min-h-screen text-white w-[100vw] relative">
        <div className="div w-full h-[90%] bg-zinc-950">
            {frame &&<div className="div w-full flex justify-end py-2 px-1.5 items-center cursor-pointer text-xl h-[30px]" onClick={()=>{
                setframe(null)
            }}><RxCross1 /></div>}
            {frame && <iframe src={frame} frameborder="0" className='absolute w-full h-full'></iframe>}
        </div>
        <div className="div text-xl mb-2 font-bold px-2 py-2">Title: {title}</div>
        <div className="div pt-3">
            {
            subtitle.map(element => {
                if(i.current%2==0){
                    i.current+=1;
                return (<>
                <div className="div flex justify-between items-center space-y-2 bg-zinc-800 hover:bg-zinc-950 py-2 px-3 cursor-pointer text-[15px] md:text-[18px]">
                    <div className="div">{element.TITLE}</div>
                    <div className="div" onClick={()=>{
                        setframe(element.video);
                    }}><IoIosPlayCircle className='h-[25px] w-[25px] md:h-[30px] md:w-[30px] hover:scale-104'/></div>
                </div>
                </>)
                }
                else{
                    i.current+=1;
                return (<>
                <div className="div flex justify-between items-center space-y-2 bg-zinc-900 hover:bg-zinc-950 py-2 px-3 cursor-pointer text-[15px] md:text-[18px]">
                    <div className="div">{element.TITLE}</div>
                    <div className="div" onClick={()=>{
                        setframe(element.video);
                    }}><IoIosPlayCircle className='h-[25px] w-[25px] md:h-[30px] md:w-[30px] hover:scale-104'/></div>
                </div>
                </>)
                }
                
            })
        }
        </div>
    </div>
  </>
  )
}

export default Titles
