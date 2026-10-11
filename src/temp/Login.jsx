import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import Button from "../components/Button";
import logo from "../assets/logo/main logo.png";
import loginSideImage from "../assets/images/login-side.png";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const loginData = {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      };

      const res = await API.post("/auth/login", loginData);

      const { user, token } = res.data;

      if (!user) {
        throw new Error("User information was not returned.");
      }

      localStorage.setItem("user", JSON.stringify(user));

      if (token) {
        localStorage.setItem("token", token);
      }

      localStorage.setItem("userRole", user.role);

      if (user.role === "admin") {
        navigate("/admin", {
          replace: true,
        });

        return;
      }

      if (user.role === "authority") {

  if (res.data.mustChangePassword) {
    navigate("/change-password", {
      replace: true,
    });

    return;
  }

  navigate("/authority", {
    replace: true,
  });

  return;
}

      if (user.role === "citizen") {
        navigate("/citizen", {
          replace: true,
        });

        return;
      }

      localStorage.clear();

      throw new Error(
        "Your account does not have a valid system role."
      );
    } catch (err) {
      console.error("Login error:", err);

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");

      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-softBg flex items-center justify-center p-4 font-lato">
      <div className="w-full max-w-6xl bg-white rounded-[34px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="p-8 md:p-14 flex flex-col justify-center">
          <Link
            to="/home"
            className="inline-flex items-center mb-8"
          >
            <img
              src={logo}
              alt="OneVoice Logo"
              className="w-[130px] object-contain"
            />
          </Link>

          <p className="inline-block w-fit text-primary text-sm font-black border border-dashed border-primary/40 rounded-full px-5 py-2 bg-red-50 mb-5">
            Welcome Back
          </p>

          <h1 className="text-4xl md:text-5xl font-black text-dark leading-tight">
            Login to your
            <span className="text-primary block">
              OneVoice account.
            </span>
          </h1>

          <p className="mt-4 text-dark/60 leading-7 max-w-md">
            Access your complaint dashboard, track updates,
            and stay connected with the responsible
            authorities.
          </p>

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="block text-sm font-bold text-dark mb-2">
                Email Address
              </label>

              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                className="w-full px-4 py-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-2">
                Password
              </label>

              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                className="w-full px-4 py-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-4 text-right">
            <div className="mt-4 text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-primary font-bold hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-dark/60">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-primary font-black hover:underline"
            >
              Create Account
            </button>
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:block relative bg-gradient-to-br from-dark via-[#3a1111] to-primary min-h-[720px] overflow-hidden">
          <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-white/10 rounded-full" />

          <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 bg-primary/40 rounded-full blur-2xl" />

          <img
            src={loginSideImage}
            alt="OneVoice Login"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-12 left-10 right-10 text-white">
            <h2 className="text-4xl font-black leading-tight">
              Raise issues.
              <span className="block text-red-100">
                Track real action.
              </span>
            </h2>

            <p className="mt-4 text-white/70 leading-7">
              A secure digital gateway for citizens,
              authorities, and public service improvement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;