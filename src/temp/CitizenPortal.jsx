import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaSyncAlt,
  FaHome,
  FaClipboardList,
  FaUserCircle,
  FaSignOutAlt,
  FaPlusCircle,
  FaMicrophone,
  FaClock,
  FaCalendarAlt,
  FaCheckCircle,
  FaSpinner,
  FaExclamationCircle,
  FaMapMarkerAlt,
  FaClipboardCheck,
  FaShieldAlt,
  FaCheck,
  FaTrash,
  FaExclamationTriangle,
} from "react-icons/fa";

import API from "../services/api";
import Logo from "../components/Logo";
import SubmitComplaintCitizen from "./SubmitComplaintCitizen";
import CitizenGuidelines from "./CitizenGuidelines";
import AccountCitizen from "./AccountCitizen";
import CitizenChatbot from "../components/CitizenChatbot";
import CitizenSosComplaintsPage from "../components/CitizenSosComplaintsPage";

function CitizenPortal() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const BLUE = "#2563EB";

  const [activeTab, setActiveTab] = useState("overview");
  const [complaints, setComplaints] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [submissionMethod, setSubmissionMethod] = useState("manual");

  const [form, setForm] = useState({
    title: "",
    email: user?.email || "",
    category: "",
    description: "",
    street: "",
    city: "",
    district: "",
    province: "",
    phone: "",
    evidenceImages: "",
  });

    const fetchMyComplaints = async () => {
  try {

    const token = localStorage.getItem("token");

    const res = await API.get("/complaints/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("My Complaints:", res.data);

    setComplaints(res.data.complaints || []);

  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchMyComplaints();
}, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const pendingCount = complaints.filter((c) => c.status === "Submitted").length;
  // const progressCount = complaints.filter((c) => c.status === "In Progress").length;
  // const resolvedCount = complaints.filter((c) => c.status === "Resolved").length;

const handleRefresh = async () => {
  try {
    setRefreshing(true);

    await fetchMyComplaints();

    alert("Data refreshed successfully");

  } catch (error) {
    console.error("❌ Refresh failed:", error);

    alert(
      error.response?.data?.message ||
      error.message ||
      "Failed to refresh data."
    );

  } finally {
    setRefreshing(false);
  }
};

  const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("email", form.email);
    formData.append("phone", form.phone);

    formData.append("category", form.category);
    formData.append("description", form.description);

    formData.append("street", form.street);
    formData.append("city", form.city);
    formData.append("district", form.district);
    formData.append("province", form.province);

    
    formData.append(
  "submissionMethod",
  submissionMethod
);

formData.append(
  "voiceTranscript",
  submissionMethod === "voice"
    ? form.description
    : ""
);

    if (form.evidenceImages?.length) {
      Array.from(form.evidenceImages).forEach((image) => {
        formData.append("evidenceImages", image);
      });
    }

    await API.post(
      "/complaints",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Complaint submitted successfully.");

    setForm({
      title: "",
      email: user?.email || "",
      category: "",
      description: "",
      street: "",
      city: "",
      district: "",
      province: "",
      phone: "",
      evidenceImages: [],
    });

  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.message ||
      "Failed to submit complaint."
    );
  }
};

  const startListening = (field) => {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US"; // We'll improve this later
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = (event) => {
    const transcript =
      event.results[0][0].transcript;

    setForm((prev) => ({
      ...prev,
      [field]: transcript,
    }));
  };

  recognition.onerror = (event) => {
    console.log(event.error);
    alert("Voice recognition failed.");
  };
};

  const cardClass = darkMode
    ? "bg-[#202020] text-white border border-white/10"
    : "bg-white text-dark border border-gray-100";

  const panelClass = darkMode
    ? "bg-[#202020] text-white border border-white/10"
    : "bg-white text-dark border border-gray-100";

  const categories = [
    "Municipal",
    "Public Safety",
    "Disaster",
    "Criminal",
    "Women/Child Safety",
  ];

  const provinces = [
    "Western",
    "Central",
    "Southern",
    "Northern",
    "Eastern",
    "North Western",
    "North Central",
    "Uva",
    "Sabaragamuwa",
  ];

  const districts = [
    "Colombo",
    "Gampaha",
    "Kalutara",
    "Kandy",
    "Matale",
    "Nuwara Eliya",
    "Galle",
    "Matara",
    "Hambantota",
    "Jaffna",
    "Kilinochchi",
    "Mannar",
    "Vavuniya",
    "Mullaitivu",
    "Batticaloa",
    "Ampara",
    "Trincomalee",
    "Kurunegala",
    "Puttalam",
    "Anuradhapura",
    "Polonnaruwa",
    "Badulla",
    "Monaragala",
    "Ratnapura",
    "Kegalle",
  ];

  const cities = [
    "Colombo",
    "Dehiwala-Mount Lavinia",
    "Moratuwa",
    "Sri Jayawardenepura Kotte",
    "Negombo",
    "Gampaha",
    "Kalutara",
    "Panadura",
    "Kandy",
    "Matale",
    "Nuwara Eliya",
    "Galle",
    "Matara",
    "Hambantota",
    "Jaffna",
    "Vavuniya",
    "Batticaloa",
    "Trincomalee",
    "Ampara",
    "Kurunegala",
    "Puttalam",
    "Anuradhapura",
    "Polonnaruwa",
    "Badulla",
    "Bandarawela",
    "Monaragala",
    "Ratnapura",
    "Kegalle",
  ];

  const timeline = [
    {
      title: "Complaint Submitted",
      date: "Today",
      text: "Your complaint was received by OneVoice.",
      status: "Completed",
    },
    {
      title: "Authority Review",
      date: "Pending",
      text: "Responsible authority will review your complaint.",
      status: "Waiting",
    },
    {
      title: "Action Update",
      date: "Upcoming",
      text: "You will receive updates after authority action.",
      status: "Upcoming",
    },
  ];

  const menuItems = [
    ["overview", "Dashboard", FaHome],
    ["complaints", "My Complaints", FaClipboardList],
    ["sos", "My SOS", FaExclamationTriangle],
    // ["notifications", "Notifications", FaBell],
    ["submit", "Submit Complaint", FaBars],
    ["guidelines", "OneVoice Guidelines", FaExclamationCircle],
  ];

  const pendingCount = complaints.filter(
  (complaint) =>
    complaint.status === "Submitted"
).length;

