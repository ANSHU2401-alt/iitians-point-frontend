import React from "react";

function ThankYou() {
  const quotes = [
    "Success is the sum of small efforts, repeated daily.",
    "Thank you for supporting us 🙏",
    "Every contribution builds something bigger 🚀",
    "You are helping us grow stronger 💜",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-violet-500 p-6 rounded-xl text-center max-w-md">

        <h1 className="text-3xl font-bold mb-4">🎉 Thank You!</h1>

        <p className="text-black mb-4">
          Payment Successful
        </p>

        <div className="space-y-2">
          {quotes.map((q, i) => (
            <p key={i} className="text-black text-sm bg-white/20 p-2 rounded">
              {q}
            </p>
          ))}
        </div>

      </div>
    </div>
  );
}

export default ThankYou;