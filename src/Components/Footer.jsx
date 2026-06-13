import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (<>
    <div className="div text-white">
        <div className="div p-2 font-bold md:text-[16px] text-[10px]">
          <div className="div flex items-center gap-2 p-1"><div className="div">#LearnBetter</div><img src="logo.png" alt="None" className='w-[40px] h-[40px] rounded-full'/></div>
        </div>
        <div className="div p-2 md:text-[16px] text-[10px] ">IITian Bros provides well-structured and easy-to-understand learning resources for competitive exams.</div>
        <div className="div p-2">Made with ❤️</div>
    </div>
    <div className="div text-white md:text-[16px] text-[12px]">
        <div className="div text-xl p-2 font-bold md:text-[20px] text-[12px]">Links</div>
        <div className="div p-2 cursor-pointer"><Link to="/About">About Us</Link></div>
        <div className="div p-2 cursor-pointer"><Link to="/Contact">Contact Us</Link></div>
        <div className="div p-2 cursor-pointer"><Link to="/Feedback">Feedback</Link></div>
    </div>
    <div className="div md:text-[16px] text-[12px] text-white">
        <div className="div text-xl p-2 font-bold md:text-[20px] text-[12px]">Courses</div>
        <div className="div p-2 cursor-pointer">Physics</div>
        <div className="div p-2 cursor-pointer">Chemistry</div>
        <div className="div p-2 cursor-pointer">Maths</div>
        <div className="div p-2 cursor-pointer">Others</div>
    </div>
    <div className="div md:text-[16px] text-[12px] text-white">
  <div className="div text-xl p-2 font-bold md:text-[20px] text-[12px]">Social</div>
  
  <div className="flex flex-wrap">
    <div className="p-2 cursor-pointer">
      <a href="https://www.youtube.com/@IITianBros" target='blank'><img src="https://m.youtube.com/static/favicon.ico" alt="YouTube" className='h-[15px] w-[15px] md:w-[25px] md:h-[25px] rounded-full'/></a>
    </div>
    <div className="p-2 cursor-pointer">
      <a href="https://www.instagram.com/6363am6363/" target="blank"><img src="https://static.cdninstagram.com/rsrc.php/v4/yI/r/VsNE-OHk_8a.png" alt="Instagram" className='h-[15px] w-[15px] md:w-[25px] md:h-[25px] rounded-full'/></a>
    </div>
    <div className="p-2 cursor-pointer">
      <img src="/linkedin.png" alt="LinkedIn" className='h-[15px] w-[15px] md:w-[25px] md:h-[25px] rounded-full'/>
    </div>
    <div className="p-2 cursor-pointer">
      <img src="https://abs.twimg.com/responsive-web/client-web/icon-ios.77d25eba.png" alt="Twitter" className='h-[15px] w-[15px] md:w-[25px] md:h-[25px] rounded-full'/>
    </div>
    <div className="p-2 cursor-pointer">
      <img src="https://static.xx.fbcdn.net/rsrc.php/y1/r/ay1hV6OlegS.ico" alt="Facebook" className='h-[15px] w-[15px] md:w-[25px] md:h-[25px] rounded-full'/>
    </div>
    <div className="p-2 cursor-pointer">
      <a href="https://t.me/+Rs1ZraBgBepmNTQ9" target='blank'>
      <img src="/telegram.gif" alt="Telegram" className='h-[15px] w-[15px] md:w-[25px] md:h-[25px] rounded-full'/></a>
    </div>
  </div>
</div>
  </>
  )
}

export default Footer