const progressCount = complaints.filter(
  (complaint) =>
    complaint.status === "Reviewed" ||
    complaint.status === "Taking Action"
).length;

const resolvedCount = complaints.filter(
  (complaint) =>
    complaint.status === "Solved" ||
    complaint.status === "Closed"
).length;

  return (
    <div
      className={`w-screen min-h-screen p-4 font-sans ${
        darkMode ? "bg-black" : "bg-[#1f1f1f]"
      }`}
    >
      <div
        className={`w-full min-h-[calc(100vh-32px)] grid transition-all duration-300 ${
          sidebarCollapsed ? "grid-cols-[92px_1fr]" : "grid-cols-[290px_1fr]"
        } ${darkMode ? "bg-[#141414] text-white" : "bg-[#f7f7f7] text-dark"}`}
      >
        {/* SIDEBAR */}
        <aside className="rounded-r-[34px] p-5 flex flex-col justify-between transition-all duration-300 bg-gradient-to-b from-[#60A5FA] via-[#2563EB] to-[#1E3A8A] text-white shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="w-11 h-11 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition shadow-lg"
              >
                <FaBars size={18} />
              </button>

              {!sidebarCollapsed && (
                <button
                  onClick={handleRefresh}
                  className="w-11 h-11 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition shadow-lg"
                >
                  <FaSyncAlt
                    size={18}
                    className={refreshing ? "animate-spin" : ""}
                  />
                </button>
              )}
            </div>

            <div className="flex justify-center mb-6">
  <div
    className={`rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden transition-all duration-300 ${
      sidebarCollapsed ? "w-14 h-14" : "w-20 h-20"
    }`}
  >
    <svg
      viewBox="0 0 200 200"
      className={sidebarCollapsed ? "w-14 h-14" : "w-20 h-20"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="200" height="200" fill="#EFF6FF" />

      <circle cx="100" cy="72" r="34" fill="#2563EB" opacity="0.18" />

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
        fill="#2563EB"
      />

      <path
        d="M76 170v-32l24 18 24-18v32H76z"
        fill="#FFFFFF"
      />

      <path d="M90 134h20l-10 22-10-22z" fill="#141414" />

      <circle cx="152" cy="52" r="22" fill="#2563EB" />

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
</div>

            {!sidebarCollapsed && (
              <div className="text-center mb-8">
                <h3 className="font-bold text-lg">
                  {user?.fullName || "Pradhiksha"}
                </h3>
                <p className="text-xs text-blue-100 mt-1">Citizen Account</p>
                <div className="mt-3 inline-flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full text-xs">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  Online
                </div>
              </div>
            )}

            <div className="space-y-3">
              {menuItems.map(([tab, label, Icon]) => {
                const active = activeTab === tab;

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full rounded-xl py-3 transition-all flex items-center ${
                      sidebarCollapsed ? "justify-center" : "gap-4 px-4"
                    } ${
                      active
                        ? "bg-[#f2f2f2] text-blue-600 shadow-lg"
                        : "hover:bg-white/15 text-white"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={active ? "text-blue-600" : "text-blue-100"}
                    />

                    {!sidebarCollapsed && (
                      <span className="font-semibold text-sm">{label}</span>
                    )}

                    {!sidebarCollapsed && tab === "notifications" && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {notifications.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-white/20 mt-8 pt-5 space-y-3">
              <button
                onClick={() => setActiveTab("account")}
                className={`w-full rounded-xl py-3 transition-all flex items-center ${
                  sidebarCollapsed ? "justify-center" : "gap-4 px-4"
                } ${
                  activeTab === "account"
                    ? "bg-[#f2f2f2] text-blue-600 shadow-lg"
                    : "hover:bg-white/15 text-white"
                }`}
              >
                <FaUserCircle
                  size={18}
                  className={
                    activeTab === "account" ? "text-blue-600" : "text-blue-100"
                  }
                />
                {!sidebarCollapsed && (
                  <span className="font-semibold text-sm">Account</span>
                )}
              </button>

              <button
                onClick={handleLogout}
                className={`w-full rounded-xl py-3 transition-all flex items-center ${
                  sidebarCollapsed ? "justify-center" : "gap-4 px-4"
                } hover:bg-white/15 text-white`}
              >
                <FaSignOutAlt size={18} className="text-blue-100" />
                {!sidebarCollapsed && (
                  <span className="font-semibold text-sm">Logout</span>
                )}
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="p-8 md:p-10 min-w-0">
          {/* TOP BAR */}
          <div className="mb-8 rounded-[24px] bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#1E3A8A] px-8 py-8 shadow-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden">
            

            <div className="relative z-10">
              <h1 className="text-2xl font-black text-white">
                Welcome back, {user?.fullName || "Pradhiksha"}
              </h1>
              
              <p className="mt-1 text-white/75 text-xs font-bold">
                Your OneVoice portal is live and synchronized with authority
                updates.
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-4">
              <div className="bg-white text-blue-600 px-5 py-3 rounded-full text-xs font-black shadow-lg flex items-center gap-2">
                <FaCalendarAlt />
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>

              <div className="bg-white text-blue-600 px-5 py-3 rounded-full text-xs font-black shadow-lg flex items-center gap-2">
                <FaClock />
                {new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="bg-white/20 border border-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-white/30 transition"
              >
                {darkMode ? "🌙" : "☀️"}
              </button>
            </div>
          </div>

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <>
              {/* SUMMARY CARDS */}
              {/* SUMMARY CARDS */}
<div
  className={`${panelClass} rounded-[24px] p-5 shadow-card mb-6`}
>
  <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

    {/* MY COMPLAINTS */}
    <SummaryCard
      title="My Complaints"
      total={complaints.length}
      items={[
        [
          "Pending",
          pendingCount,
          "text-red-600",
        ],
        [
          "In Process",
          progressCount,
          "text-blue-600",
        ],
        [
          "Solved",
          resolvedCount,
          "text-green-600",
        ],
      ]}
      button="Track Issues"
      onClick={() =>
        setActiveTab("complaints")
      }
      color={BLUE}
    />


    {/* AUTHORITY UPDATES */}
    <SummaryCard
      title="Authority Updates"
      total={notifications.length}
      items={[
        [
          "New",
          notifications.filter(
            (notification) =>
              !notification.isRead
          ).length,
          "text-red-600",
        ],
        [
          "Reviewed",
          notifications.filter(
            (notification) =>
              notification.type ===
                "reviewed" ||
              notification.status ===
                "Reviewed"
          ).length,
          "text-blue-600",
        ],
        [
          "Done",
          notifications.filter(
            (notification) =>
              notification.type ===
                "solved" ||
              notification.status ===
                "Solved"
          ).length,
          "text-green-600",
        ],
      ]}
      button="View Updates"
      onClick={() =>
        setActiveTab("notifications")
      }
      color={BLUE}
    />


    {/* LATEST STATUS */}
    <div className="rounded-2xl border border-blue-100 p-5 bg-white">

      <div className="flex items-center justify-between mb-5">

        <h3 className="font-black text-blue-600 flex items-center gap-2">
          <FaClock />
          Latest Status
        </h3>

        <span className="bg-blue-50 text-blue-600 text-xs font-black px-3 py-1 rounded-full">
          Active
        </span>

      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-center">

        <h4 className="font-black text-blue-700">
          Complaint Tracking
        </h4>

        <p className="text-sm mt-2 text-blue-900/70">
          Submit complaint and track authority progress here.
        </p>

      </div>

    </div>

  </div>
</div>

              {/* TIMELINE + QUICK ACTIONS */}
              <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
                <div className={`${panelClass} rounded-[24px] shadow-card overflow-hidden`}>
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-black text-blue-600 flex items-center gap-2">
                      <FaSyncAlt />
                      Complaint Tracking Timeline
                    </h2>
                  </div>

                  <div className="p-6 space-y-5">
                    {timeline.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                            {item.status === "Completed" ? (
                              <FaCheckCircle />
                            ) : item.status === "Waiting" ? (
                              <FaSpinner />
                            ) : (
                              <FaClock />
                            )}
                          </div>
                          {index !== timeline.length - 1 && (
                            <div className="w-[3px] h-14 bg-blue-100"></div>
                          )}
                        </div>

                        <div className="pb-3">
                          <h3 className="font-black">{item.title}</h3>
                          <p className="text-sm opacity-60 mt-1">{item.date}</p>
                          <p className="text-sm mt-2 opacity-80">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`${panelClass} rounded-[24px] shadow-card overflow-hidden`}>
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-black text-blue-600">
                      Quick Actions
                    </h2>
                  </div>

                  <div className="p-6 space-y-4">
                    <button
                      onClick={() => setShowComplaintForm(true)}
                      className="w-full border border-blue-200 rounded-xl p-5 text-left hover:bg-blue-50 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <FaPlusCircle />
                        </div>
                        <div>
                          <h3 className="font-black text-blue-600">
                            Manual Complaint
                          </h3>
                          <p className="text-sm opacity-60">
                            Submit complaint by typing details.
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveTab("ai")}
                      className="w-full border border-blue-200 rounded-xl p-5 text-left hover:bg-blue-50 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <FaMicrophone />
                        </div>
                        <div>
                          <h3 className="font-black text-blue-600">
                            AI Voice Complaint
                          </h3>
                          <p className="text-sm opacity-60">
                            Speak and convert voice to text.
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* MY COMPLAINTS */}
{activeTab === "complaints" && (
  <CitizenComplaintsPage
  darkMode={darkMode}
  panelClass={panelClass}
  complaints={complaints}
  setComplaints={setComplaints}
/>
)}

{activeTab === "sos" && (
  <CitizenSosComplaintsPage
    darkMode={darkMode}
    panelClass={panelClass}
  />
)}

{/* NOTIFICATIONS */}
{/* {activeTab === "notifications" && (
  <CitizenNotificationsPage darkMode={darkMode} panelClass={panelClass} />
)} */}

          {/* ACCOUNT */}
          {activeTab === "account" && (
          <AccountCitizen darkMode={darkMode} panelClass={panelClass} user={user} />
        )}
        {activeTab === "submit" && (
          <SubmitComplaintCitizen
            darkMode={darkMode}
            setShowComplaintForm={setShowComplaintForm}
            setActiveTab={setActiveTab}
          />
        )}

{activeTab === "guidelines" && (
  <CitizenGuidelines darkMode={darkMode} />
)}
          {/* MANUAL COMPLAINT FORM POPUP */}
          {showComplaintForm && (
            <div className="fixed inset-0 bg-black/70 z-[2222] flex items-center justify-center px-4">
              <div
                style={{ scrollbarWidth: "none" }}
                className={`w-full max-w-[760px] max-h-[92vh] overflow-y-auto rounded-[24px] p-8 relative ${
                  darkMode ? "bg-[#202020] text-white" : "bg-[#e0e0e0] text-dark"
                }`}
              >
                <button
                  onClick={() => {
                    setSubmissionMethod("manual");
                    setShowComplaintForm(false);
                  }}
                  className="absolute top-5 right-6 text-2xl font-black"
                >
                  ×
                </button>

                <h2 className="text-2xl font-black mb-2">Manual Complaint</h2>
                <p className="opacity-70 mb-8">Fill your complaint details below</p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setShowComplaintForm(false);
                    setShowConfirmPopup(true);
                  }}
                  className="space-y-5"
                >
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Complaint Title"
                    className="w-full px-5 py-4 rounded-xl outline-none text-dark"
                  />

                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full px-5 py-4 rounded-xl outline-none text-dark"
                  />

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl outline-none text-dark bg-white"
                  >
                    <option value="">Select Category</option>
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <input
                    name="street"
                    value={form.street}
                    onChange={handleChange}
                    placeholder="Street / House Number / Area"
                    className="w-full px-5 py-4 rounded-xl outline-none text-dark"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <select
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl outline-none text-dark bg-white"
                    >
                      <option value="">City</option>
                      {cities.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                    <select
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl outline-none text-dark bg-white"
                    >
                      <option value="">District</option>
                      {districts.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                    <select
                      name="province"
                      value={form.province}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl outline-none text-dark bg-white"
                    >
                      <option value="">Province</option>
                      {provinces.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Complaint Description"
                    className="w-full min-h-[130px] px-5 py-4 rounded-xl outline-none text-dark resize-none"
                  />

                  <div className="flex">
                    <input
                      value="+94"
                      readOnly
                      className="w-[90px] px-5 py-4 rounded-l-xl outline-none text-dark border-r"
                    />

                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Whatsapp Number"
                      className="w-full px-5 py-4 rounded-r-xl outline-none text-dark"
                    />
                  </div>

                  <div>
  <label className="block font-semibold mb-2">
    Attach Evidence Images
  </label>

  <input
    type="file"
    name="evidenceImages"
    multiple
    accept="image/*"
    onChange={(e) =>
      setForm({
        ...form,
        evidenceImages: [...e.target.files],
      })
    }
    className="w-full bg-white rounded-xl p-3 text-dark"
  />

  <p className="text-xs opacity-60 mt-2">
    Maximum 5 images (JPG, PNG, JPEG)
  </p>
</div>

{form.evidenceImages?.length > 0 && (
  <div className="grid grid-cols-3 gap-3 mt-4">
    {form.evidenceImages.map((file, index) => (
      <div
        key={index}
        className="border rounded-xl overflow-hidden"
      >
        <img
          src={URL.createObjectURL(file)}
          alt=""
          className="w-full h-28 object-cover"
        />

        <p className="text-xs p-2 truncate">
          {file.name}
        </p>
      </div>
    ))}
  </div>
)}

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-black hover:bg-blue-800 transition"
                  >
                    Next →
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* CONFIRM COMPLAINT POPUP */}
          {showConfirmPopup && (
            <div className="fixed inset-0 bg-black/75 z-[9999] flex items-center justify-center px-4">
              <div
                className={`w-full max-w-[430px] min-h-[520px] rounded-[24px] p-8 relative ${
                  darkMode ? "bg-[#202020] text-white" : "bg-[#e0e0e0] text-dark"
                }`}
              >
                <button
                  onClick={() => setShowConfirmPopup(false)}
                  className="absolute top-5 right-6 text-2xl font-black"
                >
                  ×
                </button>

                <h2 className="text-2xl font-black mb-8">Complaint Confirmation</h2>

                <div className="space-y-4 text-sm">
                  <p>
                    <b>Title:</b> {form.title}
                  </p>
                  <p>
                    <b>Category:</b> {form.category}
                  </p>
                  <p>
                    <b>Location:</b> {form.street}, {form.city}, {form.district},{" "}
                    {form.province}
                  </p>
                  <p>
                    <b>Description:</b> {form.description}
                  </p>
                  <p>
                    <b>Whatsapp:</b> +94 {form.phone}
                  </p>
                </div>

                <button
                  onClick={async () => {
                    await handleSubmit();
                    setShowConfirmPopup(false);
                  }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-12 py-4 rounded-xl font-black hover:bg-blue-800 transition"
                >
                  Submit →
                </button>
              </div>
            </div>
          )}

          {/* AI VOICE FORM */}
          {activeTab === "ai" && (
            <div className={`${panelClass} rounded-[28px] p-8 shadow-card`}>
              <h2 className="text-2xl font-black mb-2">AI Voice Complaint Form</h2>
              <p className="opacity-60 mb-8">
                Speak or type your complaint details below.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  setSubmissionMethod("voice");

                  setShowConfirmPopup(true);
                }}

                className="space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-[1fr_120px] gap-3">
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Complaint Title"
                    className="w-full px-5 py-4 rounded-xl outline-none text-dark"
                  />

                  <button
                    type="button"
                    onClick={() => startListening("title")}
                    className="bg-blue-600 text-white rounded-xl font-bold"
                  >
                    🎤 Speak
                  </button>
                </div>

                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full px-5 py-4 rounded-xl outline-none text-dark"
                />

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl outline-none text-dark bg-white"
                >
                  <option value="">Select Category</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_120px] gap-3">
                  <input
                    name="street"
                    value={form.street}
                    onChange={handleChange}
                    placeholder="Street / House Number / Area"
                    className="w-full px-5 py-4 rounded-xl outline-none text-dark"
                  />

                  <button
                    type="button"
                    onClick={() => startListening("street")}
                    className="bg-blue-600 text-white rounded-xl font-bold"
                  >
                    🎤 Speak
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <select
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl outline-none text-dark bg-white"
                  >
                    <option value="">City</option>
                    {cities.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <select
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl outline-none text-dark bg-white"
                  >
                    <option value="">District</option>
                    {districts.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <select
                    name="province"
                    value={form.province}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl outline-none text-dark bg-white"
                  >
                    <option value="">Province</option>
                    {provinces.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_120px] gap-3">
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Complaint Description"
                    className="w-full min-h-[150px] px-5 py-4 rounded-xl outline-none text-dark resize-none"
                  />

                  <button
                    type="button"
                    onClick={() => startListening("description")}
                    className="bg-blue-600 text-white rounded-xl font-bold h-[60px]"
                  >
                    🎤 Speak
                  </button>
                </div>

                <div className="flex">
                  <input
                    value="+94"
                    readOnly
                    className="w-[90px] px-5 py-4 rounded-l-xl outline-none text-dark border-r"
                  />

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Whatsapp Number"
                    className="w-full px-5 py-4 rounded-r-xl outline-none text-dark"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-black hover:bg-blue-800 transition"
                >
                  Next →
                </button>
                <div>

  <label className="block font-bold mb-2">
    Attach Evidence Images
  </label>

  <input
    type="file"
    multiple
    accept="image/*"
    onChange={(e) =>
      setForm({
        ...form,
        evidenceImages: e.target.files,
      })
    }
    className="w-full px-5 py-4 rounded-xl outline-none text-dark bg-white"
  />

  {form.evidenceImages?.length > 0 && (
    <div className="mt-3 space-y-2">

      <p className="font-semibold text-sm">
        Selected Images
      </p>

      {Array.from(form.evidenceImages).map((file, index) => (
        <div
          key={index}
          className="px-3 py-2 bg-white rounded-lg text-dark border"
        >
          📷 {file.name}
        </div>
      ))}

    </div>
  )}

</div>
              </form>
            </div>
          )}
        </main>
        <CitizenChatbot />
      </div>
    </div>
  );
}

function SummaryCard({ title, total, items, button, onClick, color }) {
  return (
    <div className="rounded-2xl border border-blue-100 p-5 bg-white">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-black text-blue-600 flex items-center gap-2">
          <FaExclamationCircle />
          {title}
        </h3>

        <span className="bg-blue-50 text-blue-600 text-xs font-black px-3 py-1 rounded-full">
          Total: {total}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {items.map(([label, value, colorClass]) => (
          <div key={label} className="rounded-xl p-4 text-center border bg-white border-gray-100">
            <h4 className={`text-2xl font-black ${colorClass}`}>{value}</h4>
            <p className={`mt-1 text-[10px] font-black uppercase ${colorClass}`}>
              {label}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={onClick}
        className="w-full border py-2 rounded-md text-sm font-black hover:text-white transition"
        style={{ borderColor: color, color }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = color;
          e.currentTarget.style.color = "white";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = color;
        }}
      >
        {button}
      </button>
    </div>
  );
}

function CitizenComplaintsPage({
  darkMode,
  panelClass,
  complaints,
  setComplaints,
}) {
  const BLUE = "#2563EB";

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  
const statusDot = (status) => {
  if (status === "Submitted") return "🔵";
  if (status === "Reviewed") return "🟡";
  if (status === "Taking Action") return "🟠";
  if (status === "Solved") return "🟢";
  if (status === "Closed") return "⚫";
  return "⚪";
};

const priorityClass = (priority) => {
  if (priority === "Critical")
    return "bg-red-100 text-red-700";

  if (priority === "High")
    return "bg-yellow-100 text-yellow-700";

  return "bg-blue-100 text-blue-700";
};


  return (
    <div className={`${panelClass} rounded-[24px] p-5 shadow-card`}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-black flex items-center gap-3">
          <FaClipboardList style={{ color: BLUE }} />
          My Complaints
        </h2>

        <span
          className="text-white px-4 py-2 rounded-lg text-sm font-bold"
          style={{ backgroundColor: BLUE }}
        >
          {complaints.length} Total
        </span>
      </div>

      <div
        className={`rounded-xl overflow-hidden border ${
          darkMode ? "border-white/10" : "border-gray-200"
        }`}
      >
        <div className="overflow-x-auto max-h-[380px] overflow-y-auto">
          <table className="w-full min-w-[1050px] text-sm">
            <thead className="sticky top-0 z-10">
              <tr
                className={
                  darkMode
                    ? "bg-[#2e2e2e] text-white"
                    : "bg-gray-100 text-dark"
                }
              >
                <th className="py-3 px-4 text-left">Complaint ID</th>
                <th className="py-3 px-4 text-left">Subject</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Priority</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">View</th>
                <th className="py-3 px-4 text-center">Reconsider</th>
              </tr>
            </thead>

            <tbody>
  {complaints.map((item) => (
    <tr
      key={item._id}
      className={`border-t ${
        darkMode
          ? "border-white/10 hover:bg-white/5"
          : "border-gray-200 hover:bg-blue-50"
      }`}
    >
      {/* Complaint ID */}
      <td className="py-3 px-4 font-black">
        {item.complaintId}
      </td>

      {/* Subject */}
      <td className="py-3 px-4 font-bold">
        {item.title}
      </td>

      {/* Category */}
      <td className="py-3 px-4">
        {item.category}
      </td>

      {/* Location */}
      <td className="py-3 px-4">
        {item.location?.city || "-"}
      </td>

      {/* Priority */}
      <td className="py-3 px-4">
        <span
          className={`px-4 py-1 rounded-full text-xs font-black ${priorityClass(
            item.priority
          )}`}
        >
          {item.priority}
        </span>
      </td>

      {/* Status */}
      <td className="py-3 px-4">
        <span className="border border-gray-300 rounded-full px-3 py-1 text-sm bg-white text-dark">
          {statusDot(item.status)} {item.status}
        </span>
      </td>

      {/* View */}
      <td className="py-3 px-4 text-center">
        <button
          onClick={() => setSelectedComplaint(item)}
          className="text-white px-5 py-2 rounded-lg text-sm font-bold"
          style={{ backgroundColor: BLUE }}
        >
          View
        </button>
      </td>

      {/* Reconsider */}
      <td className="py-3 px-4 text-center">
        <button
          disabled={item.status !== "Solved"}
          onClick={() => requestReconsider(item)}
          className={`px-4 py-2 rounded-lg text-sm font-bold ${
            item.status === "Solved"
              ? "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Request
        </button>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      </div>

      <div
        className={`mt-5 rounded-xl p-5 border ${
          selectedComplaint
            ? darkMode
              ? "bg-white/5 border-white/10"
              : "bg-blue-50 border-blue-100 text-dark"
            : "bg-cyan-50 border-cyan-100 text-cyan-900"
        }`}
      >
        {!selectedComplaint ? (
  <div>
    <h3 className="font-black">
      No Complaint Selected
    </h3>

    <p className="text-sm mt-1">
      Select a complaint to view status tracking
      and authority updates.
    </p>
  </div>
) : (
  <div>

    {/* HEADER */}
    <div className="flex items-center justify-between mb-5">

      <div>
        <h3 className="text-lg font-black">
          Complaint Details
        </h3>

        <p className="text-xs opacity-60 mt-1">
          Complete information about your complaint
        </p>
      </div>

      <button
        onClick={() => setSelectedComplaint(null)}
        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition"
      >
        ✕ Close
      </button>

    </div>


    {/* BASIC COMPLAINT DETAILS */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div>
        <p className="text-xs font-bold opacity-60">
          Complaint ID
        </p>

        <p className="text-sm font-bold mt-1">
          {selectedComplaint.complaintId || "-"}
        </p>
      </div>


      <div>
        <p className="text-xs font-bold opacity-60">
          Category
        </p>

        <p className="text-sm font-bold mt-1">
          {selectedComplaint.category || "-"}
        </p>
      </div>


      <div>
        <p className="text-xs font-bold opacity-60">
          Status
        </p>

        <p className="text-sm font-bold mt-1">
          {selectedComplaint.status || "-"}
        </p>
      </div>


      <div>
        <p className="text-xs font-bold opacity-60">
          Priority
        </p>

        <p className="text-sm font-bold mt-1">
          {selectedComplaint.priority || "-"}
        </p>
      </div>

    </div>


    {/* DIVIDER */}
    <div className="border-t border-gray-200/30 my-5" />


    {/* LOCATION */}
    <div>

      <h4 className="text-sm font-black mb-3">
        Complaint Location
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <p className="text-xs font-bold opacity-60">
            Street / Area
          </p>

          <p className="text-sm font-medium mt-1">
            {selectedComplaint.location?.street ||
              "-"}
          </p>
        </div>


        <div>
          <p className="text-xs font-bold opacity-60">
            City
          </p>

          <p className="text-sm font-medium mt-1">
            {selectedComplaint.location?.city ||
              "-"}
          </p>
        </div>


        <div>
          <p className="text-xs font-bold opacity-60">
            District
          </p>

          <p className="text-sm font-medium mt-1">
            {selectedComplaint.location?.district ||
              "-"}
          </p>
        </div>


        <div>
          <p className="text-xs font-bold opacity-60">
            Province
          </p>

          <p className="text-sm font-medium mt-1">
            {selectedComplaint.location?.province ||
              "-"}
          </p>
        </div>


        <div className="md:col-span-2">

          <p className="text-xs font-bold opacity-60">
            Full Address
          </p>

          <p className="text-sm font-medium mt-1">
            {selectedComplaint.location?.fullAddress ||
              "-"}
          </p>

        </div>

      </div>

    </div>


    {/* DIVIDER */}
    <div className="border-t border-gray-200/30 my-5" />


    {/* CITIZEN CONTACT DETAILS */}
    <div>

      <h4 className="text-sm font-black mb-3">
        Submitted Information
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <p className="text-xs font-bold opacity-60">
            Email
          </p>

          <p className="text-sm font-medium mt-1 break-all">
            {selectedComplaint.email || "-"}
          </p>
        </div>


        <div>
          <p className="text-xs font-bold opacity-60">
            WhatsApp / Phone
          </p>

          <p className="text-sm font-medium mt-1">
            {selectedComplaint.phone ||
              selectedComplaint.whatsapp ||
              "-"}
          </p>
        </div>


        <div>
          <p className="text-xs font-bold opacity-60">
            Submission Method
          </p>

          <p className="text-sm font-medium mt-1 capitalize">
            {selectedComplaint.submissionMethod ||
              "-"}
          </p>
        </div>


        <div>
          <p className="text-xs font-bold opacity-60">
            Submitted
          </p>

          <p className="text-sm font-medium mt-1">
            {selectedComplaint.createdAt
              ? new Date(
                  selectedComplaint.createdAt
                ).toLocaleString()
              : "-"}
          </p>
        </div>

      </div>

    </div>


    {/* DIVIDER */}
    <div className="border-t border-gray-200/30 my-5" />


    {/* DESCRIPTION */}
    <div>

      <h4 className="text-sm font-black mb-3">
        Complaint Description
      </h4>

      <div className="rounded-lg border border-gray-200/30 p-4">

        <p className="text-sm leading-6">
          {selectedComplaint.description ||
            "No description provided."}
        </p>

      </div>

    </div>


    {/* VOICE TRANSCRIPT */}
    {selectedComplaint.voiceTranscript && (
      <>
        <div className="border-t border-gray-200/30 my-5" />

        <div>

          <h4 className="text-sm font-black mb-3">
            Voice Transcript
          </h4>

          <div className="rounded-lg border border-gray-200/30 p-4">

            <p className="text-sm leading-6">
              {selectedComplaint.voiceTranscript}
            </p>

          </div>

        </div>
      </>
    )}


    {/* EVIDENCE */}
    <div className="border-t border-gray-200/30 my-5" />

    <div>

      <h4 className="text-sm font-black mb-3">
        Evidence Images
      </h4>

      {selectedComplaint.evidenceImages?.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">

          {selectedComplaint.evidenceImages.map(
            (image, index) => {

              const imageUrl =
                image.startsWith("http")
                  ? image
                  : `http://localhost:5000${image}`;

              return (
                <div
                  key={`${image}-${index}`}
                  className="rounded-lg overflow-hidden border border-gray-200/30"
                >

                  <img
                    src={imageUrl}
                    alt={`Evidence ${index + 1}`}
                    className="w-full h-44 object-cover"
                  />

                </div>
              );
            }
          )}

        </div>

      ) : (

        <div className="rounded-lg border border-gray-200/30 p-3">

          <p className="text-sm opacity-60">
            No evidence images were submitted.
          </p>

        </div>

      )}

    </div>


    {/* DIVIDER */}
    <div className="border-t border-gray-200/30 my-5" />


    {/* ASSIGNED AUTHORITY */}
    <div>

      <h4 className="text-sm font-black mb-3">
        Assigned Authority
      </h4>

      {selectedComplaint.assignedAuthority ? (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <p className="text-xs font-bold opacity-60">
              Authority Name
            </p>

            <p className="text-sm font-medium mt-1">
              {selectedComplaint.assignedAuthority
                ?.fullName || "-"}
            </p>
          </div>


          <div>
            <p className="text-xs font-bold opacity-60">
              Department
            </p>

            <p className="text-sm font-medium mt-1">
              {selectedComplaint.assignedAuthority
                ?.department || "-"}
            </p>
          </div>


          <div>
            <p className="text-xs font-bold opacity-60">
              Email
            </p>

            <p className="text-sm font-medium mt-1 break-all">
              {selectedComplaint.assignedAuthority
                ?.email || "-"}
            </p>
          </div>


          <div>
            <p className="text-xs font-bold opacity-60">
              Phone
            </p>

            <p className="text-sm font-medium mt-1">
              {selectedComplaint.assignedAuthority
                ?.phone || "-"}
            </p>
          </div>

        </div>

      ) : (

        <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-3">

          <p className="text-sm font-bold text-yellow-800">
            No authority has been assigned yet.
          </p>

        </div>

      )}

    </div>


    {/* DIVIDER */}
    <div className="border-t border-gray-200/30 my-5" />


    {/* AUTHORITY REMARK */}
    <div>

      <h4 className="text-sm font-black mb-3">
        Authority Remark
      </h4>

      <div className="rounded-lg border border-gray-200/30 p-4">

        <p className="text-sm leading-6">
          {selectedComplaint.authorityRemark ||
            "No remarks yet."}
        </p>

      </div>

    </div>


  </div>
)}
      </div>
    </div>
  );
}

function CitizenNotificationsPage({ darkMode, panelClass }) {
  const BLUE = "#2563EB";

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      badge: "New",
      title: "Complaint Submitted",
      message: "Your complaint CMP001 has been submitted successfully.",
      time: "5 mins ago",
      type: "new",
      read: false,
    },
    {
      id: 2,
      badge: "Update",
      title: "Authority Reviewed",
      message: "Authority reviewed your street light complaint CMP002.",
      time: "1 hour ago",
      type: "update",
      read: false,
    },
    {
      id: 3,
      badge: "Action",
      title: "Taking Action",
      message: "Your garbage collection complaint CMP003 is now taking action.",
      time: "2 hours ago",
      type: "action",
      read: true,
    },
    {
      id: 4,
      badge: "Solved",
      title: "Complaint Solved",
      message: "Drainage blockage complaint CMP004 was marked as solved.",
      time: "Yesterday",
      type: "solved",
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const deleteAll = () => {
    setNotifications([]);
  };

  return (
    <div className={`${panelClass} rounded-[28px] p-6 shadow-card`}>
      <div
        className={`rounded-2xl p-6 mb-7 ${
          darkMode ? "bg-white/10" : "bg-blue-50"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="text-3xl font-black flex items-center gap-3">
              <FaBell style={{ color: BLUE }} />
              Notifications
            </h2>
            <p className="mt-2 opacity-70 text-sm font-bold">
              Track complaint submissions, authority updates, solved actions,
              and reconsider responses.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={markAllRead}
              className="border border-green-500 text-green-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-50 transition"
            >
              Mark All Read
            </button>

            <button
              onClick={deleteAll}
              className="border border-red-500 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-50 transition"
            >
              Delete All
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div
            className={`rounded-2xl p-10 text-center ${
              darkMode ? "bg-white/10" : "bg-gray-100"
            }`}
          >
            <p className="font-black opacity-60">No notifications available.</p>
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              className={`border-2 rounded-xl p-5 transition ${
                item.read
                  ? darkMode
                    ? "border-white/10 bg-white/5"
                    : "border-gray-200 bg-white"
                  : darkMode
                  ? "border-blue-500 bg-white/10"
                  : "border-blue-500 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-full text-white flex items-center justify-center"
                    style={{ backgroundColor: BLUE }}
                  >
                    <FaBell />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className="text-white text-[10px] px-3 py-1 rounded-md font-black"
                        style={{ backgroundColor: BLUE }}
                      >
                        {item.badge}
                      </span>

                      <h3 className="font-black text-lg">{item.title}</h3>
                    </div>

                    <p className="text-sm opacity-70">{item.message}</p>

                    <button
                      className="mt-4 text-white px-4 py-2 rounded-md text-xs font-bold"
                      style={{ backgroundColor: BLUE }}
                    >
                      View Details
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-xs opacity-60 whitespace-nowrap mt-1">
                    {item.time}
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => markAsRead(item.id)}
                      className="w-9 h-9 rounded-md border border-green-400 text-green-600 flex items-center justify-center hover:bg-green-50 transition"
                    >
                      <FaCheck />
                    </button>

                    <button
                      onClick={() => deleteNotification(item.id)}
                      className="w-9 h-9 rounded-md border border-red-500 text-red-600 flex items-center justify-center hover:bg-red-50 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
    </div>
  );
}

export default CitizenPortal;