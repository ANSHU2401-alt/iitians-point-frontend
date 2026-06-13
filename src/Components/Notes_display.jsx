import React from 'react'
import { Link } from 'react-router'
const Notes_display = (props) => {
  return (<>
    <div className="div h-[60px] w-[90px]">
    <div className="div justify-center items-center text-[14px]"><a href={props.source} target="_blank">{props.title}</a></div>
    </div>
  </>
  )
}

export default Notes_display
