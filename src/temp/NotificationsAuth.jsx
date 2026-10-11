function NotificationsAuth({ darkMode, panelClass }) {
  const notifications = [
    {
      id: 1,
      title: "New Complaint Assigned",
      message:
        "A new municipal complaint has been assigned to your authority area.",
      time: "5 mins ago",
      type: "new",
    },
    {
      id: 2,
      title: "SOS Alert Received",
      message:
        "An emergency SOS complaint requires immediate attention.",
      time: "12 mins ago",
      type: "sos",
    },
    {
      id: 3,
      title: "Complaint Status Updated",
      message:
        "Complaint CMP001 status changed to Taking Action.",
      time: "1 hour ago",
      type: "update",
    },
    {
      id: 4,
      title: "Citizen Reply Received",
      message:
        "Citizen added additional details for complaint CMP003.",
      time: "3 hours ago",
      type: "message",
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "new":
        return "📌";
      case "sos":
        return "🚨";
      case "update":
        return "🔄";
      case "message":
        return "💬";
      default:
        return "🔔";
    }
  };

  return (
    <div className={`${panelClass} rounded-[28px] p-6 shadow-card`}>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black">Notifications</h2>

        <button className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-red-800 transition">
          Mark all as read
        </button>
      </div>

      <div className="space-y-5">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl p-5 flex items-start gap-5 transition ${
              darkMode
                ? "bg-white/10 hover:bg-white/15"
                : "bg-[#e0e0e0] hover:bg-red-50"
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
              {getIcon(item.type)}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-black">{item.title}</h3>

                <span className="text-xs opacity-50 whitespace-nowrap">
                  {item.time}
                </span>
              </div>

              <p className="mt-2 text-sm opacity-70 leading-relaxed">
                {item.message}
              </p>

              <div className="flex gap-3 mt-4">
                <button className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-800 transition">
                  View
                </button>

                <button
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                    darkMode
                      ? "bg-white/10 hover:bg-white/20"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationsAuth;