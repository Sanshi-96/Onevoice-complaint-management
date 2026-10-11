import { useState } from "react";
import {
  FaBell,
  FaCheck,
  FaTrash,
  FaEye,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

function NotificationsAuthority({ darkMode, panelClass }) {
  const AUTH_COLOR = "#F97316";

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      badge: "New",
      title: "New Complaint Assigned",
      message:
        "A new municipal complaint CMP001 has been assigned to your Colombo authority area.",
      time: "5 mins ago",
      type: "new",
      read: false,
    },
    {
      id: 2,
      badge: "SOS",
      title: "SOS Alert Received",
      message: "Emergency SOS request SOS001 requires immediate attention.",
      time: "12 mins ago",
      type: "sos",
      read: false,
    },
    {
      id: 3,
      badge: "Update",
      title: "Complaint Status Updated",
      message: "Complaint CMP003 status changed to Taking Action.",
      time: "1 hour ago",
      type: "update",
      read: false,
    },
    {
      id: 4,
      badge: "Reply",
      title: "Citizen Reply Received",
      message: "Citizen added additional details for complaint CMP002.",
      time: "3 hours ago",
      type: "message",
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

  const getIcon = (type) => {
    if (type === "sos") return <FaExclamationTriangle />;
    return <FaBell />;
  };

  return (
    <div className={`${panelClass} rounded-[28px] p-6 shadow-card`}>
      {/* TOP BAR */}
      <div
        className={`rounded-2xl p-6 mb-7 ${
          darkMode ? "bg-white/10" : "bg-orange-50"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="text-3xl font-black flex items-center gap-3">
              <FaBell style={{ color: AUTH_COLOR }} />
              Notifications
            </h2>
            <p className="mt-2 opacity-70 text-sm font-bold">
              Track assigned complaints, SOS alerts, citizen replies, and
              authority response updates in one place.
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
              className="border border-red-500 text-red-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-red-50 transition"
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
              key={item.id}
              className={`
                border-2
                rounded-xl
                p-5
                transition
                ${
                  item.read
                    ? darkMode
                      ? "border-white/10 bg-white/5"
                      : "border-gray-200 bg-white"
                    : darkMode
                    ? "border-orange-500 bg-white/10"
                    : "border-orange-500 bg-white"
                }
              `}
            >
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-full text-white flex items-center justify-center"
                    style={{ backgroundColor: AUTH_COLOR }}
                  >
                    {getIcon(item.type)}
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className="text-white text-[10px] px-3 py-1 rounded-md font-black"
                        style={{ backgroundColor: AUTH_COLOR }}
                      >
                        {item.badge}
                      </span>

                      <h3 className="font-black text-lg">{item.title}</h3>
                    </div>

                    <p className="text-sm opacity-70">{item.message}</p>

                    <button
                      className="mt-4 text-white px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 hover:opacity-90 transition"
                      style={{ backgroundColor: AUTH_COLOR }}
                    >
                      <FaEye />
                      View Details
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-xs opacity-60 flex items-center gap-2 whitespace-nowrap mt-1">
                    <FaClock />
                    {item.time}
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => markAsRead(item.id)}
                      className="w-9 h-9 rounded-md border border-green-400 text-green-600 flex items-center justify-center hover:bg-green-50 transition"
                      title="Mark as read"
                    >
                      <FaCheck />
                    </button>

                    <button
                      onClick={() => deleteNotification(item.id)}
                      className="w-9 h-9 rounded-md border border-red-500 text-red-600 flex items-center justify-center hover:bg-red-50 transition"
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

export default NotificationsAuthority;