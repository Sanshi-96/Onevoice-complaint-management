import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import API from "../services/api";
import Logo from "../components/Logo";
import heroAuth from "../assets/images/Email Verification.jpg";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const inputRefs = useRef([]);

  const email =
    location.state?.email ||
    sessionStorage.getItem(
      "passwordResetEmail"
    ) ||
    "";

  const [otp, setOtp] = useState(
    Array(6).fill("")
  );

  const [seconds, setSeconds] = 
    useState(300);

  const [canResend, setCanResend] =
    useState(false);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState(
      location.state?.message ||
        "A verification code was sent to your email."
    );

  const [loading, setLoading] =
    useState(false);

  const [resending, setResending] =
    useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", {
        replace: true,
      });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (seconds <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setSeconds(
        (previousSeconds) =>
          previousSeconds - 1
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const formattedTime = `00:${String(
    seconds
  ).padStart(2, "0")}`;

  const handleOtpChange = (
    index,
    value
  ) => {
    const sanitizedValue = value
      .replace(/\D/g, "")
      .slice(-1);

    const updatedOtp = [...otp];

    updatedOtp[index] =
      sanitizedValue;

    setOtp(updatedOtp);
    setError("");

    if (
      sanitizedValue &&
      index < 5
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };

  const handleKeyDown = (
    index,
    event
  ) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[
        index - 1
      ]?.focus();
    }

    if (
      event.key === "ArrowLeft" &&
      index > 0
    ) {
      inputRefs.current[
        index - 1
      ]?.focus();
    }

    if (
      event.key === "ArrowRight" &&
      index < 5
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedValue =
      event.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);

    if (!pastedValue) {
      return;
    }

    const updatedOtp =
      Array(6).fill("");

    pastedValue
      .split("")
      .forEach((digit, index) => {
        updatedOtp[index] = digit;
      });

    setOtp(updatedOtp);

    const nextIndex = Math.min(
      pastedValue.length,
      5
    );

    inputRefs.current[
      nextIndex
    ]?.focus();
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError(
        "Please enter the complete 6-digit OTP."
      );

      return;
    }

    if (seconds <= 0) {
      setError(
        "This OTP has expired. Please request a new code."
      );

      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await API.post(
        "/auth/verify-password-reset-otp",
        {
          email,
          otp: enteredOtp,
        }
      );

      sessionStorage.setItem(
        "passwordResetEmail",
        email
      );

      sessionStorage.setItem(
        "passwordResetToken",
        response.data.resetToken
      );

      navigate("/reset-password", {
        replace: true,
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "OTP verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend || resending) {
      return;
    }

    setResending(true);
    setError("");
    setMessage("");

    try {
      const response = await API.post(
        "/auth/forgot-password-otp",
        {
          email,
        }
      );

      setOtp(Array(6).fill(""));
      setSeconds(60);
      setCanResend(false);

      setMessage(
        response.data.message
      );

      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to resend the OTP."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <main className="w-screen min-h-screen bg-[#1f1f1f] overflow-hidden">
      <section className="w-full min-h-screen bg-white grid grid-cols-1 lg:grid-cols-[38%_62%]">
        {/* LEFT SIDE */}
        <div className="relative bg-[#c4bfbf] p-8 hidden lg:flex flex-col overflow-hidden">
          <div className="scale-150 origin-left">
            <Logo />
          </div>

          <div className="mt-10">
            <h1 className="text-6xl font-black text-dark leading-tight">
              Verify Email
            </h1>

            <p className="mt-5 text-dark/70 max-w-[320px] leading-relaxed">
              Secure your OneVoice account by
              entering the OTP sent to your
              registered email address.
            </p>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] h-[45%] bg-[#d9d9d9] rounded-t-[28px] overflow-hidden shadow-2xl">
            <img
              src={heroAuth}
              alt="Verification"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex flex-col items-center justify-center px-6 md:px-16 py-12">
          <div className="lg:hidden mb-8">
            <Logo />
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-dark mb-5 text-center">
            Verify Email
          </h2>

          <p className="text-sm md:text-base text-dark/60 mb-4 text-center max-w-[440px] leading-relaxed">
            We sent a 6-digit OTP code to
          </p>

          <p className="text-primary font-black mb-10 text-center break-all">
            {email}
          </p>

          <div className="w-full max-w-[460px]">
            {message && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-bold text-center">
                {message}
              </div>
            )}

            {error && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-bold text-center">
                {error}
              </div>
            )}

            <label className="block text-sm text-dark/50 mb-5 font-medium">
              Enter verification code
            </label>

            <div
              className="flex justify-center gap-2 sm:gap-3 mb-3"
              onPaste={handlePaste}
            >
              {otp.map(
                (digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[
                        index
                      ] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={
                      index === 0
                        ? "one-time-code"
                        : "off"
                    }
                    maxLength={1}
                    value={digit}
                    onChange={(event) =>
                      handleOtpChange(
                        index,
                        event.target.value
                      )
                    }
                    onKeyDown={(event) =>
                      handleKeyDown(
                        index,
                        event
                      )
                    }
                    className="
                      w-12 h-14
                      sm:w-14 sm:h-14
                      border border-gray-300
                      rounded-xl
                      text-center
                      text-2xl
                      font-black
                      outline-none
                      transition
                      focus:border-primary
                      focus:ring-4
                      focus:ring-red-100
                    "
                  />
                )
              )}
            </div>

            <p
              className={`text-right text-xs mb-8 ${
                seconds <= 10
                  ? "text-primary font-bold"
                  : "text-dark/40"
              }`}
            >
              {seconds > 0
                ? `OTP expires in ${formattedTime}`
                : "OTP expired"}
            </p>

            <button
              type="button"
              onClick={handleVerify}
              disabled={
                loading ||
                otp.join("").length !== 6
              }
              className="
                w-full
                bg-primary
                text-white
                py-4
                rounded-xl
                font-bold
                text-lg
                hover:bg-red-800
                transition
                shadow-lg
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Verifying..."
                : "Verify & Continue →"}
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-dark/50">
                Didn&apos;t receive the
                code?
              </p>

              <button
                type="button"
                onClick={handleResend}
                disabled={
                  !canResend ||
                  resending
                }
                className="mt-2 text-primary font-bold hover:underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"
              >
                {resending
                  ? "Sending..."
                  : canResend
                    ? "Resend OTP"
                    : `Resend available in ${seconds}s`}
              </button>
            </div>
          </div>

          <Link
            to="/login"
            className="mt-10 text-sm text-primary font-bold hover:underline"
          >
            ← Back to Login
          </Link>
        </div>
      </section>
    </main>
  );
}