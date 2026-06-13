import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="text-white grid md:grid-cols-4 gap-4 p-4">

      {/* ABOUT */}
      <div>
        <div className="flex items-center gap-2 font-bold">
          #LearnBetter
          <img src="/logo.png" alt="logo" className="w-10 h-10 rounded-full" />
        </div>

        <p className="text-sm mt-2">
          IITian Bros provides well-structured and easy-to-understand learning resources for competitive exams.
        </p>

        <p className="mt-2">Made with ❤️</p>
      </div>

      {/* LINKS */}
      <div>
        <h2 className="font-bold text-lg">Links</h2>
        <div className="flex flex-col gap-1 mt-2">
          <Link to="/About">About Us</Link>
          <Link to="/Contact">Contact Us</Link>
          <Link to="/Feedback">Feedback</Link>
        </div>
      </div>

      {/* COURSES */}
      <div>
        <h2 className="font-bold text-lg">Courses</h2>
        <div className="flex flex-col gap-1 mt-2">
          <p>Physics</p>
          <p>Chemistry</p>
          <p>Maths</p>
          <p>Others</p>
        </div>
      </div>

      {/* SOCIAL */}
      <div>
        <h2 className="font-bold text-lg">Social</h2>

        <div className="flex flex-wrap gap-2 mt-2">

          <a href="https://www.youtube.com/@IITianBros" target="_blank">
            <img src="https://m.youtube.com/static/favicon.ico" className="w-6 h-6" />
          </a>

          <a href="https://www.instagram.com/6363am6363/" target="_blank">
            <img src="https://static.cdninstagram.com/rsrc.php/v4/yI/r/VsNE-OHk_8a.png" className="w-6 h-6" />
          </a>

          <a href="https://t.me/+Rs1ZraBgBepmNTQ9" target="_blank">
            <img src="/telegram.gif" className="w-6 h-6" />
          </a>

        </div>
      </div>

    </div>
  )
}

export default Footer
