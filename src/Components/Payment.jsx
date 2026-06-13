import { useSearchParams, useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

function Payment() {
  const [params] = useSearchParams();
  const amount = params.get("amount");

  const navigate = useNavigate();

  const [qr, setQr] = useState("");

  const upiLink = `upi://pay?pa=8839204482-2@ybl&pn=IITianBros&am=${amount}&cu=INR`;

  useEffect(() => {
    QRCode.toDataURL(upiLink)
      .then((url) => setQr(url))
      .catch((err) => console.log(err));
  }, [upiLink]);

  const handleSuccess = () => {
    navigate("/thankyou");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-violet-500 p-6 rounded-xl text-center">

        <h1 className="text-xl font-bold">Pay ₹{amount}</h1>

        {qr && (
          <img
            src={qr}
            alt="QR Code"
            className="w-48 h-48 mx-auto mt-4 bg-white p-2"
          />
        )}

        <p className="text-black mt-3">Scan & Pay</p>
        <button
          onClick={handleSuccess}
          className="mt-4 bg-black text-violet-400 px-4 py-2 rounded"
        >
          I have paid
        </button>

      </div>
    </div>
  );
}

export default Payment;