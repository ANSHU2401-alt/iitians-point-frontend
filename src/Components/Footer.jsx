import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="bg-zinc-950 text-white grid md:grid-cols-4 gap-6 px-4 py-6">

      {/* LEARN BETTER SECTION */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 font-bold md:text-[16px] text-[10px]">
          <div>#LearnBetter</div>

          {/* FIXED LOGO PATH */}
          <img
            src="/logo.png"
            alt="logo"
            className="w-[40px] h-[40px] rounded-full"
          />
        </div>

        <div className="md:text-[16px] text-[10px] leading-relaxed">
          IITian Bros provides well-structured and easy-to-understand learning resources for competitive exams.
        </div>

        <div>Made with ❤️</div>
      </div>

      {/* LINKS */}
      <div className="space-y-2 md:text-[16px] text-[12px]">
        <div className="text-xl font-bold">Links</div>

        <div className="cursor-pointer"><Link to="/About">About Us</Link></div>
        <div className="cursor-pointer"><Link to="/Contact">Contact Us</Link></div>
        <div className="cursor-pointer"><Link to="/Feedback">Feedback</Link></div>
      </div>

      {/* COURSES */}
      <div className="space-y-2 md:text-[16px] text-[12px]">
        <div className="text-xl font-bold">Courses</div>

        <div>Physics</div>
        <div>Chemistry</div>
        <div>Maths</div>
        <div>Others</div>
      </div>

      {/* SOCIAL */}
      <div className="space-y-2 md:text-[16px] text-[12px]">
        <div className="text-xl font-bold">Social</div>

        <div className="flex flex-wrap gap-3">

          <a href="https://www.youtube.com/@IITianBros" target="_blank">
            <img src="https://m.youtube.com/static/favicon.ico"
              className="h-6 w-6 md:h-8 md:w-8 rounded-full" />
          </a>

          <a href="https://www.instagram.com/6363am6363/" target="_blank">
            <img src="https://static.cdninstagram.com/rsrc.php/v4/yI/r/VsNE-OHk_8a.png"
              className="h-6 w-6 md:h-8 md:w-8 rounded-full" />
          </a>

          {/* FIXED LINKEDIN */}
          <a href="#" target="_blank">
            <img src="/linkedin.png"
              className="h-6 w-6 md:h-8 md:w-8 rounded-full" />
          </a>

          {/* TWITTER */}
          <a href="#" target="_blank">
            <img src="https://abs.twimg.com/responsive-web/client-web/icon-ios.77d25eba.png"
              className="h-6 w-6 md:h-8 md:w-8 rounded-full" />
          </a>

          {/* FACEBOOK */}
          <a href="#" target="_blank">
            <img src="https://static.xx.fbcdn.net/rsrc.php/y1/r/ay1hV6OlegS.ico"
              className="h-6 w-6 md:h-8 md:w-8 rounded-full" />
          </a>

          {/* TELEGRAM */}
          <a href="https://t.me/+Rs1ZraBgBepmNTQ9" target="_blank">
            <img src="/telegram.gif"
              className="h-6 w-6 md:h-8 md:w-8 rounded-full" />
          </a>

        </div>
      </div>

    </div>
  )
}

export default Footer
