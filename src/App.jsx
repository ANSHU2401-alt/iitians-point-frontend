import React, { useEffect, useRef, useState } from 'react'
import Lenis from "lenis";
import Navbar from './Components/Navbar'
import Searchbar from './Components/Searchbar';
import Cards from './Components/Cards';
import axios from 'axios'
import Footer from './Components/Footer';
import { differenceInDays } from "date-fns";

axios.defaults.withCredentials = true;

const App = () => {

  const startDate = new Date(Date.now());
  const endDate = new Date("2027-01-21");
  const days = differenceInDays(endDate, startDate);

  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchref, setsearchref] = useState(null)
  const wholeRef = useRef(null);
  const [getdata, setgetdata] = useState([]);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [streak, setStreak] = useState(0);

  // =========================
  // CHANGED: LOADING STATE
  // =========================
  const [loading, setLoading] = useState(true);

  // =========================
  // CHANGED: STABLE LENIS
  // =========================
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.08,
    });

    let rafId;

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  async function getMathsdataandNotes(str) {
    let getIt = await axios(str);
    setgetdata(getIt.data);
  }

  useEffect(() => {
    getMathsdataandNotes('maths.json')
  }, [])

  const syncAuth = async () => {
    try {
      const res = await axios.get("http://localhost:3000/checklogin", {
        withCredentials: true
      });

      setAuthChecked(true);

      if (res.data.loggedIn === true) {
        setIsLoggedIn(true);
        setUsername(res.data.username);
        setStreak(res.data.streak || 0);
      } else {
        setIsLoggedIn(false);
        setUsername("");
      }
    } catch (error) {
      setAuthChecked(true);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    syncAuth();
  }, []);

  // =========================
  // CHANGED: GLOBAL LOADING FIX
  // =========================
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // =========================
  // CHANGED: SCROLL LOCK DURING LOADING
  // =========================
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto";
  }, [loading]);

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        Name: name,
        Password: password
      }, {
        withCredentials: true
      });

      if (res.data.success === true) {
        setUsername(res.data.username);
        setIsLoggedIn(true);
        setAuthChecked(true);
        setShowModal(false);
        await syncAuth();
      } else {
        alert("Invalid username or password");
      }

    } catch (err) {
      alert("Login failed");
    }
  };

  // =========================
  // CHANGED: LOADING SCREEN
  // =========================
  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-black text-white">
        <div className="text-xl animate-pulse">
          Loading IITians Point...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black" ref={wholeRef}>
      <Navbar />

      <div className="text-white w-full relative bg-black">

        {authChecked && showModal && (
          <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black">

            <div className="w-[90%] md:w-[450px] bg-zinc-900 rounded-xl p-6 text-white border border-zinc-700">

              <h1 className="text-3xl font-bold text-center">
                Welcome to IITian Bros
              </h1>

              <div className="mt-6 flex flex-col gap-3">

                <input
                  placeholder="Name"
                  className="p-2 bg-black border border-zinc-700"
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  placeholder="Password"
                  type="password"
                  className="p-2 bg-black border border-zinc-700"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  onClick={handleLogin}
                  className="bg-red-600 py-3 rounded-lg font-semibold"
                >
                  Login
                </button>

              </div>

            </div>
          </div>
        )}

        <Searchbar toshow={getdata} search={searchref} setsearch={setsearchref} />

        {authChecked && isLoggedIn && (
          <div className="text-white font-semibold bg-emerald-800 px-4 py-3 flex justify-between">
            <div>
              Welcome, {username} 👋 | 🔥 Streak: {streak}
            </div>
            <div>
              Days left: {days}
            </div>
          </div>
        )}

        <div className="text-center bg-zinc-900 py-3">
          Today’s struggle is tomorrow’s strength.
        </div>

        <div className="flex flex-wrap gap-3 justify-center mt-4 px-2">

          {getdata.map(value => (
            <Cards
              key={value.title}
              title={value.title}
              image={value.image}
              subtitle={value.subtitle}
            />
          ))}

        </div>

        <Footer />

        <div className="text-white px-2 py-3 bg-zinc-950 text-center">
          &copy; IITian - Bros
        </div>

      </div>
    </div>
  )
}

export default App
