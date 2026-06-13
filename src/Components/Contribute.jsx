import React from "react";
import { useNavigate } from "react-router-dom";

const Contribute = () => {
  const navigate = useNavigate();

  const amounts = [49, 99, 149, 199,299];

  const benefits = [
    "YouTube content",
    "New features",
    "Tutorials & guides",
    "Community support",
    "Educational projects",
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-violet-500 p-6 rounded-xl w-full max-w-sm text-center shadow-[0_0_25px_rgba(139,92,246,0.6)]">

        <h1 className="text-2xl font-bold text-black mb-3">
          Contribute Money
        </h1>

        <p className="text-black mb-3">
          Support our platform and initiatives:
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {benefits.map((item, index) => (
            <span key={index} className="bg-black text-violet-400 px-3 py-1 rounded-full text-sm">
              {item}
            </span>
          ))}
        </div>

        <p className="text-black mb-3">Choose an amount:</p>

        <div className="flex flex-wrap justify-center gap-2">
          {amounts.map((amt) => (
            <button
              key={amt}
              onClick={() => navigate(`/payment?amount=${amt}`)}
              className="bg-black text-violet-400 px-4 py-2 rounded-lg font-semibold hover:bg-gray-900 text-sm"
            >
              ₹{amt}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Contribute;