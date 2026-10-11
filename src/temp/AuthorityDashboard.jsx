import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaSyncAlt,
  FaHome,
  FaClipboardList,
  FaExclamationTriangle,
  FaChartPie,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaUserShield,
  FaClock,
  FaCalendarAlt,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import ComplaintManagementAuthority from "./ComplaintManagementAuthority";
import SosComplaintsAuthority from "./SosComplaintsAuthority";
import ReportsAuthority from "./ReportsAuthority";
import NotificationsAuthority from "./NotificationsAuthority";
import AccountAuthority from "./AccountAuthority";

function AuthorityDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [activeTab, setActiveTab] = useState("overview");
  const [darkMode, setDarkMode] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [sosComplaints, setSosComplaints] = useState([]);
  const orange = "#F97316";

  useEffect(() => {
  fetchAuthorityData();
}, []);

const fetchAuthorityData = async () => {
  try {
    const token =
      localStorage.getItem("token");

    // NORMAL COMPLAINTS
    const complaintsRes = await API.get(
      "/complaints/assigned",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "👮 AUTHORITY NORMAL COMPLAINTS:",
      complaintsRes.data.complaints
    );

    console.log(
      "👮 NORMAL COMPLAINT COUNT:",
      complaintsRes.data.complaints?.length
    );

    setComplaints(
      complaintsRes.data.complaints || []
    );

    // SOS COMPLAINTS
    const sosRes = await API.get(
      "/sos/assigned",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "🚨 AUTHORITY SOS COMPLAINTS:",
      sosRes.data.sosComplaints
    );

    console.log(
      "🚨 SOS COMPLAINT COUNT:",
      sosRes.data.sosComplaints?.length
    );

    setSosComplaints(
      sosRes.data.sosComplaints || []
    );

  } catch (error) {
    console.error(
      "❌ Failed to fetch authority dashboard data:",
      error
    );

    console.error(
      "Server response:",
      error.response?.data
    );
  }
};

  const handleRefresh = async () => {
  setRefreshing(true);

  await fetchAuthorityData();

  setRefreshing(false);
};

  const cardClass = darkMode
    ? "bg-[#202020] text-white border border-white/10"
    : "bg-white text-dark border border-gray-100";

  const panelClass = darkMode
    ? "bg-[#202020] text-white border border-white/10"
    : "bg-white text-dark border border-gray-100";

  const menuItems = [
    ["overview", "Dashboard", FaHome],
    ["complaints", "Complaint Management", FaClipboardList],
    ["sos", "SOS Complaints", FaExclamationTriangle],
    ["reports", "Reports", FaChartPie],
    // ["notifications", "Notifications", FaBell],
  ];

  return (
    <div
      className={`w-screen min-h-screen p-4 font-sans ${
        darkMode ? "bg-black" : "bg-[#1f1f1f]"
      }`}
    >
      <div
        className={`w-full min-h-[calc(100vh-32px)] grid transition-all duration-300 ${
          sidebarCollapsed
            ? "grid-cols-[92px_1fr]"
            : "grid-cols-[290px_1fr]"
        } ${darkMode ? "bg-[#141414] text-white" : "bg-[#f7f7f7] text-dark"}`}
      >
        {/* SIDEBAR */}
        <aside
          className={`
            rounded-r-[34px]
            p-5
            flex
            flex-col
            justify-between
            transition-all
            duration-300
            bg-gradient-to-b
            from-[#ff9a3c]
            via-[#f97316]
            to-[#9a3412]
            text-white
            shadow-2xl
          `}
        >
          <div>
            {/* TOP BUTTONS */}
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

            {/* PROFILE */}
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
      <rect width="200" height="200" fill="#FFF7ED" />
      <circle cx="100" cy="72" r="34" fill="#F97316" opacity="0.18" />
      <circle cx="100" cy="68" r="26" fill="#141414" />
      <path d="M74 70c8 10 44 10 52 0v18c0 18-12 34-26 34S74 106 74 88V70z" fill="#F2B28D" />
      <path d="M72 64c6-28 50-32 58 0-12-10-44-10-58 0z" fill="#141414" />
      <path d="M55 170c6-32 26-48 45-48s39 16 45 48H55z" fill="#F97316" />
      <path d="M76 170v-32l24 18 24-18v32H76z" fill="#FFFFFF" />
      <path d="M90 134h20l-10 22-10-22z" fill="#141414" />
      <circle cx="152" cy="52" r="22" fill="#F97316" />
      <path d="M142 52l7 7 14-15" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  </div>
</div>

            {!sidebarCollapsed && (
              <div className="text-center mb-8">
                <h3 className="font-bold text-lg">
                  {user?.fullName || "Authority"}
                </h3>
                <p className="text-xs text-orange-100 mt-1">
                  Area Authority
                </p>
                <div className="mt-3 inline-flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full text-xs">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  Online
                </div>
              </div>
            )}

            {/* MENU */}
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
                        ? "bg-[#f2f2f2] text-orange-600 shadow-lg"
                        : "hover:bg-white/15 text-white"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={active ? "text-orange-600" : "text-orange-100"}
                    />

                    {!sidebarCollapsed && (
                      <span className="font-semibold text-sm">{label}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ACCOUNT + LOGOUT */}
            <div className="border-t border-white/20 mt-8 pt-5 space-y-3">
              <button
                onClick={() => setActiveTab("account")}
                className={`w-full rounded-xl py-3 transition-all flex items-center ${
                  sidebarCollapsed ? "justify-center" : "gap-4 px-4"
                } ${
                  activeTab === "account"
                    ? "bg-[#f2f2f2] text-orange-600 shadow-lg"
                    : "hover:bg-white/15 text-white"
                }`}
              >
                <FaUserCircle
                  size={18}
                  className={
                    activeTab === "account"
                      ? "text-orange-600"
                      : "text-orange-100"
                  }
                />

                {!sidebarCollapsed && (
                  <span className="font-semibold text-sm">Account</span>
                )}
              </button>

              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
                className={`w-full rounded-xl py-3 transition-all flex items-center ${
                  sidebarCollapsed ? "justify-center" : "gap-4 px-4"
                } hover:bg-white/15 text-white`}
              >
                <FaSignOutAlt size={18} className="text-orange-100" />

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
          <div
            className="
              mb-10
              rounded-[24px]
              bg-gradient-to-r
              from-[#f97316]
              via-[#ea580c]
              to-[#7c2d12]
              px-8
              py-8
              shadow-2xl
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-6
            "
          >
            <div>
              <h1 className="text-2xl font-black text-white">
                Welcome back, {user?.fullName || "Authority"}
              </h1>

              <p className="mt-2 text-white/80 text-xs font-bold">
                Authority monitoring: view assigned complaints, SOS alerts, and
                response progress in your assigned area.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white text-orange-600 px-5 py-3 rounded-full text-xs font-black shadow-lg flex items-center gap-2">
                <FaCalendarAlt />
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>

              <div className="bg-white text-orange-600 px-5 py-3 rounded-full text-xs font-black shadow-lg flex items-center gap-2">
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
    {/* STAT CARDS */}
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5 mb-8">
      {[
        {
          title: "Complaints",
          value: complaints.length,
          icon: <FaClipboardList />,
        },
        {
          title: "SOS",
          value: sosComplaints.length,
          icon: <FaExclamationTriangle />,
        },
        {
          title: "Submitted",
          value: complaints.filter(
            (c) => c.status === "Submitted"
          ).length,
          icon: <FaBell />,
        },
        {
          title: "In Action",
          value: complaints.filter(
            (c) => c.status === "Taking Action"
          ).length,
          icon: <FaSpinner />,
        },
        {
          title: "Solved",
          value: complaints.filter(
            (c) => c.status === "Solved"
          ).length,
          icon: <FaCheckCircle />,
        },
        {
  title: "Area",
  value: "01",
  icon: <FaUserShield />,
},
      ].map((item) => (
        <div
          key={item.title}
          className={`
            rounded-2xl
            p-5
            aspect-square
            flex
            flex-col
            items-center
            justify-center
            text-center
            shadow-lg
            transition-all
            hover:-translate-y-1
            ${cardClass}
          `}
        >
          <div className="text-orange-500 text-4xl mb-3">
            {item.icon}
          </div>

          <h3
            className={`text-3xl font-black ${
              darkMode
                ? "text-white"
                : "text-dark"
            }`}
          >
            {item.value}
          </h3>

          <p
            className={`mt-2 text-xs font-black uppercase tracking-wider ${
              darkMode
                ? "text-white/60"
                : "text-dark/50"
            }`}
          >
            {item.title}
          </p>
        </div>
      ))}
    </div>

    {/* QUICK SUMMARY */}
    <div
      className={`
        rounded-[24px]
        overflow-hidden
        shadow-lg
        border
        ${panelClass}
      `}
    >
      <div
        className={`px-6 py-4 font-black ${
          darkMode
            ? "bg-white/10 text-white"
            : "bg-orange-50 text-orange-600"
        }`}
      >
        System Operations Summary
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">

        {/* NORMAL COMPLAINTS */}
        <div
          className={`rounded-2xl border p-5 ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white border-orange-100"
          }`}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-black text-orange-600">
              Complaints
            </h3>

            <span className="text-xs font-black px-3 py-1 rounded-full bg-orange-50 text-orange-600">
              Total: {complaints.length}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <MiniBox
              title="New"
              value={
                complaints.filter(
                  (c) => c.status === "Submitted"
                ).length
              }
              color="text-orange-600"
            />

            <MiniBox
              title="Active"
              value={
                complaints.filter(
                  (c) =>
                    c.status === "Reviewed" ||
                    c.status === "Taking Action"
                ).length
              }
              color="text-blue-600"
            />

            <MiniBox
              title="Solved"
              value={
                complaints.filter(
                  (c) => c.status === "Solved"
                ).length
              }
              color="text-green-600"
            />
          </div>

          <button
            onClick={() =>
              setActiveTab("complaints")
            }
            className="w-full border border-orange-500 text-orange-600 py-2 rounded-md text-sm font-black hover:bg-orange-500 hover:text-white transition"
          >
            Manage Complaints
          </button>
        </div>

        {/* SOS */}
        <div
          className={`rounded-2xl border p-5 ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white border-orange-100"
          }`}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-black text-orange-600">
              SOS Complaints
            </h3>

            <span className="text-xs font-black px-3 py-1 rounded-full bg-orange-50 text-orange-600">
              Total: {sosComplaints.length}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            <MiniBox
              title="New"
              value={
                sosComplaints.filter(
                  (sos) =>
                    sos.status === "Submitted"
                ).length
              }
              color="text-orange-600"
            />

            <MiniBox
              title="Active"
              value={
                sosComplaints.filter(
                  (sos) =>
                    sos.status === "Reviewed" ||
                    sos.status === "Taking Action"
                ).length
              }
              color="text-blue-600"
            />

            <MiniBox
              title="Solved"
              value={
                sosComplaints.filter(
                  (sos) =>
                    sos.status === "Solved"
                ).length
              }
              color="text-green-600"
            />
          </div>

          <button
            onClick={() =>
              setActiveTab("sos")
            }
            className="w-full border border-orange-500 text-orange-600 py-2 rounded-md text-sm font-black hover:bg-orange-500 hover:text-white transition"
          >
            Manage SOS
          </button>
        </div>

      </div>
    </div>
  </>
)}

          {/* PLACEHOLDERS FOR NEXT STEP */}
          {activeTab !== "overview" && (
            <div className={`${panelClass} rounded-[24px] p-8 shadow-card`}>
              <h2 className="text-2xl font-black text-orange-600 mb-3">
                {activeTab === "complaints" && ( <ComplaintManagementAuthority darkMode={darkMode} panelClass={panelClass} /> )}
                {activeTab === "sos" && (<SosComplaintsAuthority darkMode={darkMode} panelClass={panelClass}/>)}
                {activeTab === "reports" && (<ReportsAuthority
  darkMode={darkMode}
  panelClass={panelClass}
  complaints={complaints}
  sosComplaints={sosComplaints}
/>)}
                {/* {activeTab === "notifications" && (<NotificationsAuthority darkMode={darkMode} panelClass={panelClass} />)} */}
                {activeTab === "account" && (<AccountAuthority darkMode={darkMode}panelClass={panelClass}user={user}/>)}
              </h2>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function MiniBox({ title, value, color }) {
  return (
    <div className="rounded-xl p-4 text-center border bg-white border-gray-100">
      <h4 className={`text-2xl font-black ${color}`}>{value}</h4>
      <p className={`mt-1 text-[10px] font-black uppercase ${color}`}>
        {title}
      </p>
    </div>
  );
}

export default AuthorityDashboard;