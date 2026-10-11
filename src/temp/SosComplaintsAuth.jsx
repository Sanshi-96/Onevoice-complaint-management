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
} from "react-icons/fa";

function SosComplaintsAuth({
  darkMode,
  panelClass,
  authorities,
}) {
  const [selectedSos, setSelectedSos] = useState(null);

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

  const [sosList, setSosList] = useState([]);
  // const [authorities, setAuthorities] = useState([]);

  const fetchSOSComplaints = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get(
      "/sos",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "SOS COMPLAINTS:",
      res.data.sosComplaints
    );

    console.log(
  "👮 SOS-2026-000009 AUTHORITY:",
  res.data.sosComplaints[0]?.assignedAuthority
);

    setSosList(
      res.data.sosComplaints || []
    );

  } catch (error) {
    console.error(
      "Failed to fetch SOS complaints:",
      error
    );

    console.error(
      "Server response:",
      error.response?.data
    );
  }
};

useEffect(() => {
  fetchSOSComplaints();
}, []);

 const updateSosStatus = (id, value) => {
  setSosList((prev) =>
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

const handleUpdateSos = async (sos) => {
  try {
    const token =
      localStorage.getItem("token");

    const authorityId =
      sos.assignedAuthority?._id ||
      sos.assignedAuthority ||
      null;

    const res = await API.patch(
      `/sos/${sos._id}/status`,
      {
        status: sos.status,
        assignedAuthority:
          authorityId,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    const updatedSos =
      res.data.sosComplaint;

    setSosList((prev) =>
      prev.map((item) =>
        item._id === updatedSos._id
          ? {
              ...updatedSos,
              statusChanged: false,
              authorityChanged: false,
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
        authorityChanged: false,
      });
    }

    alert(
      "SOS complaint updated successfully."
    );

  } catch (error) {
    console.error(
      "❌ Failed to update SOS:",
      error
    );

    alert(
      error.response?.data?.message ||
        "Failed to update SOS complaint."
    );
  }
};

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

    console.log(
  "👮 AUTHORITIES RESPONSE:",
  JSON.stringify(res.data, null, 2)
);

    setAuthorities(
      res.data.users ||
      res.data.authorities ||
      []
    );

  } catch (error) {
    console.error(
      "❌ Failed to fetch authorities:",
      error
    );
  }
};

  const filteredSos = sosList.filter((item) => {
  const matchStatus =
    statusFilter === "All Status" ||
    item.status === statusFilter;

  const locationText = [
    item.location?.street,
    item.location?.city,
    item.location?.district,
    item.location?.province,
    item.location?.fullAddress,
  ]
    .filter(Boolean)
    .join(", ");

  const matchArea =
    areaFilter.trim() === "" ||
    locationText
      .toLowerCase()
      .includes(areaFilter.toLowerCase());

  const matchSearch =
    searchText.trim() === "" ||
    (item.category || "")
      .toLowerCase()
      .includes(searchText.toLowerCase()) ||
    (item.description || "")
      .toLowerCase()
      .includes(searchText.toLowerCase()) ||
    (item.name || "")
      .toLowerCase()
      .includes(searchText.toLowerCase()) ||
    (item.sosId || "")
      .toLowerCase()
      .includes(searchText.toLowerCase());

  return (
    matchStatus &&
    matchArea &&
    matchSearch
  );
});

  const levelClass = (level) => {
    if (level === "Critical") return "bg-red-100 text-red-700";
    if (level === "High") return "bg-yellow-100 text-yellow-700";
    return "bg-blue-100 text-blue-700";
  };

  return (
    <div className={`${panelClass} rounded-[24px] p-5 shadow-card`}>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-black flex items-center gap-3">
          <FaExclamationTriangle className="text-primary" />
          SOS Complaints Management
        </h2>

        <button
          onClick={() => alert("SOS data refreshed")}
          className="border border-primary text-primary px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-red-50 transition"
        >
          <FaSyncAlt />
          Refresh
        </button>
      </div>

      {/* FILTER BOX */}
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
              placeholder="e.g., Colombo"
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
          <button className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2">
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

      {/* TABLE CARD */}
      <div
        className={`rounded-xl overflow-hidden border ${
          darkMode ? "border-white/10" : "border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="font-black text-lg flex items-center gap-2">
            <FaList />
            Recent SOS Complaints
          </h3>

          <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-black">
            {filteredSos.length} Total
          </span>
        </div>

        <div className="overflow-x-auto max-h-[360px] overflow-y-auto">
          <table className="w-full min-w-[1100px] text-sm">
            <thead className="sticky top-0 z-10">
              <tr
                className={
                  darkMode
                    ? "bg-[#2e2e2e] text-white"
                    : "bg-gray-100 text-dark"
                }
              >
                <th className="py-3 px-4 text-left">SOS ID</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Emergency Type</th>
                <th className="py-3 px-4 text-left">Citizen</th>
                <th className="py-3 px-4 text-left">Contact</th>                
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Assigned Authority</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
  {filteredSos.map((item) => {
    const locationText = [
      item.location?.street,
      item.location?.city,
      item.location?.district,
      item.location?.province,
    ]
      .filter(Boolean)
      .join(", ");

    return (
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
          {item.sosId}
        </td>

        {/* LOCATION */}
        <td className="py-3 px-4">
  <div className="flex flex-col gap-2">

    <div className="flex items-center gap-2 font-bold">
      <FaMapMarkerAlt className="text-primary" />

      <span>
        {item.location?.latitude ?? "-"},{" "}
        {item.location?.longitude ?? "-"}
      </span>
    </div>

    {item.location?.latitude != null &&
      item.location?.longitude != null && (
        <a
          href={`https://www.google.com/maps?q=${item.location.latitude},${item.location.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-xs font-bold hover:underline"
        >
          Open Map
        </a>
      )}

  </div>
</td>

        {/* CATEGORY */}
        <td className="py-3 px-4 font-bold">
          {item.category || "-"}
        </td>

        {/* CITIZEN */}
        <td className="py-3 px-4">
          {item.name ||
            item.citizen?.fullName ||
            "-"}
        </td>

        {/* CONTACT */}
        <td className="py-3 px-4">
          <div className="flex flex-col">
            <span className="font-bold">
              {item.phone || "-"}
            </span>

            <span className="text-xs opacity-60">
              {item.email || ""}
            </span>
          </div>
        </td>

        {/* STATUS */}
        <td className="py-3 px-4">
  <div className="flex items-center gap-2">
    <select
      value={item.status || "Submitted"}
      onChange={(e) =>
        updateSosStatus(
          item._id,
          e.target.value
        )
      }
      className="border border-gray-300 rounded-full px-3 py-2 text-sm bg-white text-dark outline-none"
    >
      {STATUS_OPTIONS.map((status) => (
        <option
          key={status.value}
          value={status.value}
        >
          {status.dot} {status.value}
        </option>
      ))}
    </select>
  </div>
</td>

<td className="py-3 px-4">
  <select
    value={item.assignedAuthority?._id || item.assignedAuthority || ""}
    onChange={(e) => {
      const authority = authorities.find(
        (a) => a._id === e.target.value
      );

      setSosList((prev) =>
        prev.map((sos) =>
          sos._id === item._id
            ? {
                ...sos,
                assignedAuthority: authority || null,
                authorityChanged: true,
              }
            : sos
        )
      );

      if (selectedSos?._id === item._id) {
        setSelectedSos({
          ...selectedSos,
          assignedAuthority:
            authority || null,
          authorityChanged: true,
        });
      }
    }}
    className="border border-gray-300 rounded-lg px-2 py-2 text-sm bg-white text-dark w-full min-w-[180px]"
  >
    <option value="">
      Select Authority
    </option>

    {authorities.map((authority) => (
      <option
        key={authority._id}
        value={authority._id}
      >
        {authority.fullName}
      </option>
    ))}
  </select>
</td>

        {/* VIEW */}
        <td className="py-3 px-4">
  <div className="flex items-center justify-center gap-2">

    <button
      onClick={() =>
        handleUpdateSos(item)
      }
      disabled={
  !item.statusChanged &&
  !item.authorityChanged
}
      className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
  item.statusChanged ||
  item.authorityChanged
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
      className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
    >
      <FaEye />
      View
    </button>

  </div>
</td>
      </tr>
    );
  })}
