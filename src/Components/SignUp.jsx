import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { LuEyeClosed } from "react-icons/lu";
import Lenis from "lenis";
import { useEffect } from "react";
const SignUp = () => {
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
  const [passwordError, setPasswordError] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const p1 = useRef(null)
  const p2 = useRef(null)
  return (
    <div className="min-h-screen flex bg-black text-white overflow-hidden w-[100vw]">
      <div
        className="hidden md:flex w-[50%] m-5"
      ><img src="https://images.unsplash.com/photo-1585543253202-04d3d9f11961?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="None" className="rounded-2xl"/></div>

      <div className="flex flex-col justify-center items-center w-full md:w-[50%] w-full p-4">
        <div className="w-full max-w-md bg-zinc-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

          <form className="space-y-4" method="post" action="http://localhost:3000/create">
            <div className="flex flex-col gap-2">
              <input
                type="text" name="Name"
                placeholder="Name"
                className="flex-1 px-3 py-2 rounded-md bg-zinc-700 outline-none hover:bg-zinc-600"
                required
              />
              {/* <input
                type="text" name="LastName"
                placeholder="Last Name"
                className="flex-1 px-3 py-2 rounded-md bg-zinc-700 outline-none hover:bg-zinc-600"
              /> */}
            </div>

            <input
              type="email" name="Email"
              placeholder="Email"
              className="w-full px-3 py-2 rounded-md bg-zinc-700 outline-none hover:bg-zinc-600"
              required
            />

            <div className="flex">
  <input
    type={show ? "text" : "password"}
    name="Password"
    onChange={(e) => {
      const value = e.target.value;
      p1.current = value;

      const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

      if (value.length > 0 && value.length < 5) {
        setPasswordError("Weak password");
      }
      else if (value.length >= 5 && !specialChar.test(value)) {
        setPasswordError("Weak password");
      }
      else {
        setPasswordError("");
      }
    }}
    placeholder="Password"
    className="flex-1 px-3 py-2 rounded-l-md bg-zinc-700 outline-none hover:bg-zinc-600"
    required
  />

  <div
    className="px-3 py-2 bg-zinc-700 rounded-r-md flex items-center justify-center cursor-pointer"
    onClick={() => setShow(!show)}
  >
    <LuEyeClosed />
  </div>
</div>

{passwordError && (
  <p className="text-red-400 text-sm mt-1">
    {passwordError}
  </p>
)}

            <div className="flex">
              <input
                type={show1 ? "text" : "password"} name="ConfirmPassword" onChange={(e)=>{
                  p2.current=e.target.value;
                }}
                placeholder="Confirm Password"
                className="flex-1 px-3 py-2 rounded-l-md bg-zinc-700 outline-none hover:bg-zinc-600"
                required
              />
              <div className="px-3 py-2 bg-zinc-700 rounded-r-md flex items-center justify-center cursor-pointer" onClick={() => setShow1(!show1)}>
                <LuEyeClosed />
              </div>
            </div>

            <input
              type="date" name="DOB"
              placeholder="(dd-mm-yyyy)"
              className="w-full px-3 py-2 rounded-md bg-zinc-700 outline-none hover:bg-zinc-600"
              required
            />

            <button 
              type="submit"
              className="w-full py-2 bg-green-500 hover:bg-green-600 rounded-md font-semibold transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
