import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Components/Navbar";
import Searchbar from "./Components/Searchbar";
import Cards from "./Components/Cards";
import axios from "axios";
import Footer from "./Components/Footer";
import { differenceInDays } from "date-fns";

axios.defaults.withCredentials = true;

const App = () => {
  const startDate = new Date();
  const endDate = new Date("2027-01-21");
  const days = differenceInDays(endDate, startDate);

  const [username, setUsername] = useState("");
  const [streak, setStreak] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchref, setsearchref] = useState(null);
  const [getdata, setgetdata] = useState([]);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);

  const wholeRef = useRef(null);

  async function getMathsdataandNotes(str) {
    let getIt = await axios(str);
    setgetdata(getIt.data);
  }

  useEffect(() => {
    getMathsdataandNotes("maths.json");
  }, []);

  const syncAuth = async () => {
    try {
      const res = await axios.get(
        "https://backend-api-p3b2.onrender.com/checklogin",
        { withCredentials: true }
      );

      setAuthChecked(true);

      if (res.data.loggedIn) {
        setIsLoggedIn(true);
        setUsername(res.data.username);
        setStreak(res.data.streak || 0);
      } else {
        setIsLoggedIn(false);
        setUsername("");
        setStreak(0);
      }
    } catch (err) {
      setAuthChecked(true);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    syncAuth();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto";
  }, [loading]);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://backend-api-p3b2.onrender.com/login",
        {
          Name: name,
          Password: password,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        setShowModal(false);
        await syncAuth();
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-black text-white">
        <div className="animate-pulse text-xl">
          Loading IITians Point...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black" ref={wholeRef}>
      <Navbar />

      {/* LOGIN MODAL */}
      {authChecked && showModal && (
        <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
          <div className="bg-zinc-900 p-6 rounded-xl w-[90%] md:w-[400px]">
            <h1 className="text-2xl text-white text-center mb-4">
              Login
            </h1>

            <input
              className="w-full p-2 mb-3 bg-black text-white border border-gray-600"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full p-2 mb-3 bg-black text-white border border-gray-600"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className="w-full bg-red-600 py-2 text-white rounded"
            >
              Login
            </button>
          </div>
        </div>
      )}

      <Searchbar
        toshow={getdata}
        search={searchref}
        setsearch={setsearchref}
      />

      {/* USER INFO BAR */}
      {authChecked && isLoggedIn && (
        <div className="bg-emerald-800 text-white px-4 py-3 flex justify-between">
          <div>
            Welcome, {username} 👋 | 🔥 Streak: {streak}
          </div>
          <div>Days left: {days}</div>
        </div>
      )}

      <div className="bg-zinc-900 text-white text-center py-2">
        Today’s struggle is tomorrow’s strength.
      </div>

      {/* CARDS */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {getdata.map((value) => (
          <Cards
            key={value.title}
            title={value.title}
            image={value.image}
            subtitle={value.subtitle}
          />
        ))}
      </div>

      <Footer />

      <div className="text-center text-white bg-zinc-950 py-3">
        © IITian Bros
      </div>
    </div>
  );
};

export default App;
