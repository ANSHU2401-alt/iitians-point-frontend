import React, { useCallback, useEffect, useRef, useState } from 'react'
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
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.15,
    })

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

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

      console.log("CHECKLOGIN RESPONSE:", res.data);

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
      console.error("syncAuth error:", error);
      setAuthChecked(true);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    syncAuth();
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        Name: name,
        Password: password
      }, {
        withCredentials: true
      });

      console.log("Login response:", res.data);

      if (res.data.success === true) {
        setUsername(res.data.username);
        setIsLoggedIn(true);
        setAuthChecked(true);
        setShowModal(false);

        console.log("Login successful! Username:", res.data.username);
        await syncAuth();
      } else {
        alert("Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed");
    }
    if (res.data.success === true) {
      setUsername(res.data.username);
      setStreak(res.data.streak);
      setIsLoggedIn(true);
      setAuthChecked(true);
      setShowModal(false);

      await syncAuth();
    }
  };

  return (<>

    <div className="div w-full bg-black" ref={wholeRef}>
      <Navbar />

      <div className="main text-white w-full bi relative bg-black">

        {/* FIXED: This shows the username */}
        {/* {authChecked && isLoggedIn && (
          <div className="text-white font-semibold bg-emerald-800 px-4 py-3 text-sm z-100">
            Welcome, {username} 👋
          </div>
        )} */}

        {authChecked && showModal === true && (
          <div className="fixed opacity-95 top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black">

            <div className="w-[90%] md:w-[450px] bg-zinc-900 rounded-xl p-6 text-white border border-zinc-700">

              <h1 className="text-3xl font-bold text-center">
                Welcome to IITian Bros
              </h1>

              <p className="text-center mt-3 text-zinc-400">
                Login to track progress, bookmarks and streaks.
              </p>

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
                  className="bg-red-600 text-center py-3 rounded-lg font-semibold"
                >
                  Login
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className="border border-zinc-600 py-3 rounded-lg"
                >
                  Continue Without Login
                </button>

              </div>

            </div>

          </div>
        )}
        <Searchbar className="bl" toshow={getdata} search={searchref} setsearch={setsearchref} />
        {authChecked && isLoggedIn && (
          <div className="text-white font-semibold bg-emerald-800 px-4 py-3 text-sm z-100 flex justify-between">
            <div className="div flex "><div className="div">Welcome, {username}👋&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div className="font-bold">
                🔥 Streak: {streak}
              </div>
            </div>
            <div className="div font-bold">Days left for JEE MAIN JANUARY: {days}</div>
          </div>
        )}
        <div className="mt-2 div text-xl pl-3 font-bold z-40 w-full flex justify-center items-center bg-zinc-900 py-3">
          Today’s struggle is tomorrow’s strength.
        </div>

        {/* <div className="div text-xl pl-3 font-semibold z-40 w-full flex justify-center items-center bg-zinc-900 py-1 pb-3.5">
          Days left for JEE MAIN JANUARY: {days}
        </div> */}

        <div className="mt-5 underline div text-2xl pl-3 font-semibold pb-1 z-40 ">
          Tutorials
        </div>

        <div className="div maths">
          <div className="div flex flex-wrap gap-3.5 md:gap-4 w-full md:pt-4 justify-center opacity-90 md:pb-3 pt-4 px-2 mt-2 mb-2">

            {getdata.map(value => {

              if (searchref && value.title.toLowerCase().startsWith(searchref.toLowerCase())) {
                return (<Cards
                  key={value.title}
                  title={value.title}
                  image={value.image}
                  subtitle={value.subtitle}
                />)
              }
              else if (searchref) {
                return null;
              }
              else {
                return (<Cards
                  key={value.title}
                  title={value.title}
                  image={value.image}
                  subtitle={value.subtitle}
                />)
              }

            })}

          </div>
        </div>

        <div className="footer bg-gradient-to-r from-zinc-900 via-slate-950 to-violet-950 w-full grid grid-cols-[36%_20%_22%_20%]">
          <Footer />
        </div>

        <div className=" div text-white px-2 py-3 bg-zinc-950">
          &copy; IITian - Bros
        </div>

      </div>
    </div>

  </>)
}

export default App