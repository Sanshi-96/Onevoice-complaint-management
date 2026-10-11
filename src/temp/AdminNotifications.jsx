import { useEffect, useState } from "react";
import API from "../services/api";
import {
  FaBell,
  FaCheck,
  FaTrash,
  FaEye,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

function AdminNotifications({ darkMode, panelClass }) {
const [notifications, setNotifications] = useState([]);
const [loading, setLoading] = useState(false);

const fetchNotifications = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await API.get("/notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(
      "🔔 ADMIN NOTIFICATIONS:",
      res.data.notifications
    );

    setNotifications(
      res.data.notifications || []
    );

  } catch (error) {
    console.error(
      "❌ Failed to fetch notifications:",
      error.response?.data || error
    );

  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchNotifications();
}, []);


  const markAsRead = async (id) => {
  try {
    const token =
      localStorage.getItem("token");

    await API.patch(
      `/notifications/${id}/read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNotifications((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, isRead: true }
          : item
      )
    );

  } catch (error) {
    console.error(
      "❌ Failed to mark notification as read:",
      error.response?.data || error
    );
  }
};

const markAllRead = async () => {
  try {
    const token =
      localStorage.getItem("token");

    await API.patch(
      "/notifications/read-all",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        isRead: true,
      }))
    );

  } catch (error) {
    console.error(
      "❌ Failed to mark all notifications:",
      error.response?.data || error
    );
  }
};

  const deleteNotification = async (id) => {
  try {
    const token =
      localStorage.getItem("token");

    await API.delete(
      `/notifications/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNotifications((prev) =>
      prev.filter(
        (item) => item._id !== id
      )
    );

  } catch (error) {
    console.error(
      "❌ Failed to delete notification:",
      error.response?.data || error
    );
  }
};

  const deleteAll = async () => {
  try {
    const token =
      localStorage.getItem("token");

    await API.delete(
      "/notifications",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNotifications([]);

  } catch (error) {
    console.error(
      "❌ Failed to delete all notifications:",
      error.response?.data || error
    );
  }
};

  const getIcon = (type) => {
    if (type === "sos") return <FaExclamationTriangle />;
    if (type === "alert") return <FaExclamationTriangle />;
    return <FaBell />;
  };



  return (
    <div className={`${panelClass} rounded-[28px] p-6 shadow-card`}>
      {/* TOP BAR */}
      <div
        className={`rounded-2xl p-6 mb-7 ${
          darkMode ? "bg-white/10" : "bg-red-50"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="text-3xl font-black flex items-center gap-3">
              <FaBell className="text-primary" />
              Notifications
            </h2>
            <p className="mt-2 opacity-70 text-sm font-bold">
              Track system actions, complaint updates, SOS alerts, user changes,
              and authority activity in one place.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={markAllRead}
              className="border border-green-500 text-green-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-green-50 transition"
            >
              <FaCheck />
              Mark All Read
            </button>

            <button
              onClick={deleteAll}
              className="border border-primary text-primary px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-red-50 transition"
            >
              <FaTrash />
              Delete All
            </button>
          </div>
        </div>
      </div>

      {/* NOTIFICATION LIST */}
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
              key={item._id}
              className={`
                border-2
                rounded-xl
                p-5
                transition
                ${
                  item.isRead
                    ? darkMode
                      ? "border-white/10 bg-white/5"
                      : "border-gray-200 bg-white"
                    : darkMode
                    ? "border-primary bg-white/10"
                    : "border-primary bg-white"
                }
              `}
            >
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center">
                    {getIcon(item.type)}
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="bg-primary text-white text-[10px] px-3 py-1 rounded-md font-black">
                        {item.type === "complaint_submitted"
  ? "New"
  : item.type === "complaint_assigned"
  ? "Assigned"
  : item.type === "complaint_updated"
  ? "Update"
  : item.type === "complaint_resolved"
  ? "Solved"
  : "Alert"}
                      </span>

                      <h3 className="font-black text-lg">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-sm opacity-70">
                      {item.message}
                    </p>

                    {/* <button className="mt-4 bg-primary text-white px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 hover:bg-red-800 transition">
                      <FaEye />
                      View Details
                    </button> */}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-xs opacity-60 flex items-center gap-2 whitespace-nowrap mt-1">
                    <FaClock />
                    {new Date(item.createdAt).toLocaleString()}
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => markAsRead(item._id)}
                      className="w-9 h-9 rounded-md border border-green-400 text-green-600 flex items-center justify-center hover:bg-green-50 transition"
                      title="Mark as read"
                    >
                      <FaCheck />
                    </button>

                    <button
                      onClick={() => deleteNotification(item._id)}
                      className="w-9 h-9 rounded-md border border-primary text-primary flex items-center justify-center hover:bg-red-50 transition"
                      title="Delete"
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

export default AdminNotifications;