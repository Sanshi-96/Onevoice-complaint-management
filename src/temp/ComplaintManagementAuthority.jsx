import { useEffect, useState } from "react";
import API from "../services/api";
import {
  FaClipboardList,
  FaSyncAlt,
  FaFilter,
  FaTimes,
  FaEye,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaUser,
} from "react-icons/fa";

function ComplaintManagementAuthority({ darkMode, panelClass }) {
  const AUTH_COLOR = "#F97316";

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const STATUS_OPTIONS = [
    { value: "Submitted", dot: "🔵" },
    { value: "Reviewed", dot: "🟡" },
    { value: "Taking Action", dot: "🟠" },
    { value: "Solved", dot: "🟢" },
    { value: "Closed", dot: "⚫" },
  ];

  const [complaints, setComplaints] = useState([]);

  const fetchAssignedComplaints = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get(
      "/complaints/assigned",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setComplaints(
      res.data.complaints || []
    );

  } catch (error) {
    console.error(
      "Failed to fetch assigned complaints:",
      error
    );
  }
};

useEffect(() => {
  fetchAssignedComplaints();
}, []);

  const [statusFilter, setStatusFilter] = useState("All Status");
  const [areaFilter, setAreaFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  const updateComplaintStatus = (id, value) => {
  setComplaints((prev) =>
    prev.map((item) =>
      item._id === id
        ? { ...item, status: value }
        : item
    )
  );

  if (selectedComplaint?._id === id) {
    setSelectedComplaint((prev) => ({
      ...prev,
      status: value,
    }));
  }
};

const handleUpdateComplaint = async (complaint) => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.patch(
      `/complaints/${complaint._id}/status`,
      {
        status: complaint.status,
        priority: complaint.priority,
        remark: complaint.authorityRemark || "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedComplaint = res.data.complaint;

    setComplaints((prev) =>
      prev.map((item) =>
        item._id === updatedComplaint._id
          ? updatedComplaint
          : item
      )
    );

    if (
      selectedComplaint?._id ===
      updatedComplaint._id
    ) {
      setSelectedComplaint(updatedComplaint);
    }

    alert("Complaint updated successfully.");

  } catch (error) {
    console.error(
      "Failed to update complaint:",
      error
    );

    alert(
      error.response?.data?.message ||
        "Failed to update complaint."
    );
  }
};

  const filteredComplaints = complaints.filter((item) => {
    const matchStatus =
      statusFilter === "All Status" || item.status === statusFilter;

    const matchArea =
      areaFilter.trim() === "" ||
      item.location.toLowerCase().includes(areaFilter.toLowerCase());

    const matchSearch =
      searchText.trim() === "" ||
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.citizen?.fullName || "")
  .toLowerCase()
  .includes(searchText.toLowerCase())

    return matchStatus && matchArea && matchSearch;
  });

  const priorityClass = (priority) => {
    if (priority === "Critical") return "bg-red-100 text-red-700";
    if (priority === "High") return "bg-yellow-100 text-yellow-700";
    return "bg-blue-100 text-blue-700";
  };

  return (
    <div className={`${panelClass} rounded-[24px] p-5 shadow-card`}>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-black flex items-center gap-3">
          <FaClipboardList style={{ color: AUTH_COLOR }} />
          Assigned Complaints
        </h2>

        <button
          onClick={() => alert("Assigned complaints refreshed")}
          className="border px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-orange-50 transition"
          style={{ borderColor: AUTH_COLOR, color: AUTH_COLOR }}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              placeholder="Search title, citizen or description..."
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
            <FaClipboardList />
            Recent Assigned Complaints
          </h3>

          <span
            className="text-white px-3 py-1 rounded-full text-xs font-black"
            style={{ backgroundColor: AUTH_COLOR }}
          >
            {filteredComplaints.length} Total
          </span>
        </div>

        <div className="overflow-x-auto max-h-[360px] overflow-y-auto">
          <table className="w-full min-w-[950px] text-sm">
            <thead className="sticky top-0 z-10">
              <tr
                className={
                  darkMode
                    ? "bg-[#2e2e2e] text-white"
                    : "bg-gray-100 text-dark"
                }
              >
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Subject</th>
                <th className="py-3 px-4 text-left">Citizen</th>
                <th className="py-3 px-4 text-left">Priority</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredComplaints.map((item) => (
                <tr
                  key={item._id}
                  className={`border-t ${
                    darkMode
                      ? "border-white/10 hover:bg-white/5"
                      : "border-gray-200 hover:bg-orange-50"
                  }`}
                >
                  <td className="py-3 px-4 font-black">
                    {item.complaintId}
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 font-bold">
                      <FaMapMarkerAlt style={{ color: AUTH_COLOR }} />
                      {item.location?.street || "-"}
                    </div>
                  </td>

                  <td className="py-3 px-4 font-bold">{item.title}</td>

                  <td className="py-3 px-4">
  <div className="flex items-center gap-2">
    <FaUser style={{ color: AUTH_COLOR }} />
    {item.citizen?.fullName || "-"}
  </div>
</td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-black ${priorityClass(
                        item.priority
                      )}`}
                    >
                      {item.priority}
                    </span>
                  </td>

                  <td className="py-3 px-4">
  <select
    value={item.status || "Submitted"}
    onChange={(e) =>
      updateComplaintStatus(
        item._id,
        e.target.value
      )
    }
    className="border border-gray-300 rounded-full px-3 py-2 text-sm bg-white text-dark outline-none cursor-pointer"
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
</td>

                  <td className="py-3 px-4">
  <div className="flex items-center justify-center gap-2">

    <button
      onClick={() => handleUpdateComplaint(item)}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition"
    >
      Update
    </button>

    <button
      onClick={() => setSelectedComplaint(item)}
      className="text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
      style={{ backgroundColor: AUTH_COLOR }}
    >
      <FaEye />
      View
    </button>

  </div>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SELECTED DETAILS */}
      <div
        className={`mt-5 rounded-xl p-5 border relative ${
          selectedComplaint
            ? darkMode
              ? "bg-white/5 border-white/10"
              : "bg-orange-50 border-orange-100 text-dark"
            : "bg-cyan-50 border-cyan-100 text-cyan-900"
        }`}
      >
        <button
  onClick={() => setSelectedComplaint(null)}
  className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-1 rounded-lg transition shadow-md"
>
  Close
</button>
        {!selectedComplaint ? (
          <div className="flex items-start gap-3">
            <FaInfoCircle className="mt-1" />
            <div>
              <h3 className="font-black">No Complaint Selected</h3>
              <p className="text-sm mt-1">
                Please select an assigned complaint from the list above to view
                details and update the complaint status.
              </p>
            </div>
          </div>
        ) : (
          <div>
            
  <h3 className="text-xl font-black mb-4 pr-24">
    Complaint Details - {selectedComplaint.complaintId}
  </h3>
  

  {/* Complaint Information */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
    <p>
      <b>Complaint ID:</b>{" "}
      {selectedComplaint.complaintId}
    </p>

    <p>
      <b>Title:</b>{" "}
      {selectedComplaint.title}
    </p>

    <p>
      <b>Citizen Name:</b>{" "}
      {selectedComplaint.citizen?.fullName || "-"}
    </p>

    <p>
      <b>Email:</b>{" "}
      {selectedComplaint.citizen?.email || "-"}
    </p>

    <p>
      <b>Whatsapp Number:</b>{" "}
      {selectedComplaint.citizen?.phone || "-"}
    </p>

    <p>
      <b>Category:</b>{" "}
      {selectedComplaint.category}
    </p>

    <p>
      <b>Priority:</b>{" "}
      {selectedComplaint.priority}
    </p>

    <p>
      <b>Status:</b>{" "}
      {selectedComplaint.status}
    </p>

    <p>
      <b>Submission Method:</b>{" "}
      {selectedComplaint.submissionMethod}
    </p>

    <p>
      <b>Date Submitted:</b>{" "}
      {selectedComplaint.createdAt
        ? new Date(
            selectedComplaint.createdAt
          ).toLocaleString()
        : "-"}
    </p>
    
  </div>

  {/* Location */}
  <hr className="my-6" />

  <h4 className="text-lg font-black mb-4">
    Location Details
  </h4>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
    <p>
      <b>Street / Area:</b>{" "}
      {selectedComplaint.location?.street || "-"}
    </p>

    <p>
      <b>City:</b>{" "}
      {selectedComplaint.location?.city || "-"}
    </p>

    <p>
      <b>District:</b>{" "}
      {selectedComplaint.location?.district || "-"}
    </p>

    <p>
      <b>Province:</b>{" "}
      {selectedComplaint.location?.province || "-"}
    </p>

    <p className="md:col-span-2">
      <b>Full Address:</b>{" "}
      {selectedComplaint.location?.fullAddress || "-"}
    </p>
  </div>

  {/* Description */}
  <hr className="my-6" />

  <h4 className="text-lg font-black mb-3">
    Complaint Description
  </h4>

  <div className="border rounded-xl p-4 text-sm">
    {selectedComplaint.description || "-"}
  </div>

  {/* Authority */}
  <hr className="my-6" />

  <h4 className="text-lg font-black mb-4">
    Assigned Authority
  </h4>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
    <p>
      <b>Name:</b>{" "}
      {selectedComplaint.assignedAuthority?.fullName ||
        "Not Assigned"}
    </p>

    <p>
      <b>Email:</b>{" "}
      {selectedComplaint.assignedAuthority?.email ||
        "-"}
    </p>

    <p>
      <b>Phone:</b>{" "}
      {selectedComplaint.assignedAuthority?.phone ||
        "-"}
    </p>

    <p>
      <b>Authority Area:</b>{" "}
      {selectedComplaint.assignedAuthority?.authorityArea
        ? JSON.stringify(
            selectedComplaint.assignedAuthority.authorityArea
          )
        : "-"}
    </p>

    <p className="md:col-span-2">
      <b>Authority Remark:</b>{" "}
      {selectedComplaint.authorityRemark || "-"}
    </p>
  </div>

  {/* Evidence Images */}
  <hr className="my-6" />

  <h4 className="text-lg font-black mb-4">
    Evidence Images
  </h4>

  {selectedComplaint.evidenceImages?.length > 0 ? (
    <div className="flex flex-wrap gap-4">
      {selectedComplaint.evidenceImages.map(
        (image, index) => {
          const imageUrl = `http://localhost:5000${image}`;

          return (
            <img
              key={index}
              src={imageUrl}
              alt={`Evidence ${index + 1}`}
              className="w-48 h-48 object-cover rounded-xl border cursor-pointer hover:scale-105 transition"
              onClick={() =>
                window.open(
                  imageUrl,
                  "_blank"
                )
              }
            />
          );
        }
      )}
    </div>
  ) : (
    <p className="text-sm opacity-60">
      No evidence images uploaded.
    </p>
  )}
</div>
        )}
      </div>
    </div>
  );
}

export default ComplaintManagementAuthority;