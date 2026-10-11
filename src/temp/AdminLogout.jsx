import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaLock, FaEnvelope } from "react-icons/fa";

function AdminLogout({ darkMode }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const inputClass = darkMode
    ? "w-full bg-[#2a2a2a] border border-white/10 text-white px-4 py-3 rounded-xl outline-none"
    : "w-full bg-gray-100 border border-gray-300 text-dark px-4 py-3 rounded-xl outline-none";

  const handleLogout = (e) => {
    e.preventDefault();

    // Later connect with backend
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully");

    navigate("/login");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div
        className={`w-full max-w-[520px] rounded-[24px] shadow-2xl overflow-hidden ${
          darkMode
            ? "bg-[#202020] text-white"
            : "bg-white text-dark"
        }`}
      >
        {/* Header */}
        <div className="bg-primary text-white px-8 py-7 text-center">
          <FaSignOutAlt className="text-5xl mx-auto mb-4" />

          <h2 className="text-3xl font-black">
            Confirm Logout
          </h2>

          <p className="text-white/80 mt-2 text-sm">
            Please verify your administrator credentials
            before ending this session.
          </p>
        </div>

        <form
          onSubmit={handleLogout}
          className="p-8 space-y-6"
        >
          <div>
            <label className="text-sm font-bold mb-2 block">
              Admin Email
            </label>

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-primary" />

              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className={`${inputClass} pl-11`}
                placeholder="admin@onevoice.lk"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold mb-2 block">
              Password
            </label>

            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-primary" />

              <input
                type="password"
                required
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className={`${inputClass} pl-11`}
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`flex-1 py-3 rounded-xl font-bold ${
                darkMode
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-3 rounded-xl font-bold bg-primary text-white hover:bg-red-800 transition"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogout;