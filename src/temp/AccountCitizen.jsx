import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaSave,
  FaUserCircle,
  FaIdCard,
  FaCalendarAlt,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHome,
  FaEdit,
} from "react-icons/fa";

function AccountCitizen({ darkMode, panelClass, user }) {
  const BLUE = "#2563EB";
  const [activeSection, setActiveSection] = useState("citizenDetails");

  const [account, setAccount] = useState({
    fullName: user?.fullName || "Citizen User",
    email: user?.email || "citizen@onevoice.lk",
    role: user?.role || "citizen",
    joined: user?.joined || "Oct 2025",
    phone: user?.phone || "+94 77 123 4567",
    address: user?.address || "Citizen Address, Colombo",
    city: user?.city || "Colombo",
    district: user?.district || "Colombo",
    province: user?.province || "Western Province",
    nic: user?.nic || "Not Added",
  });

  const inputClass = darkMode
    ? "bg-[#2e2e2e] text-white border border-white/20 rounded-lg px-4 py-3 w-full outline-none focus:ring-2 focus:ring-blue-500 text-sm"
    : "bg-white text-dark border border-gray-300 rounded-lg px-4 py-3 w-full outline-none focus:ring-2 focus:ring-blue-500 text-sm";

  const viewBoxClass = darkMode
    ? "bg-white/5 border border-white/10"
    : "bg-gray-50 border border-gray-200";

  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify({ ...user, ...account }));
    alert("Citizen details saved successfully");
  };

  return (
    <div className={`${panelClass} rounded-[24px] p-5 shadow-card`}>
      <div className="bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#1E3A8A] rounded-2xl p-6 mb-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-28 h-28 rounded-full border-[6px] border-white bg-white flex items-center justify-center shadow-lg overflow-hidden">
              <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="200" fill="#EFF6FF" />
                <circle cx="100" cy="72" r="34" fill="#2563EB" opacity="0.18" />
                <circle cx="100" cy="68" r="26" fill="#141414" />
                <path d="M74 70c8 10 44 10 52 0v18c0 18-12 34-26 34S74 106 74 88V70z" fill="#F2B28D" />
                <path d="M72 64c6-28 50-32 58 0-12-10-44-10-58 0z" fill="#141414" />
                <path d="M55 170c6-32 26-48 45-48s39 16 45 48H55z" fill="#2563EB" />
                <path d="M76 170v-32l24 18 24-18v32H76z" fill="#FFFFFF" />
                <path d="M90 134h20l-10 22-10-22z" fill="#141414" />
                <circle cx="152" cy="52" r="22" fill="#2563EB" />
                <path d="M142 52l7 7 14-15" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>

            <div>
              <h2 className="text-3xl font-black text-white">
                {account.fullName}
              </h2>

              <p className="text-white/80 text-sm mt-2 flex items-center gap-2">
                <FaEnvelope />
                {account.email}
              </p>

              <span
                className="inline-flex items-center gap-2 mt-3 bg-white px-4 py-1.5 rounded-full text-xs font-black"
                style={{ color: BLUE }}
              >
                <FaUser />
                Citizen Account
              </span>
            </div>
          </div>

          <div className="md:border-l border-white/30 md:pl-8 text-white">
            <p className="text-xs uppercase text-white/60 font-black">Joined</p>
            <p className="text-xl font-black mt-1">{account.joined}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5">
        <div
          className={`rounded-2xl p-4 border h-fit ${
            darkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
          }`}
        >
          <button
            onClick={() => setActiveSection("citizenDetails")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-black mb-3 transition ${
              activeSection === "citizenDetails"
                ? darkMode
                  ? "bg-white/10 text-white"
                  : "bg-blue-50 text-blue-600"
                : darkMode
                ? "text-white/70 hover:bg-white/10"
                : "text-dark/70 hover:bg-gray-100"
            }`}
          >
            <FaUserCircle />
            Citizen Details
          </button>

          <button
            onClick={() => setActiveSection("personalDetails")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-black transition ${
              activeSection === "personalDetails"
                ? darkMode
                  ? "bg-white/10 text-white"
                  : "bg-blue-50 text-blue-600"
                : darkMode
                ? "text-white/70 hover:bg-white/10"
                : "text-dark/70 hover:bg-gray-100"
            }`}
          >
            <FaIdCard />
            Personal Details
          </button>

          <div
            className={`border-t mt-5 pt-5 text-sm ${
              darkMode ? "border-white/10" : "border-gray-200"
            }`}
          >
            <p className="font-black">Last Updated:</p>
            <p className="opacity-60 mt-1 flex items-center gap-2">
              <FaCalendarAlt />
              {new Date().toLocaleDateString()}{" "}
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <div
          className={`rounded-2xl border overflow-hidden ${
            darkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
          }`}
        >
          {activeSection === "citizenDetails" && (
            <>
              <div className={`px-5 py-4 border-b ${darkMode ? "border-white/10" : "border-gray-200"}`}>
                <h3 className="text-xl font-black text-blue-600">Update Profile</h3>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold opacity-60 mb-2">Full Name</label>
                    <input name="fullName" value={account.fullName} onChange={handleChange} className={inputClass} />
                  </div>

                  <div>
                    <label className="block text-xs font-bold opacity-60 mb-2">Email Address</label>
                    <input name="email" value={account.email} onChange={handleChange} className={inputClass} />
                  </div>

                  <div>
                    <label className="block text-xs font-bold opacity-60 mb-2">Citizen Role</label>
                    <input name="role" value={account.role} readOnly className={`${inputClass} opacity-60 cursor-not-allowed`} />
                  </div>

                  <div>
                    <label className="block text-xs font-bold opacity-60 mb-2">NIC Number</label>
                    <input name="nic" value={account.nic} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button onClick={handleSave} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black hover:bg-blue-800 transition flex items-center gap-3">
                    <FaSave />
                    Update Profile
                  </button>
                </div>
              </div>
            </>
          )}

          {activeSection === "personalDetails" && (
            <>
              <div className={`px-5 py-4 border-b flex items-center justify-between ${darkMode ? "border-white/10" : "border-gray-200"}`}>
                <h3 className="text-xl font-black text-blue-600">Personal Details</h3>

                <span className="text-xs font-bold opacity-60 flex items-center gap-2">
                  <FaEdit />
                  View and edit details
                </span>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className={`${viewBoxClass} rounded-xl p-4`}>
                    <p className="text-xs opacity-60 font-black mb-2">Contact</p>
                    <p className="font-black flex items-center gap-2">
                      <FaPhoneAlt className="text-blue-600" />
                      {account.phone}
                    </p>
                  </div>

                  <div className={`${viewBoxClass} rounded-xl p-4`}>
                    <p className="text-xs opacity-60 font-black mb-2">Location</p>
                    <p className="font-black flex items-center gap-2">
                      <FaMapMarkerAlt className="text-blue-600" />
                      {account.city}
                    </p>
                  </div>

                  <div className={`${viewBoxClass} rounded-xl p-4`}>
                    <p className="text-xs opacity-60 font-black mb-2">Address Type</p>
                    <p className="font-black flex items-center gap-2">
                      <FaHome className="text-blue-600" />
                      Home Address
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold opacity-60 mb-2">Phone Number</label>
                    <input name="phone" value={account.phone} onChange={handleChange} className={inputClass} />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold opacity-60 mb-2">Address</label>
                    <input name="address" value={account.address} onChange={handleChange} className={inputClass} />
                  </div>

                  <div>
                    <label className="block text-xs font-bold opacity-60 mb-2">City</label>
                    <input name="city" value={account.city} onChange={handleChange} className={inputClass} />
                  </div>

                  <div>
                    <label className="block text-xs font-bold opacity-60 mb-2">District</label>
                    <input name="district" value={account.district} onChange={handleChange} className={inputClass} />
                  </div>

                  <div>
                    <label className="block text-xs font-bold opacity-60 mb-2">Province</label>
                    <input name="province" value={account.province} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button onClick={handleSave} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black hover:bg-blue-800 transition flex items-center gap-3">
                    <FaSave />
                    Save Personal Details
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountCitizen;