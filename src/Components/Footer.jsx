import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 text-white px-4 py-8 mt-5">

      <div className="flex flex-wrap justify-between gap-6">

        {/* ABOUT */}
        <div className="min-w-[140px] flex-1">
          <div className="flex items-center gap-2 font-bold text-sm md:text-base">
            <div>#LearnBetter</div>
            <img
              src="/logo.png"
              alt="logo"
              className="w-10 h-10 rounded-full"
            />
          </div>

          <p className="text-xs md:text-sm mt-2 text-white/90">
            IITian Bros provides well-structured and easy-to-understand learning resources for competitive exams.
          </p>

          <p className="mt-2 text-sm">Made with ❤️</p>
        </div>

        {/* LINKS */}
        <div className="min-w-[120px] flex-1 text-sm md:text-base">
          <div className="font-bold mb-2">Links</div>

          <div className="space-y-1">
            <div><Link to="/About">About Us</Link></div>
            <div><Link to="/Contact">Contact Us</Link></div>
            <div><Link to="/Feedback">Feedback</Link></div>
          </div>
        </div>

        {/* COURSES */}
        <div className="min-w-[120px] flex-1 text-sm md:text-base">
          <div className="font-bold mb-2">Courses</div>

          <div className="space-y-1">
            <div>Physics</div>
            <div>Chemistry</div>
            <div>Maths</div>
            <div>Others</div>
          </div>
        </div>

        {/* SOCIAL */}
        <div className="min-w-[140px] flex-1">
          <div className="font-bold mb-2 text-sm md:text-base">Social</div>

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
