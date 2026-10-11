import { useState } from "react";
import {
  FaUserShield,
  FaEnvelope,
  FaSave,
  FaUserCircle,
  FaIdCard,
  FaCalendarAlt,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBuilding,
  FaEdit,
} from "react-icons/fa";

function AccountAuthority({ darkMode, panelClass, user }) {
  const AUTH_COLOR = "#F97316";
  const [activeSection, setActiveSection] = useState("authorityDetails");

  const [account, setAccount] = useState({
    fullName: user?.fullName || "Authority Officer",
    email: user?.email || "authority@onevoice.lk",
    role: user?.role || "authority",
    joined: user?.joined || "Oct 2025",
    phone: user?.phone || "+94 77 123 4567",
    address: user?.address || "Authority Office, Colombo",
    city: user?.city || "Colombo",
    district: user?.district || "Colombo",
    province: user?.province || "Western Province",
    department: user?.department || "Municipal Authority",
    employeeId: user?.employeeId || "AUTH-001",
    assignedArea: user?.assignedArea || "Colombo",
  });

  const inputClass = darkMode
    ? "bg-[#2e2e2e] text-white border border-white/20 rounded-lg px-4 py-3 w-full outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
    : "bg-white text-dark border border-gray-300 rounded-lg px-4 py-3 w-full outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium";

  const viewBoxClass = darkMode
    ? "bg-white/5 border border-white/10"
    : "bg-gray-50 border border-gray-200";

  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify({ ...user, ...account }));
    alert("Authority details saved successfully");
  };

  return (
    <div className={`${panelClass} rounded-[24px] p-5 shadow-card`}>
      <div className="bg-gradient-to-r from-[#F97316] via-[#EA580C] to-[#7C2D12] rounded-2xl p-6 mb-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-28 h-28 rounded-full border-[6px] border-white bg-white flex items-center justify-center shadow-lg overflow-hidden">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="200" height="200" fill="#FFF7ED" />
                <circle cx="100" cy="72" r="34" fill="#F97316" opacity="0.18" />
                <circle cx="100" cy="68" r="26" fill="#141414" />
                <path
                  d="M74 70c8 10 44 10 52 0v18c0 18-12 34-26 34S74 106 74 88V70z"
                  fill="#F2B28D"
                />
                <path
                  d="M72 64c6-28 50-32 58 0-12-10-44-10-58 0z"
                  fill="#141414"
                />
                <path
                  d="M55 170c6-32 26-48 45-48s39 16 45 48H55z"
                  fill="#F97316"
                />
                <path
                  d="M76 170v-32l24 18 24-18v32H76z"
                  fill="#FFFFFF"
                />
                <path d="M90 134h20l-10 22-10-22z" fill="#141414" />
                <circle cx="152" cy="52" r="22" fill="#F97316" />
                <path
                  d="M142 52l7 7 14-15"
                  stroke="#FFFFFF"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
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
                style={{ color: AUTH_COLOR }}
              >
                <FaUserShield />
                Area Authority
              </span>
            </div>
          </div>

          <div className="md:border-l border-white/30 md:pl-8 text-white">
            <p className="text-xs uppercase text-white/60 font-black">
              Joined
            </p>
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
            onClick={() => setActiveSection("authorityDetails")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-black mb-3 transition ${
              activeSection === "authorityDetails"
                ? darkMode
                  ? "bg-white/10 text-white"
                  : "bg-orange-50 text-orange-600"
                : darkMode
                ? "text-white/70 hover:bg-white/10"
                : "text-dark/70 hover:bg-gray-100"
            }`}
          >
            <FaUserCircle />
            Authority Details
          </button>

          <button
            onClick={() => setActiveSection("personalDetails")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-black transition ${
              activeSection === "personalDetails"
                ? darkMode
                  ? "bg-white/10 text-white"
                  : "bg-orange-50 text-orange-600"
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
          {activeSection === "authorityDetails" && (
            <>
              <div
                className={`px-5 py-4 border-b ${
                  darkMode ? "border-white/10" : "border-gray-200"
                }`}
              >
                <h3
                  className="text-xl font-bold"
                  style={{ color: AUTH_COLOR }}
                >
                  Update Authority Profile
                </h3>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Full Name
                    </label>
                    <input
                      name="fullName"
                      value={account.fullName}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Email Address
                    </label>
                    <input
                      name="email"
                      value={account.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Authority Role
                    </label>
                    <input
                      name="role"
                      value={account.role}
                      readOnly
                      className={`${inputClass} opacity-60 cursor-not-allowed`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Employee ID
                    </label>
                    <input
                      name="employeeId"
                      value={account.employeeId}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Assigned Area
                    </label>
                    <input
                      name="assignedArea"
                      value={account.assignedArea}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleSave}
                    className="text-white px-8 py-3 rounded-xl font-black transition flex items-center gap-3 hover:opacity-90"
                    style={{ backgroundColor: AUTH_COLOR }}
                  >
                    <FaSave />
                    Update Profile
                  </button>
                </div>
              </div>
            </>
          )}

          {activeSection === "personalDetails" && (
            <>
              <div
                className={`px-5 py-4 border-b flex items-center justify-between ${
                  darkMode ? "border-white/10" : "border-gray-200"
                }`}
              >
                <h3
                  className="text-xl font-bold"
                  style={{ color: AUTH_COLOR }}
                >
                  Personal Details
                </h3>

                <span className="text-xs font-bold opacity-60 flex items-center gap-2">
                  <FaEdit />
                  View and edit details
                </span>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className={`${viewBoxClass} rounded-xl p-4`}>
                    <p className="text-xs opacity-60 font-black mb-2">
                      Contact
                    </p>
                    <p className="font-semibold text-base flex items-center gap-2">
                      <FaPhoneAlt style={{ color: AUTH_COLOR }} />
                      {account.phone}
                    </p>
                  </div>

                  <div className={`${viewBoxClass} rounded-xl p-4`}>
                    <p className="text-xs opacity-60 font-black mb-2">
                      Location
                    </p>
                    <p className="font-semibold text-base flex items-center gap-2">
                      <FaMapMarkerAlt style={{ color: AUTH_COLOR }} />
                      {account.city}
                    </p>
                  </div>

                  <div className={`${viewBoxClass} rounded-xl p-4`}>
                    <p className="text-xs opacity-60 font-black mb-2">
                      Department
                    </p>
                    <p className="font-semibold text-base flex items-center gap-2">
                      <FaBuilding style={{ color: AUTH_COLOR }} />
                      {account.department}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      value={account.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Department
                    </label>
                    <input
                      name="department"
                      value={account.department}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Address
                    </label>
                    <input
                      name="address"
                      value={account.address}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      City
                    </label>
                    <input
                      name="city"
                      value={account.city}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      District
                    </label>
                    <input
                      name="district"
                      value={account.district}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Province
                    </label>
                    <input
                      name="province"
                      value={account.province}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleSave}
                    className="text-white px-8 py-3 rounded-xl font-black transition flex items-center gap-3 hover:opacity-90"
                    style={{ backgroundColor: AUTH_COLOR }}
                  >
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

export default AccountAuthority;