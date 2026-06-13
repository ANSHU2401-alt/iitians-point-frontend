import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-violet-950 via-zinc-950 to-violet-900 text-white px-4 py-8">

      {/* GRID WRAPPER */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* ABOUT SECTION */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 font-bold text-sm md:text-base">
            <div>#LearnBetter</div>
            <img
              src="/logo.png"
              alt="logo"
              className="w-10 h-10 rounded-full"
            />
          </div>

          <p className="text-xs md:text-sm text-gray-300">
            IITian Bros provides well-structured and easy-to-understand learning resources for competitive exams.
          </p>

          <p className="text-sm">Made with ❤️</p>
        </div>

        {/* LINKS */}
        <div className="space-y-2 text-sm md:text-base">
          <div className="text-lg font-bold">Links</div>

          <div><Link to="/About">About Us</Link></div>
          <div><Link to="/Contact">Contact Us</Link></div>
          <div><Link to="/Feedback">Feedback</Link></div>
        </div>

        {/* COURSES */}
        <div className="space-y-2 text-sm md:text-base">
          <div className="text-lg font-bold">Courses</div>

          <div>Physics</div>
          <div>Chemistry</div>
          <div>Maths</div>
          <div>Others</div>
        </div>

        {/* SOCIAL */}
        <div className="space-y-2">
          <div className="text-lg font-bold">Social</div>

          <div className="flex flex-wrap gap-3">

            <a href="https://www.youtube.com/@IITianBros" target="_blank">
              <img src="https://m.youtube.com/static/favicon.ico"
                className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
            </a>

            <a href="https://www.instagram.com/6363am6363/" target="_blank">
              <img src="https://static.cdninstagram.com/rsrc.php/v4/yI/r/VsNE-OHk_8a.png"
                className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
            </a>

            <a href="#">
              <img src="/linkedin.png"
                className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
            </a>

            <a href="#">
              <img src="https://abs.twimg.com/responsive-web/client-web/icon-ios.77d25eba.png"
                className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
            </a>

            <a href="#">
              <img src="https://static.xx.fbcdn.net/rsrc.php/y1/r/ay1hV6OlegS.ico"
                className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
            </a>

            <a href="https://t.me/+Rs1ZraBgBepmNTQ9" target="_blank">
              <img src="/telegram.gif"
                className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
            </a>

          </div>
        </div>

      </div>

    </div>
  )
}

export default Footer