</tbody>
          </table>
        </div>
      </div>

      {/* SELECTED DETAILS */}
      <div
        className={`mt-5 rounded-xl p-5 border ${
          selectedSos
            ? darkMode
              ? "bg-white/5 border-white/10"
              : "bg-red-50 border-red-100 text-dark"
            : "bg-cyan-50 border-cyan-100 text-cyan-900"
        }`}
      >
        {selectedSos && (
  <div
    className={`relative mt-6 rounded-2xl border p-6 ${
      darkMode
        ? "bg-white/5 border-white/10 text-white"
        : "bg-white border-gray-200 text-dark"
    }`}
  >
    {/* CLOSE BUTTON */}
    <button
      onClick={() => setSelectedSos(null)}
      className="absolute top-5 right-5 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-lg transition shadow-md"
    >
      Close
    </button>

    {/* TITLE */}
    <div className="pr-28 mb-6">
      <h2 className="text-2xl font-black">
        SOS Complaint Details
      </h2>

      <p className="text-sm opacity-60 mt-1">
        Complete emergency complaint information
      </p>
    </div>

    {/* BASIC DETAILS */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      <div>
        <p className="text-xs font-bold opacity-60">
          SOS ID
        </p>
        <p className="font-black mt-1">
          {selectedSos.sosId || "-"}
        </p>
      </div>

      <div>
        <p className="text-xs font-bold opacity-60">
          Category
        </p>
        <p className="font-black mt-1">
          {selectedSos.category || "-"}
        </p>
      </div>

      <div>
        <p className="text-xs font-bold opacity-60">
          Status
        </p>
        <p className="font-black mt-1">
          {selectedSos.status || "-"}
        </p>
      </div>

      <div>
        <p className="text-xs font-bold opacity-60">
          Date Submitted
        </p>
        <p className="font-black mt-1">
          {selectedSos.createdAt
            ? new Date(
                selectedSos.createdAt
              ).toLocaleString()
            : "-"}
        </p>
      </div>

    </div>

    {/* DIVIDER */}
    <div className="border-t border-gray-200/30 my-7" />

    {/* CITIZEN DETAILS */}
    <div>
      <h3 className="text-lg font-black mb-4">
        Citizen Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div>
          <p className="text-xs font-bold opacity-60">
            Name
          </p>

          <p className="font-bold mt-1">
            {selectedSos.name ||
              selectedSos.citizen?.fullName ||
              "-"}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold opacity-60">
            Email
          </p>

          <p className="font-bold mt-1 break-all">
            {selectedSos.email ||
              selectedSos.citizen?.email ||
              "-"}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold opacity-60">
            Phone / WhatsApp
          </p>

          <p className="font-bold mt-1">
            {selectedSos.phone ||
              selectedSos.citizen?.phone ||
              "-"}
          </p>
        </div>

      </div>
    </div>

    {/* DIVIDER */}
    <div className="border-t border-gray-200/30 my-7" />

    {/* LOCATION DETAILS */}
    <div>
      <h3 className="text-lg font-black mb-4">
        Location Details
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div>
          <p className="text-xs font-bold opacity-60">
            Street / Area
          </p>

          <p className="font-bold mt-1">
            {selectedSos.location?.street ||
              "-"}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold opacity-60">
            City
          </p>

          <p className="font-bold mt-1">
            {selectedSos.location?.city ||
              "-"}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold opacity-60">
            District
          </p>

          <p className="font-bold mt-1">
            {selectedSos.location?.district ||
              "-"}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold opacity-60">
            Province
          </p>

          <p className="font-bold mt-1">
            {selectedSos.location?.province ||
              "-"}
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="text-xs font-bold opacity-60">
            Full Address
          </p>

          <p className="font-bold mt-1">
            {selectedSos.location?.fullAddress ||
              "-"}
          </p>
        </div>

      </div>

      {/* GPS */}
      <div className="mt-5 p-4 rounded-xl border border-gray-200/30">

        <p className="text-sm font-black mb-3">
          📍 GPS Location
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <p className="text-sm">
            <b>Latitude:</b>{" "}
            {selectedSos.location?.latitude ??
              "-"}
          </p>

          <p className="text-sm">
            <b>Longitude:</b>{" "}
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
              className="inline-flex mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-bold text-sm transition"
            >
              📍 Open Location in Google Maps
            </a>
          )}

      </div>
    </div>

    {/* DIVIDER */}
    <div className="border-t border-gray-200/30 my-7" />

    {/* DESCRIPTION */}
    <div>
      <h3 className="text-lg font-black mb-4">
        Emergency Description
      </h3>

      <div className="rounded-xl border border-gray-200/30 p-4">
        <p className="text-sm leading-7">
          {selectedSos.description ||
            "No description provided."}
        </p>
      </div>
    </div>

    {/* DIVIDER */}
    <div className="border-t border-gray-200/30 my-7" />

    {/* ASSIGNED AUTHORITY */}
    <div>
      <h3 className="text-lg font-black mb-4">
        Assigned Authority
      </h3>

      {selectedSos.assignedAuthority ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <p className="text-xs font-bold opacity-60">
              Name
            </p>

            <p className="font-bold mt-1">
              {
                selectedSos.assignedAuthority
                  ?.fullName || "-"
              }
            </p>
          </div>

          <div>
            <p className="text-xs font-bold opacity-60">
              Email
            </p>

            <p className="font-bold mt-1 break-all">
              {
                selectedSos.assignedAuthority
                  ?.email || "-"
              }
            </p>
          </div>

          <div>
            <p className="text-xs font-bold opacity-60">
              Phone
            </p>

            <p className="font-bold mt-1">
              {
                selectedSos.assignedAuthority
                  ?.phone || "-"
              }
            </p>
          </div>

          <div>
            <p className="text-xs font-bold opacity-60">
              Department
            </p>

            <p className="font-bold mt-1">
              {
                selectedSos.assignedAuthority
                  ?.department || "-"
              }
            </p>
          </div>

        </div>
      ) : (
        <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-yellow-800">
          <p className="font-bold">
            No authority has been assigned yet.
          </p>
        </div>
      )}
    </div>

    {/* DIVIDER */}
    <div className="border-t border-gray-200/30 my-7" />

    {/* EVIDENCE IMAGES */}
    <div>
      <h3 className="text-lg font-black mb-4">
        Evidence Images
      </h3>

      {selectedSos.evidenceImages?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

          {selectedSos.evidenceImages.map(
            (imagePath, index) => {
              const imageUrl =
                imagePath.startsWith("http")
                  ? imagePath
                  : `http://localhost:5000${imagePath}`;

              return (
                <div
                  key={`${imagePath}-${index}`}
                  className="rounded-xl overflow-hidden border border-gray-200/30"
                >
                  <img
                    src={imageUrl}
                    alt={`SOS evidence ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
              );
            }
          )}

        </div>
      ) : (
        <div className="rounded-xl border border-gray-200/30 p-4">
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

export default SosComplaintsAuth;