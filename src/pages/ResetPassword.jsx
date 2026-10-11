import { useEffect, useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../services/api";
import Logo from "../components/Logo";
import heroAuth from "../assets/images/Email Verification.jpg";

export default function ResetPassword() {
  const navigate = useNavigate();

  const email =
    sessionStorage.getItem(
      "passwordResetEmail"
    );

  const resetToken =
    sessionStorage.getItem(
      "passwordResetToken"
    );

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!email || !resetToken) {
      navigate("/forgot-password", {
        replace: true,
      });
    }
  }, [
    email,
    resetToken,
    navigate,
  ]);

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );

      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await API.patch(
        "/auth/reset-password-otp",
        {
          email,
          resetToken,
          password: form.password,
          confirmPassword:
            form.confirmPassword,
        }
      );

      setSuccess(
        response.data.message
      );

      sessionStorage.removeItem(
        "passwordResetEmail"
      );

      sessionStorage.removeItem(
        "passwordResetToken"
      );

      setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 1800);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to reset your password."
      );
    } finally {
      setLoading(false);
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
              New Password
            </h1>

            <p className="mt-5 text-dark/70 max-w-[320px] leading-relaxed">
              Create a new secure password for
              your OneVoice account.
            </p>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] h-[45%] bg-[#d9d9d9] rounded-t-[28px] overflow-hidden shadow-2xl">
            <img
              src={heroAuth}
              alt="Reset password"
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
            Reset Password
          </h2>

          <p className="text-sm md:text-base text-dark/60 mb-10 text-center max-w-[440px] leading-relaxed">
            Enter and confirm your new password.
          </p>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[420px] space-y-5"
          >
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-bold">
                {error}
              </div>
            )}

            {success && (
              <div className="px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-bold">
                {success} Redirecting to
                login...
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-dark mb-2">
                New Password
              </label>

              <input
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={form.password}
                onChange={handleChange}
                placeholder="Enter new password"
                autoComplete="new-password"
                required
                minLength={6}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl outline-none focus:border-primary focus:ring-4 focus:ring-red-100"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-2">
                Confirm Password
              </label>

              <input
                name="confirmPassword"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={
                  form.confirmPassword
                }
                onChange={handleChange}
                placeholder="Confirm new password"
                autoComplete="new-password"
                required
                minLength={6}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl outline-none focus:border-primary focus:ring-4 focus:ring-red-100"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-dark/60 cursor-pointer">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(event) =>
                  setShowPassword(
                    event.target.checked
                  )
                }
              />

              Show passwords
            </label>

            <button
              type="submit"
              disabled={
                loading || Boolean(success)
              }
              className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-red-800 transition shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "Updating Password..."
                : "Reset Password →"}
            </button>
          </form>

          <Link
            to="/login"
            className="mt-8 text-sm text-primary font-bold hover:underline"
          >
            ← Back to Login
          </Link>
        </div>
      </section>
    </main>
  );
}