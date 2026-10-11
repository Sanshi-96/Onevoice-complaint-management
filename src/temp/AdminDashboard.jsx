import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ComplaintManagementAuth from "./ComplaintManagementAuth";
import SosComplaintsAuth from "./SosComplaintsAuth";
import ReportsAuth from "./ReportsAuth";
import AdminNotifications from "./AdminNotifications";
import UserManagementAdmin from "./UserManagementAdmin";
import AccountAdmin from "./AccountAdmin";
import API from "../services/api";
import {
  FaClipboardList,
  FaExclamationTriangle,
  FaUsers,
  FaCheckCircle,
  FaUser,
  FaUserShield,
  FaBars,
  FaSyncAlt,
  FaHome,
  FaChartPie,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaSpinner,
} from "react-icons/fa";



function AdminDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [activeTab, setActiveTab] =
    useState("overview");

  const [darkMode, setDarkMode] =
    useState(false);

  const [complaints, setComplaints] =
    useState([]);

  const [sosComplaints, setSosComplaints] =
    useState([]);

  const [authorities, setAuthorities] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [selectedComplaint, setSelectedComplaint] =
    useState(null);

  const [selectedSos, setSelectedSos] =
    useState(null);

  

  

  const STATUS_OPTIONS = [
    { value: "Submitted", dot: "🔵" },
    { value: "Reviewed", dot: "🟡" },
    { value: "Taking Action", dot: "🟠" },
    { value: "Solved", dot: "🟢" },
    { value: "Closed", dot: "⚫" },
  ];

  

  // const [complaints, setComplaints] = useState([]);

 

  // const [sosComplaints, setSosComplaints] = useState([
  //   {
  //     id: "SOS001",
  //     type: "Women/Child Safety",
  //     date: "2026-05-22 11:45 AM",
  //     name: "Citizen User",
  //     contact: "+94 77 123 4567",
  //     location: "Colombo 03, Colombo, Western",
  //     message: "Urgent help needed near the main road.",
  //     level: "High",
  //     remark: "Need immediate response",
  //     status: "Submitted",
  //   },
  // ]);

  

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const updateField = (id, field, value) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );

    if (selectedComplaint?.id === id) {
      setSelectedComplaint((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleUpdateComplaint = async (complaint) => {
  try {

    const token = localStorage.getItem("token");

    await API.patch(
      `/complaints/${complaint._id}/assign`,
      {
        authorityId:
          complaint.assignedAuthority?._id,

        priority:
          complaint.priority,

        status:
          complaint.status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Complaint updated successfully.");

    fetchComplaints();

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to update complaint."
    );

  }
};

  const updateSosField = (id, field, value) => {
    setSosComplaints((prev) =>
      prev.map((sos) => (sos.id === id ? { ...sos, [field]: value } : sos))
    );

    if (selectedSos?.id === id) {
      setSelectedSos((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleUpdateSos = async (sos) => {
    alert(`SOS complaint ${sos.id} updated successfully`);
  };

  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = async () => {
  try {
    setRefreshing(true);

    await Promise.all([
      fetchComplaints(),
      fetchSOSComplaints(),
      fetchAuthorities(),
      // fetchUsers(), // add this when your users fetch function is ready
    ]);

    alert("Data refreshed successfully");

  } catch (error) {
    console.error(
      "❌ Failed to refresh admin data:",
      error
    );

    alert("Failed to refresh data.");

  } finally {
    setRefreshing(false);
  }
};

  const fetchComplaints = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get(
      "/complaints",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setComplaints(res.data.complaints);

  } catch (error) {
    console.log(error);
  }
};

const fetchSOSComplaints = async () => {
  try {
    const token =
      localStorage.getItem("token");

    const res = await API.get(
      "/sos",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "🚨 ADMIN SOS:",
      res.data.sosComplaints
    );

    setSosComplaints(
      res.data.sosComplaints || []
    );

  } catch (error) {
    console.error(
      "❌ Failed to fetch admin SOS:",
      error.response?.data ||
        error.message
    );
  }
};

const fetchUsers = async () => {
  try {
    const token =
      localStorage.getItem("token");

    const res = await API.get(
      "/users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "👥 ADMIN USERS:",
      res.data.users
    );

    setUsers(
      res.data.users || []
    );

  } catch (error) {
    console.error(
      "❌ Failed to fetch users:",
      error.response?.data ||
        error.message
    );
  }
};

useEffect(() => {
  fetchComplaints();
  fetchSOSComplaints();
  fetchAuthorities();
  fetchUsers();
}, []);

const fetchAuthorities = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get(
      "/users/authorities",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAuthorities(res.data.authorities);

  } catch (error) {
    console.log(error);
  }
};


  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const sidebarBtn = (tab) =>
    activeTab === tab
      ? "bg-primary text-white shadow-lg"
      : darkMode
      ? "bg-white/10 text-white/70 hover:bg-primary hover:text-white"
      : "bg-[#d5cfcf] text-dark/70 hover:bg-primary hover:text-white";

  const cardClass = darkMode
    ? "bg-[#202020] text-white border border-white/10"
    : "bg-[#e0e0e0] text-dark";

  const panelClass = darkMode
    ? "bg-[#202020] text-white border border-white/10"
    : "bg-white text-dark";

  const selectClass = darkMode
    ? "bg-[#2e2e2e] text-white border border-white/20 rounded-lg px-2 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
    : "bg-gray-100 text-dark border border-gray-300 rounded-lg px-2 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary";

  const inputClass = darkMode
    ? "bg-[#2e2e2e] text-white border border-white/20 rounded-lg px-2 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
    : "bg-gray-100 text-dark border border-gray-300 rounded-lg px-2 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary";

    console.log(complaints); // suma

    

  return (
    <div className={`w-screen min-h-screen p-4 font-lato ${darkMode ? "bg-black" : "bg-[#1f1f1f]"}`}>
      <div
        className={`w-full min-h-[calc(100vh-32px)] grid ${
          sidebarCollapsed ? "grid-cols-[92px_1fr]" : "grid-cols-[290px_1fr]"
        } transition-all duration-300 ${
          darkMode ? "bg-[#141414] text-white" : "bg-white text-dark"
        }`}
      >
       <aside
  className={`rounded-r-[34px] p-5 flex flex-col justify-between transition-all duration-300 ${
    sidebarCollapsed ? "w-[92px]" : "w-[290px]"
  } bg-gradient-to-b from-[#8d0000] via-[#b40000] to-[#620000] text-white shadow-2xl`}
>
  <div>
    {/* TOP BUTTONS */}
    <div className="flex items-center justify-between mb-8">
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="w-11 h-11 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition shadow-lg"
      >
        <FaBars size={18} />
      </button>

      {!sidebarCollapsed && (
        <button
          onClick={handleRefresh}
          className="w-11 h-11 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition shadow-lg"
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
      <rect width="200" height="200" fill="#FFF5F5" />
      <circle cx="100" cy="72" r="34" fill="#B80000" opacity="0.18" />
      <circle cx="100" cy="68" r="26" fill="#141414" />
      <path d="M74 70c8 10 44 10 52 0v18c0 18-12 34-26 34S74 106 74 88V70z" fill="#F2B28D" />
      <path d="M72 64c6-28 50-32 58 0-12-10-44-10-58 0z" fill="#141414" />
      <path d="M55 170c6-32 26-48 45-48s39 16 45 48H55z" fill="#B80000" />
      <path d="M76 170v-32l24 18 24-18v32H76z" fill="#FFFFFF" />
      <path d="M90 134h20l-10 22-10-22z" fill="#141414" />
      <circle cx="152" cy="52" r="22" fill="#B80000" />
      <path d="M142 52l7 7 14-15" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  </div>
</div>

    {!sidebarCollapsed && (
  <div className="text-center mb-8">
    <h3 className="font-bold text-lg">
      {user?.fullName || "Administrator"}
    </h3>

    <p className="text-xs text-red-100 mt-1">
      Admin
    </p>

    <div className="mt-3 inline-flex items-center gap-2 bg-white/15 px-4 py-1 rounded-full text-xs">
      <span className="w-2 h-2 rounded-full bg-green-400"></span>
      Online
    </div>
  </div>
)}

    {/* MENUS */}

    <div className="space-y-3">

      {[
        ["overview","Dashboard",FaHome],
        ["complaints","All Complaints",FaClipboardList],
        ["sos","SOS Complaints",FaExclamationTriangle],
        ["reports","Reports",FaChartPie],
        ["users","User Management",FaUsers],
        ["notifications","Notifications",FaBell],
      ].map(([tab,label,Icon])=>{

        const active=activeTab===tab;

        return(

          <button
            key={tab}
            onClick={()=>setActiveTab(tab)}
            className={`w-full rounded-xl py-3 transition-all flex items-center ${
              sidebarCollapsed
                ? "justify-center"
                : "gap-4 px-4"
            }
            ${
              active
                ? "bg-[#ececec] text-primary shadow-lg"
                : "hover:bg-white/15 text-white"
            }`}
          >

            <Icon
              size={18}
              className={`${
                active
                  ? "text-primary"
                  : "text-[#ffb0b0]"
              }`}
            />

            {!sidebarCollapsed && (
              <span className="font-semibold">
                {label}
              </span>
            )}

          </button>

        );

      })}
    </div>

    {/* ACCOUNT */}

    <div className="border-t border-white/20 mt-8 pt-5 space-y-3">

      <button
        onClick={()=>setActiveTab("account")}
        className={`w-full rounded-xl py-3 transition-all flex items-center ${
          sidebarCollapsed
            ? "justify-center"
            : "gap-4 px-4"
        }
        ${
          activeTab==="account"
            ? "bg-[#ececec] text-primary shadow-lg"
            : "hover:bg-white/15 text-white"
        }`}
      >

        <FaUserCircle
          size={18}
          className={
            activeTab==="account"
              ? "text-primary"
              : "text-[#ffb0b0]"
          }
        />

        {!sidebarCollapsed && (
          <span className="font-semibold">
            Account
          </span>
        )}

      </button>

      <button
        onClick={()=>navigate("/admin/logout")}
        className={`w-full rounded-xl py-3 transition-all flex items-center ${
          sidebarCollapsed
            ? "justify-center"
            : "gap-4 px-4"
        } hover:bg-white/15`}
      >

        <FaSignOutAlt
          size={18}
          className="text-[#ffb0b0]"
        />

        {!sidebarCollapsed && (
          <span className="font-semibold">
            Logout
          </span>
        )}

      </button>

    </div>
  </div>
</aside>

        <main className="p-8 md:p-10 min-w-0">
          <div
  className="
    mb-14
    rounded-[24px]
    bg-gradient-to-r
    from-primary
    via-[#8f1010]
    to-dark
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
      Welcome back, {user?.fullName || "Administrator"}
    </h1>

    <p className="mt-2 text-white/75 text-xs font-bold">
      System monitoring: synchronized with real-time field operations and resource updates.
    </p>
  </div>

  <div className="flex items-center gap-4">
    <div className="bg-white text-primary px-5 py-3 rounded-full text-xs font-black shadow-lg flex items-center gap-2">
      <span>📅</span>
      <span>
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>
    </div>

    <div className="bg-white text-primary px-5 py-3 rounded-full text-xs font-black shadow-lg flex items-center gap-2">
      <span>🕒</span>
      <span>
        {new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>

    <button
      onClick={() => setDarkMode(!darkMode)}
      className="bg-white/15 border border-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-white/25 transition"
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
          title: "Authorities",
          value: users.filter(
            (u) => u.role === "authority"
          ).length,
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

          <div className="text-red-600 text-4xl mb-3">
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


    {/* SYSTEM OPERATIONS SUMMARY */}
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
            : "bg-red-50 text-red-600"
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
              : "bg-white border-red-100"
          }`}
        >

          <div className="flex items-center justify-between mb-5">

            <h3 className="font-black text-red-600">
              All Complaints
            </h3>

            <span className="text-xs font-black px-3 py-1 rounded-full bg-red-50 text-red-600">
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
              color="text-red-600"
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
            className="w-full border border-red-500 text-red-600 py-2 rounded-md text-sm font-black hover:bg-red-500 hover:text-white transition"
          >
            Manage Complaints
          </button>

        </div>


        {/* SOS */}
        <div
          className={`rounded-2xl border p-5 ${
            darkMode
              ? "bg-white/5 border-white/10"
              : "bg-white border-red-100"
          }`}
        >

          <div className="flex items-center justify-between mb-5">

            <h3 className="font-black text-red-600">
              All SOS Complaints
            </h3>

            <span className="text-xs font-black px-3 py-1 rounded-full bg-red-50 text-red-600">
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
              color="text-red-600"
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
            className="w-full border border-red-500 text-red-600 py-2 rounded-md text-sm font-black hover:bg-red-500 hover:text-white transition"
          >
            Manage SOS
          </button>

        </div>

      </div>

    </div>


    {/* USER SUMMARY */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

      <div
        className={`rounded-2xl border p-5 ${
          darkMode
            ? "bg-white/5 border-white/10"
            : "bg-white border-gray-200"
        }`}
      >
        <p className="text-xs font-black uppercase opacity-60">
          Total Users
        </p>

        <h3 className="text-3xl font-black mt-2">
          {users.length}
        </h3>
      </div>


      <div
        className={`rounded-2xl border p-5 ${
          darkMode
            ? "bg-white/5 border-white/10"
            : "bg-white border-gray-200"
        }`}
      >
        <p className="text-xs font-black uppercase opacity-60">
          Citizens
        </p>

        <h3 className="text-3xl font-black mt-2">
          {
            users.filter(
              (u) => u.role === "citizen"
            ).length
          }
        </h3>
      </div>


      <div
        className={`rounded-2xl border p-5 ${
          darkMode
            ? "bg-white/5 border-white/10"
            : "bg-white border-gray-200"
        }`}
      >
        <p className="text-xs font-black uppercase opacity-60">
          Authorities
        </p>

        <h3 className="text-3xl font-black mt-2">
          {
            users.filter(
              (u) => u.role === "authority"
            ).length
          }
        </h3>
      </div>

    </div>
  </>
)}

          {activeTab === "complaints" && (
            <ComplaintManagementAuth
  darkMode={darkMode}
  panelClass={panelClass}

  complaints={complaints}
  setComplaints={setComplaints}

  authorities={authorities}

  selectedComplaint={selectedComplaint}
  setSelectedComplaint={setSelectedComplaint}

  update
  Field={updateField}
  handleUpdateComplaint={handleUpdateComplaint}
/>
          )}

          {activeTab === "sos" && (
            <SosComplaintsAuth
              darkMode={darkMode}
              panelClass={panelClass}
              sosComplaints={sosComplaints}
              selectedSos={selectedSos}
              setSelectedSos={setSelectedSos}
              updateSosField={updateSosField}
              handleUpdateSos={handleUpdateSos}
              STATUS_OPTIONS={STATUS_OPTIONS}
              selectClass={selectClass}
              inputClass={inputClass}
              authorities={authorities}
            />
          )}

          {activeTab === "reports" && (
            <ReportsAuth
  darkMode={darkMode}
  panelClass={panelClass}
  complaints={complaints}
  sosComplaints={sosComplaints}
  authorities={authorities}
  users={users}
/>
          )}

          {activeTab === "users" && (
            <UserManagementAdmin darkMode={darkMode} panelClass={panelClass} />
          )}

          {activeTab === "notifications" && (
            <AdminNotifications darkMode={darkMode} panelClass={panelClass} />
          )}

          {activeTab === "account" && (
            <AccountAdmin darkMode={darkMode} panelClass={panelClass} user={user} />
          )}
        </main>
      </div>
    </div>
  );
}
function MiniBox({ title, value, color }) {
  return (
    <div className="rounded-xl border border-gray-200 p-3 text-center">
      <p className="text-[10px] font-black uppercase opacity-60">
        {title}
      </p>

      <p className={`text-2xl font-black mt-1 ${color}`}>
        {value}
      </p>
    </div>
  );
}

export default AdminDashboard;