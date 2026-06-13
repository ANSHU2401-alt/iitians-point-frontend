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
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  const wholeRef = useRef(null);

  async function getMathsdataandNotes(str) {
    let getIt = await axios(str);
    setgetdata(getIt.data);
    return getIt.data;
  }

  // Preload images function
  const preloadImages = (data) => {
    const totalImages = data.filter(item => item.image).length;
    let loadedImages = 0;

    const imagePromises = data.map((item) => {
      return new Promise((resolve) => {
        if (!item.image) {
          resolve();
          return;
        }
        
        const img = new Image();
        img.src = item.image;
        img.onload = () => {
          loadedImages++;
          setLoadedCount(loadedImages);
          resolve();
        };
        img.onerror = () => {
          loadedImages++;
          setLoadedCount(loadedImages);
          resolve();
        };
      });
    });

    return Promise.all(imagePromises);
  };

  // Load all data and images
  useEffect(() => {
    const loadAllContent = async () => {
      try {
        // Fetch data
        const data = await getMathsdataandNotes("maths.json");
        
        // Preload all images
        await preloadImages(data);
        setImagesLoaded(true);
        
        // Small delay for smooth transition
        setTimeout(() => {
          setLoading(false);
        }, 300);
      } catch (error) {
        console.error("Error loading content:", error);
        setLoading(false);
      }
    };

    loadAllContent();
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
    const totalImages = getdata.filter(item => item.image).length;
    const progress = totalImages > 0 ? (loadedCount / totalImages) * 100 : 0;

    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-black text-white">
        <div className="text-2xl font-bold mb-4 animate-pulse">
          IITians Point
        </div>
        <div className="text-gray-400 mb-6">
          {imagesLoaded ? "Starting..." : `Loading images ${loadedCount}/${totalImages}`}
        </div>
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-red-600 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black" ref={wholeRef}>
      <Navbar />

      {/* LOGIN MODAL */}
      {authChecked && showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          <div className="bg-zinc-900 p-8 rounded-xl w-[90%] md:w-[450px]">
            <h1 className="text-3xl text-white text-center mb-6 font-bold">
              Login
            </h1>

            <input
              className="w-full p-3 mb-4 bg-black text-white border border-gray-600 rounded-lg focus:outline-none focus:border-red-600"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full p-3 mb-6 bg-black text-white border border-gray-600 rounded-lg focus:outline-none focus:border-red-600"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className="w-full bg-red-600 py-3 text-white rounded-lg font-semibold hover:bg-red-700 transition"
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
        <div className="bg-emerald-800 text-white px-6 py-4 flex justify-between items-center">
          <div className="text-lg">
            Welcome, {username} 👋 | 🔥 Streak: {streak}
          </div>
          <div className="text-lg font-semibold">Days left: {days}</div>
        </div>
      )}

      <div className="bg-zinc-900 text-white text-center py-3 text-lg italic">
        "Today’s struggle is tomorrow’s strength."
      </div>

      {/* CARDS - Original size preserved */}
      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {getdata.map((value, index) => (
          <div
            key={value.title}
            style={{ 
              animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`,
              opacity: 0
            }}
          >
            <Cards
              title={value.title}
              image={value.image}
              subtitle={value.subtitle}
            />
          </div>
        ))}
      </div>

      <Footer />

      <div className="text-center text-white bg-zinc-950 py-4">
        © IITian Bros
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default App;
