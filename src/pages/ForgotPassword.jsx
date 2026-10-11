import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";


const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email.trim()) {
    alert("Please enter your email.");
    return;
  }

  try {
    setLoading(true);

    const res = await API.post("/auth/forgot-password-otp", {
      email,
    });

    console.log(res.data);

    navigate("/verify-email", {
      state: {
        email,
        isPasswordReset: true,
      },
    });

  } catch (err) {
    console.error(err);
    alert(
      err.response?.data?.message || "Failed to send OTP."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">

        <h2 className="text-3xl font-bold text-center text-red-600 mb-2">
          Forgot Password
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Enter your registered email to receive a verification code.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="mb-5">

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              className="w-full border rounded-lg p-3"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <button
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
          >
            {loading
              ? "Sending..."
              : "Send OTP"}
          </button>

        </form>

        <div className="text-center mt-6">

          <Link
            to="/login"
            className="text-red-600 font-medium"
          >
            Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;