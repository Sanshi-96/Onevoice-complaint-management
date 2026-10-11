import { useEffect, useState } from "react";
import API from "../services/api";
import {
  FaExclamationTriangle,
  FaSyncAlt,
  FaFilter,
  FaTimes,
  FaEye,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaInfoCircle,
  FaList,
  FaUser,
} from "react-icons/fa";

function SosComplaintsAuthority({ darkMode, panelClass }) {
  const AUTH_COLOR = "#F97316";
  const [selectedSos, setSelectedSos] = useState(null);
  const [sosComplaints, setSosComplaints] =
  useState([]);

const [loading, setLoading] =
  useState(true);

  const STATUS_OPTIONS = [
    { value: "Submitted", dot: "🔵" },
    { value: "Reviewed", dot: "🟡" },
    { value: "Taking Action", dot: "🟠" },
    { value: "Solved", dot: "🟢" },
    { value: "Closed", dot: "⚫" },
  ];

  const [statusFilter, setStatusFilter] = useState("All Status");
  const [levelFilter, setLevelFilter] = useState("All Levels");
  const [areaFilter, setAreaFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  const [sosList, setSosList] = useState([
    {
      id: "SOS001",
      type: "Women/Child Safety",
      date: "2026-05-22 11:45 AM",
      name: "Priya",
      contact: "+94 77 123 4567",
      location: "Colombo 03",
      message: "Urgent help needed near the main road.",
      level: "Critical",
      status: "Submitted",
      remark: "Immediate response needed",
    },
    {
      id: "SOS002",
      type: "Public Safety",
      date: "2026-05-22 12:10 PM",
      name: "Ahilan Ajay",
      contact: "+94 75 683 8642",
      location: "Colombo 05",
      message: "Unsafe situation near the bus stand.",
      level: "High",
      status: "Reviewed",
      remark: "Police station informed",
    },
    {
      id: "SOS003",
      type: "Disaster Response",
      date: "2026-05-23 09:30 AM",
      name: "Niroshan",
      contact: "+94 71 234 5678",
      location: "Colombo 07",
      message: "Heavy water level near the lowland area.",
      level: "Critical",
      status: "Taking Action",
      remark: "Emergency unit assigned",
    },
    {
      id: "SOS004",
      type: "Criminal Incident",
      date: "2026-05-23 10:15 AM",
      name: "Thiru Kumaran",
      contact: "+94 72 312 1234",
      location: "Colombo 10",
      message: "Suspicious activity reported near public area.",
      level: "High",
      status: "Reviewed",
      remark: "Area authority notified",
    },
    {
      id: "SOS005",
      type: "Public Safety",
      date: "2026-05-24 08:30 AM",
      name: "Janani",
      contact: "+94 76 908 4421",
      location: "Colombo 12",
      message: "Need urgent public safety assistance.",
      level: "Medium",
      status: "Solved",
      remark: "Issue solved",
    },
  ]);

  const updateSosStatus = (id, value) => {
  setSosComplaints((prev) =>
    prev.map((item) =>
      item._id === id
        ? {
            ...item,
            status: value,
            statusChanged: true,
          }
        : item
    )
  );

  if (selectedSos?._id === id) {
    setSelectedSos((prev) => ({
      ...prev,
      status: value,
      statusChanged: true,
    }));
  }
};

  const filteredSos = sosList.filter((item) => {
    const matchStatus =
      statusFilter === "All Status" || item.status === statusFilter;

    const matchLevel =
      levelFilter === "All Levels" || item.level === levelFilter;

    const matchArea =
      areaFilter.trim() === "" ||
      item.location.toLowerCase().includes(areaFilter.toLowerCase());

    const matchSearch =
      searchText.trim() === "" ||
      item.type.toLowerCase().includes(searchText.toLowerCase()) ||
      item.message.toLowerCase().includes(searchText.toLowerCase()) ||
      item.name.toLowerCase().includes(searchText.toLowerCase());

    return matchStatus && matchLevel && matchArea && matchSearch;
  });

  const levelClass = (level) => {
    if (level === "Critical") return "bg-red-100 text-red-700";
    if (level === "High") return "bg-yellow-100 text-yellow-700";
    return "bg-blue-100 text-blue-700";
  };

  const fetchAssignedSOS = async () => {
  try {
    setLoading(true);

    const token =
      localStorage.getItem("token");

    const res = await API.get(
      "/sos/assigned",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "🚨 ASSIGNED SOS COMPLAINTS:",
      res.data.sosComplaints
    );

    setSosComplaints(
      res.data.sosComplaints || []
    );

  } catch (error) {
    console.error(
      "❌ Failed to fetch assigned SOS:",
      error
    );

    console.error(
      "Server response:",
      error.response?.data
    );

    setSosComplaints([]);

  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchAssignedSOS();
}, []);

const handleUpdateSos = async (sos) => {
  try {
    const token =
      localStorage.getItem("token");

    const res = await API.patch(
      `/sos/${sos._id}/status`,
      {
        status: sos.status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedSos =
      res.data.sosComplaint;

    setSosComplaints((prev) =>
      prev.map((item) =>
        item._id === updatedSos._id
          ? {
              ...updatedSos,
              statusChanged: false,
            }
          : item
      )
    );

    if (
      selectedSos?._id ===
      updatedSos._id
    ) {
      setSelectedSos({
        ...updatedSos,
        statusChanged: false,
      });
    }

    alert(
      "SOS status updated successfully."
    );

  } catch (error) {
    console.error(
      "❌ Failed to update SOS status:",
      error
    );

    alert(
      error.response?.data?.message ||
        "Failed to update SOS status."
    );
  }
};

  return (
    <div className={`${panelClass} rounded-[24px] p-5 shadow-card`}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-black flex items-center gap-3">
          <FaExclamationTriangle style={{ color: AUTH_COLOR }} />
          Assigned SOS Complaints
        </h2>

        <button
          onClick={() => alert("Assigned SOS data refreshed")}
          className="border px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-orange-50 transition"
          style={{ borderColor: AUTH_COLOR, color: AUTH_COLOR }}
        >
          <FaSyncAlt />
          Refresh
        </button>
      </div>

      <div
        className={`rounded-xl p-4 mb-5 border ${
          darkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-bold block mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-dark outline-none"
            >
              <option>All Status</option>
              {STATUS_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.dot} {item.value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-bold block mb-2">
              Emergency Level
            </label>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-dark outline-none"
            >
              <option>All Levels</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-bold block mb-2">Area / City</label>
            <input
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              placeholder="e.g., Colombo 03"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-dark outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-bold block mb-2">Search</label>
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search type, citizen or message..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-dark outline-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            className="text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2"
            style={{ backgroundColor: AUTH_COLOR }}
          >
            <FaFilter />
            Apply Filters
          </button>

          <button
            onClick={() => {
              setStatusFilter("All Status");
              setLevelFilter("All Levels");
              setAreaFilter("");
              setSearchText("");
            }}
            className="border border-gray-300 text-dark px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 bg-white"
          >
            <FaTimes />
            Clear Filters
          </button>
        </div>
      </div>

      <div
        className={`rounded-xl overflow-hidden border ${
          darkMode ? "border-white/10" : "border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="font-black text-lg flex items-center gap-2">
            <FaList />
            Recent Assigned SOS
          </h3>

          <span
            className="text-white px-3 py-1 rounded-full text-xs font-black"
            style={{ backgroundColor: AUTH_COLOR }}
          >
            {filteredSos.length} Total
          </span>
        </div>

        <div className="overflow-x-auto max-h-[360px] overflow-y-auto">
          <table className="w-full min-w-[1050px] text-sm">
            <thead
  className={
    darkMode
      ? "bg-white/10"
      : "bg-gray-100"
  }
>
  <tr>
    <th className="py-3 px-4 text-left">
      SOS ID
    </th>

    <th className="py-3 px-4 text-left">
      Location
    </th>

    <th className="py-3 px-4 text-left">
      Emergency Type
    </th>

    <th className="py-3 px-4 text-left">
      Citizen
    </th>

    <th className="py-3 px-4 text-left">
      Contact
    </th>

    <th className="py-3 px-4 text-left">
      Status
    </th>

    <th className="py-3 px-4 text-center">
      Action
    </th>
  </tr>
</thead>

            <tbody>
  {loading ? (
    <tr>
      <td
        colSpan="7"
        className="py-10 text-center font-bold"
      >
        Loading assigned SOS complaints...
      </td>
    </tr>
  ) : sosComplaints.length === 0 ? (
    <tr>
      <td
        colSpan="7"
        className="py-10 text-center font-bold opacity-60"
      >
        No SOS complaints assigned to you.
      </td>
    </tr>
  ) : (
    sosComplaints.map((item) => (
      <tr
        key={item._id}
        className={`border-t ${
          darkMode
            ? "border-white/10 hover:bg-white/5"
            : "border-gray-200 hover:bg-red-50"
        }`}
      >
        {/* SOS ID */}
        <td className="py-3 px-4 font-black">
          {item.sosId || "-"}
        </td>

        {/* LOCATION */}
        <td className="py-3 px-4">
          <div className="flex flex-col gap-1">

            <div className="flex items-center gap-2 font-bold">
              <FaMapMarkerAlt
                style={{
                  color: "#C00000",
                }}
              />

              <span>
                {item.location?.latitude ??
                  "-"}
                ,{" "}
                {item.location?.longitude ??
                  "-"}
              </span>
            </div>

            {item.location?.latitude != null &&
              item.location?.longitude != null && (
                <a
                  href={`https://www.google.com/maps?q=${item.location.latitude},${item.location.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 text-xs font-bold hover:underline ml-7"
                >
                  Open Map
                </a>
              )}

          </div>
        </td>

        {/* EMERGENCY TYPE */}
        <td className="py-3 px-4 font-bold">
          {item.category || "-"}
        </td>

        {/* CITIZEN */}
        <td className="py-3 px-4">
          <div className="font-bold">
            {item.name ||
              item.citizen?.fullName ||
              "-"}
          </div>
        </td>

        {/* CONTACT */}
        <td className="py-3 px-4">
          <div className="font-bold">
            {item.phone ||
              item.citizen?.phone ||
              "-"}
          </div>

          <div className="text-xs opacity-60">
            {item.email ||
              item.citizen?.email ||
              "-"}
          </div>
        </td>

        {/* STATUS */}
        <td className="py-3 px-4">
          <select
            value={
              item.status || "Submitted"
            }
            onChange={(e) =>
              updateSosStatus(
                item._id,
                e.target.value
              )
            }
            className="border border-gray-300 rounded-full px-3 py-2 text-sm bg-white text-dark outline-none"
          >
            {STATUS_OPTIONS.map(
              (status) => (
                <option
                  key={status.value}
                  value={status.value}
                >
                  {status.dot}{" "}
                  {status.value}
                </option>
              )
            )}
          </select>
        </td>

        {/* ACTION */}
        <td className="py-3 px-4">
          <div className="flex items-center justify-center gap-2">

            <button
              onClick={() =>
                handleUpdateSos(item)
              }
              disabled={!item.statusChanged}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                item.statusChanged
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Update
            </button>

            <button
              onClick={() =>
                setSelectedSos(item)
              }
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
            >
              <FaEye />
              View
            </button>

          </div>
        </td>
      </tr>
    ))
  )}
</tbody>
          </table>
        </div>
      </div>

      <div
        className={`mt-5 rounded-xl p-5 border ${
          selectedSos
            ? darkMode
              ? "bg-white/5 border-white/10"
              : "bg-orange-50 border-orange-100 text-dark"
            : "bg-cyan-50 border-cyan-100 text-cyan-900"
        }`}
      >
        {selectedSos && (
  <div
    className={`relative mt-5 rounded-xl border p-5 ${
      darkMode
        ? "bg-white/5 border-white/10 text-white"
        : "bg-white border-gray-200 text-dark"
    }`}
  >
    {/* CLOSE BUTTON */}
    <button
      onClick={() => setSelectedSos(null)}
      className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition shadow-md"
    >
      Close
    </button>

    {/* TITLE */}
    <div className="pr-24 mb-5">
      <h2 className="text-lg font-black">
        SOS Complaint Details
      </h2>

      <p className="text-xs opacity-60 mt-1">
        Complete emergency complaint information
      </p>
    </div>

    {/* BASIC DETAILS */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <div>
        <p className="text-xs font-bold opacity-60">
          SOS ID
        </p>

        <p className="text-sm font-bold mt-1">
          {selectedSos.sosId || "-"}
        </p>
      </div>

      <div>
        <p className="text-xs font-bold opacity-60">
          Emergency Category
        </p>

        <p className="text-sm font-bold mt-1">
          {selectedSos.category || "-"}
        </p>
      </div>

      <div>
        <p className="text-xs font-bold opacity-60">
          Status
        </p>

        <p className="text-sm font-bold mt-1">
          {selectedSos.status || "-"}
        </p>
      </div>

      <div>
        <p className="text-xs font-bold opacity-60">
          Date Submitted
        </p>

        <p className="text-sm font-medium mt-1">
          {selectedSos.createdAt
            ? new Date(
                selectedSos.createdAt
              ).toLocaleString()
            : "-"}
        </p>
      </div>

    </div>

    {/* DIVIDER */}
    <div className="border-t border-gray-200/30 my-5" />

    {/* CITIZEN DETAILS */}
    <div>
      <h3 className="text-sm font-black mb-3">
        Citizen Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div>
          <p className="text-xs font-bold opacity-60">
            Name
          </p>

          <p className="text-sm font-medium mt-1">
            {selectedSos.name ||
              selectedSos.citizen?.fullName ||
              "-"}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold opacity-60">
            Email
          </p>

          <p className="text-sm font-medium mt-1 break-all">
            {selectedSos.email ||
              selectedSos.citizen?.email ||
              "-"}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold opacity-60">
            Phone / WhatsApp
          </p>

          <p className="text-sm font-medium mt-1">
            {selectedSos.phone ||
              selectedSos.citizen?.phone ||
              "-"}
          </p>
        </div>

      </div>
    </div>

    {/* DIVIDER */}
    <div className="border-t border-gray-200/30 my-5" />

    {/* LOCATION DETAILS */}
    <div>
      <h3 className="text-sm font-black mb-3">
        Location Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <p className="text-xs font-bold opacity-60">
            Street / Area
          </p>

          <p className="text-sm font-medium mt-1">
            {selectedSos.location?.street ||
              "-"}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold opacity-60">
            City
          </p>

          <p className="text-sm font-medium mt-1">
            {selectedSos.location?.city ||
              "-"}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold opacity-60">
            District
          </p>

          <p className="text-sm font-medium mt-1">
            {selectedSos.location?.district ||
              "-"}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold opacity-60">
            Province
          </p>

          <p className="text-sm font-medium mt-1">
            {selectedSos.location?.province ||
              "-"}
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="text-xs font-bold opacity-60">
            Full Address
          </p>

          <p className="text-sm font-medium mt-1">
            {selectedSos.location?.fullAddress ||
              "-"}
          </p>
        </div>

      </div>

      {/* GPS LOCATION */}
      <div className="mt-4 p-4 rounded-lg border border-gray-200/30">

        <p className="text-sm font-bold mb-2">
          📍 GPS Location
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <p className="text-sm">
            <span className="font-bold">
              Latitude:
            </span>{" "}
            {selectedSos.location?.latitude ??
              "-"}
          </p>

          <p className="text-sm">
            <span className="font-bold">
              Longitude:
            </span>{" "}
            {selectedSos.location?.longitude ??
              "-"}
          </p>

        </div>

        {selectedSos.location?.latitude != null &&
          selectedSos.location?.longitude != null && (
            <a
              href={`https://www.google.com/maps?q=${selectedSos.location.latitude},${selectedSos.location.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold text-xs transition"
            >
              📍 Open Location in Google Maps
            </a>
          )}

      </div>
    </div>

    {/* DIVIDER */}
    <div className="border-t border-gray-200/30 my-5" />

    {/* DESCRIPTION */}
    <div>
      <h3 className="text-sm font-black mb-3">
        Emergency Description
      </h3>

      <div className="rounded-lg border border-gray-200/30 p-4">
        <p className="text-sm leading-6">
          {selectedSos.description ||
            "No description provided."}
        </p>
      </div>
    </div>

    {/* DIVIDER */}
    <div className="border-t border-gray-200/30 my-5" />

    {/* ASSIGNED AUTHORITY */}
    <div>
      <h3 className="text-sm font-black mb-3">
        Assigned Authority
      </h3>

      {selectedSos.assignedAuthority ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <p className="text-xs font-bold opacity-60">
              Name
            </p>

            <p className="text-sm font-medium mt-1">
              {selectedSos.assignedAuthority
                ?.fullName || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold opacity-60">
              Email
            </p>

            <p className="text-sm font-medium mt-1 break-all">
              {selectedSos.assignedAuthority
                ?.email || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold opacity-60">
              Phone
            </p>

            <p className="text-sm font-medium mt-1">
              {selectedSos.assignedAuthority
                ?.phone || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold opacity-60">
              Department
            </p>

            <p className="text-sm font-medium mt-1">
              {selectedSos.assignedAuthority
                ?.department || "-"}
            </p>
          </div>

        </div>
      ) : (
        <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-yellow-800">
          <p className="text-sm font-bold">
            No authority has been assigned yet.
          </p>
        </div>
      )}
    </div>

    {/* DIVIDER */}
    <div className="border-t border-gray-200/30 my-5" />

    {/* EVIDENCE IMAGES */}
    <div>
      <h3 className="text-sm font-black mb-3">
        Evidence Images
      </h3>

      {selectedSos.evidenceImages?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">

          {selectedSos.evidenceImages.map(
            (imagePath, index) => {
              const imageUrl =
                imagePath.startsWith("http")
                  ? imagePath
                  : `http://localhost:5000${imagePath}`;

              return (
                <div
                  key={`${imagePath}-${index}`}
                  className="rounded-lg overflow-hidden border border-gray-200/30"
                >
                  <img
                    src={imageUrl}
                    alt={`SOS evidence ${index + 1}`}
                    className="w-full h-52 object-cover"
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

  </div>
)}
      </div>
    </div>
  );
}

export default SosComplaintsAuthority;