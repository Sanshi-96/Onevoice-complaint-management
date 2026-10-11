import { Link } from "react-router-dom";
import logo from "../assets/logo/main logo.png";


export default function RegisterSuccess() {
  return (
    <main className="w-screen h-screen bg-[#1f1f1f] overflow-hidden">
      <section className="w-full h-full bg-white flex items-center justify-center px-6">
        <div className="w-full max-w-[520px] text-center flex flex-col items-center">

          <div className="mb-7">
                <img
                    src={logo}
                    alt="OneVoice Logo"
                    className="w-24 h-24 object-contain"
                />
                </div>

          <h1 className="text-5xl md:text-6xl font-black text-dark mb-4">
            Registration Successful
          </h1>

          <p className="text-dark/60 text-base md:text-lg max-w-[420px] leading-relaxed mb-8">
            Your email has been verified successfully. You can now continue to
            your OneVoice account.
          </p>

          <div className="mb-10">
                <div className="w-[220px] h-[220px] rounded-full border-[10px] border-green-500 flex items-center justify-center shadow-2xl">
                    
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-28 h-28 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                    />
                    </svg>

                </div>
                </div>

          <Link
            to="/login"
            className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-red-800 transition shadow-lg"
          >
            Continue to Login →
          </Link>
        </div>
      </section>
    </main>
  );
}