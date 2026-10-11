import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import Button from "../components/Button";
import logo from "../assets/logo/main logo.png";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "citizen",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);

      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-softBg flex items-center justify-center p-4 font-lato">
      <div className="w-full max-w-7xl bg-white rounded-[34px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        
        <div className="hidden lg:block relative bg-gradient-to-br from-dark via-[#3a1111] to-primary min-h-[850px] overflow-hidden">
          
          <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-white/10 rounded-full"></div>

          <div className="absolute bottom-[-100px] left-[-100px] w-80 h-80 bg-primary/40 rounded-full blur-2xl"></div>

          <img
            src="/src/assets/images/register-side.png"
            alt="Register"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          <div className="absolute bottom-12 left-10 right-10 text-white">
            <h2 className="text-4xl font-black leading-tight">
              Join OneVoice
              <span className="block text-red-100">
                and make change happen.
              </span>
            </h2>

            <p className="mt-4 text-white/70 leading-7">
              Create your account to submit complaints, track updates, and stay
              connected with authorities.
            </p>
          </div>
        </div>

        <div className="p-8 md:p-14 flex flex-col justify-center">
          
          <Link to="/home" className="inline-flex items-center mb-8">
            <img
              src={logo}
              alt="OneVoice Logo"
              className="w-[130px] object-contain"
            />
          </Link>

          <p className="inline-block w-fit text-primary text-sm font-black border border-dashed border-primary/40 rounded-full px-5 py-2 bg-red-50 mb-5">
            Create Account
          </p>

          <h1 className="text-4xl md:text-5xl font-black text-dark leading-tight">
            Register for
            <span className="text-primary block">OneVoice.</span>
          </h1>

          <p className="mt-4 text-dark/60 leading-7 max-w-md">
            Start using the smart complaint management system and stay connected
            with public service updates.
          </p>

          <form onSubmit={handleRegister} className="mt-8 space-y-5">
            
            <div>
              <label className="block text-sm font-bold text-dark mb-2">
                Full Name
              </label>

              <input
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>

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
                className="w-full px-4 py-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-2">
                Phone Number
              </label>

              <input
                name="phone"
                type="text"
                placeholder="Enter phone number"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-2">
                Select Role
              </label>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
              >
                <option value="citizen">Citizen</option>
                <option value="authority">Authority</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-2">
                Password
              </label>

              <input
                name="password"
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-dark/60">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary font-black hover:underline"
            >
              Login
            </button>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Register;