import { useState } from "react";
import {
  FaClipboardList,
  FaSyncAlt,
  FaFilter,
  FaTimes,
  FaEye,
  FaMapMarkerAlt,
  FaUserShield,
  FaInfoCircle,
} from "react-icons/fa";

function ComplaintManagementAuth({
  darkMode,
  panelClass,
  complaints,
  setComplaints,
  authorities,
  selectedComplaint,
  setSelectedComplaint,
  updateField,
  handleUpdateComplaint,
}) {

  const STATUS_OPTIONS = [
    { value: "Submitted", dot: "🔵" },
    { value: "Reviewed", dot: "🟡" },
    { value: "Taking Action", dot: "🟠" },
    { value: "Solved", dot: "🟢" },
    { value: "Closed", dot: "⚫" },
  ];

  const PRIORITY_OPTIONS = [
    "Normal",
    "High",
    "Critical",
  ];

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [areaFilter, setAreaFilter] =
    useState("");

  const [searchText, setSearchText] =
    useState("");

  const updateComplaintStatus = (
    complaintId,
    status
  ) => {
    setComplaints((prev) =>
      prev.map((item) =>
        item._id === complaintId
          ? {
              ...item,
              status,
            }
          : item
      )
    );

    if (
      selectedComplaint?._id ===
      complaintId
    ) {
      setSelectedComplaint({
        ...selectedComplaint,
        status,
      });
    }
  };

  const updateComplaintPriority = (
    complaintId,
    priority
  ) => {
    setComplaints((prev) =>
      prev.map((item) =>
        item._id === complaintId
          ? {
              ...item,
              priority,
            }
          : item
      )
    );

    if (
      selectedComplaint?._id ===
      complaintId
    ) {
      setSelectedComplaint({
        ...selectedComplaint,
        priority,
      });
    }
  };

  const filteredComplaints =
    complaints.filter((item) => {

      const matchStatus =
        statusFilter === "All Status" ||
        item.status === statusFilter;

      const matchArea =
        areaFilter.trim() === "" ||
        item.location?.street
          ?.toLowerCase()
          .includes(
            areaFilter.toLowerCase()
          ) ||
        item.location?.city
          ?.toLowerCase()
          .includes(
            areaFilter.toLowerCase()
          );

      const matchSearch =
        searchText.trim() === "" ||
        item.title
          ?.toLowerCase()
          .includes(
            searchText.toLowerCase()
          ) ||
        item.description
          ?.toLowerCase()
          .includes(
            searchText.toLowerCase()
          ) ||
        item.complaintId
          ?.toLowerCase()
          .includes(
            searchText.toLowerCase()
          );

      return (
        matchStatus &&
        matchArea &&
        matchSearch
      );
    });

  const priorityClass = (
    priority
  ) => {
    if (priority === "Critical")
      return "bg-red-100 text-red-700";

    if (priority === "High")
      return "bg-yellow-100 text-yellow-700";

    return "bg-blue-100 text-blue-700";
  };

//   const filteredComplaints = complaints.filter((item) => {

//   const matchStatus =
//     statusFilter === "All Status" ||
//     item.status === statusFilter;

//   const matchArea =
//     areaFilter.trim() === "" ||
//     item.location?.street
//       ?.toLowerCase()
//       .includes(areaFilter.toLowerCase()) ||
//     item.location?.city
//       ?.toLowerCase()
//       .includes(areaFilter.toLowerCase()) ||
//     item.location?.district
//       ?.toLowerCase()
//       .includes(areaFilter.toLowerCase()) ||
//     item.location?.province
//       ?.toLowerCase()
//       .includes(areaFilter.toLowerCase());

//   const matchSearch =
//     searchText.trim() === "" ||

//     item.complaintId
//       ?.toLowerCase()
//       .includes(searchText.toLowerCase()) ||

//     item.title
//       ?.toLowerCase()
//       .includes(searchText.toLowerCase()) ||

//     item.description
//       ?.toLowerCase()
//       .includes(searchText.toLowerCase()) ||

//     item.citizen?.fullName
//       ?.toLowerCase()
//       .includes(searchText.toLowerCase());

//   return (
//     matchStatus &&
//     matchArea &&
//     matchSearch
//   );

// });

// const priorityClass = (priority) => {

//   if (priority === "Critical")
//     return "bg-red-100 text-red-700";

//   if (priority === "High")
//     return "bg-yellow-100 text-yellow-700";

//   return "bg-blue-100 text-blue-700";

// };

  return (
    <div className={`${panelClass} rounded-[24px] p-5 shadow-card`}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-black flex items-center gap-3">
          <FaClipboardList className="text-primary" />
          Complaints Management
        </h2>

        <button
          onClick={() => alert("Data refreshed")}
          className="border border-primary text-primary px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-red-50 transition"
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
              placeholder="e.g., Colombo"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-dark outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-bold block mb-2">Search</label>
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search title or description..."
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
            <FaClipboardList />
            Recent Complaints
          </h3>

          <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-black">
            {filteredComplaints.length} Total
          </span>
        </div>

        <div className="overflow-x-auto max-h-[360px] overflow-y-auto">
          <table className="w-full min-w-[1050px] text-sm">
            <thead className="sticky top-0 z-10">
              <tr className={darkMode ? "bg-[#2e2e2e] text-white" : "bg-gray-100 text-dark"}>
                <th className="py-3 px-4 text-left">
  Complaint ID
</th>

<th className="py-3 px-4 text-left">
  Area
</th>

<th className="py-3 px-4 text-left">
  Title
</th>

<th className="py-3 px-4 text-left">
  Priority
</th>

<th className="py-3 px-4 text-left">
  Status
</th>

<th className="py-3 px-4 text-left">
  Assigned Authority
</th>

<th className="py-3 px-4 text-center">
  View
</th>
              </tr>
            </thead>

            <tbody>
  {filteredComplaints.map((item) => (
    <tr
      key={item._id}
      className={`border-t ${
        darkMode
          ? "border-white/10 hover:bg-white/5"
          : "border-gray-200 hover:bg-red-50"
      }`}
    >
      {/* Complaint ID */}
      <td className="py-3 px-4 font-black">
        {item.complaintId}
      </td>

      {/* Area */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-2 font-bold">
          <FaMapMarkerAlt className="text-primary" />
          {item.location?.street || "-"}
        </div>
      </td>

      {/* Title */}
      <td className="py-3 px-4 font-bold">
        {item.title}
      </td>

      {/* Priority */}
      <td className="py-3 px-4">
        <select
          value={item.priority}
          onChange={(e) =>
            updateComplaintPriority(
              item._id,
              e.target.value
            )
          }
          className="border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white text-dark"
        >
          {PRIORITY_OPTIONS.map((priority) => (
            <option
              key={priority}
              value={priority}
            >
              {priority}
            </option>
          ))}
        </select>
      </td>

      {/* Status */}
      <td className="py-3 px-4">
        <select
          value={item.status}
          onChange={(e) =>
            updateComplaintStatus(
              item._id,
              e.target.value
            )
          }
          className="border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white text-dark"
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

      {/* Assigned Authority */}
      <td className="py-3 px-4">
  <select
    value={item.assignedAuthority?._id || ""}
    onChange={(e) => {
      const authority = authorities.find(
        (a) => a._id === e.target.value
      );

      setComplaints((prev) =>
        prev.map((c) =>
          c._id === item._id
            ? {
                ...c,
                assignedAuthority: authority,
              }
            : c
        )
      );

      if (
        selectedComplaint?._id === item._id
      ) {
        setSelectedComplaint({
          ...selectedComplaint,
          assignedAuthority: authority,
        });
      }
    }}
    className="border border-gray-300 rounded-lg px-2 py-2 text-sm bg-white text-dark w-full"
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

      {/* View */}
      <td className="py-3 px-4">
  <div className="flex items-center justify-center gap-2">

    <button
      onClick={() =>
        handleUpdateComplaint(item)
      }
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold"
    >
      Update
    </button>

    <button
      onClick={() =>
        setSelectedComplaint(item)
      }
      className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
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

      <div className="mt-5 rounded-xl p-5  relative border bg-cyan-50 border-cyan-100 text-cyan-900">
        
        {!selectedComplaint ? (
          <div className="flex items-start gap-3">
            <FaInfoCircle className="mt-1" />
            <div>
              <h3 className="font-black">No Complaint Selected</h3>
              <p className="text-sm mt-1">
                Please select a complaint from the list above to view details and take action.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <button 
  onClick={() => setSelectedComplaint(null)}
  className="absolute top-5 right-5 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-lg transition shadow-md"
>
  Close
</button>
            <h3 className="text-xl font-black mb-4">
              Complaint Details - {selectedComplaint.id}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
              

  <div>
    
    <strong>Complaint ID</strong>
    <p>{selectedComplaint.complaintId}</p>
  </div>

  <div>
    <strong>Title</strong>
    <p>{selectedComplaint.title}</p>
  </div>

  <div>
    <strong>Citizen Name</strong>
    <p>{selectedComplaint.citizen?.fullName}</p>
  </div>

  <div>
    <strong>Email</strong>
    <p>{selectedComplaint.citizen?.email}</p>
  </div>

  <div>
    <strong>Whatsapp Number</strong>
    <p>{selectedComplaint.citizen?.phone}</p>
  </div>

  <div>
    <strong>Category</strong>
    <p>{selectedComplaint.category}</p>
  </div>

  <div>
    <strong>Priority</strong>
    <p>{selectedComplaint.priority}</p>
  </div>

  <div>
    <strong>Status</strong>
    <p>{selectedComplaint.status}</p>
  </div>

  <div>
    <strong>Submission Method</strong>
    <p>{selectedComplaint.submissionMethod}</p>
  </div>

  <div>
    <strong>Date Submitted</strong>
    <p>
      {new Date(
        selectedComplaint.createdAt
      ).toLocaleString()}
    </p>
  </div>

</div>

<hr className="my-6" />

<h3 className="text-lg font-bold mb-3">
Location Details
</h3>

<div className="grid grid-cols-2 gap-5 text-sm">

  <div>
    <strong>Street / Area</strong>
    <p>{selectedComplaint.location?.street}</p>
  </div>

  <div>
    <strong>City</strong>
    <p>{selectedComplaint.location?.city}</p>
  </div>

  <div>
    <strong>District</strong>
    <p>{selectedComplaint.location?.district}</p>
  </div>

  <div>
    <strong>Province</strong>
    <p>{selectedComplaint.location?.province}</p>
  </div>

</div>

<div className="mt-4">

  <strong>Full Address</strong>

  <p>
    {selectedComplaint.location?.fullAddress}
  </p>

</div>

<hr className="my-6" />

<h3 className="text-lg font-bold mb-3">
Complaint Description
</h3>

<div className="border rounded-xl p-4">

  {selectedComplaint.description}

</div>

<hr className="my-6" />

<h3 className="text-lg font-bold mb-3">
Assigned Authority
</h3>

<div className="grid grid-cols-2 gap-5 text-sm">

  <div>
    <strong>Name</strong>
    <p>
      {selectedComplaint.assignedAuthority?.fullName ||
        "Not Assigned"}
    </p>
  </div>

  <div>
    <strong>Email</strong>
    <p>
      {selectedComplaint.assignedAuthority?.email ||
        "-"}
    </p>
  </div>

  <div>
    <strong>Department</strong>
    <p>
      {selectedComplaint.assignedAuthority?.department ||
        "-"}
    </p>
  </div>

</div>

<hr className="my-6" />

<h3 className="text-lg font-bold mb-3">
Evidence Images
</h3>

<div className="flex flex-wrap gap-4">

  {selectedComplaint.evidenceImages?.length >
  0 ? (

    selectedComplaint.evidenceImages.map(
      (image, index) => (

        <img
          key={index}
          src={`http://localhost:5000${image}`}
          alt="Evidence"
          className="w-48 h-48 object-cover rounded-xl border cursor-pointer hover:scale-105 transition"
          onClick={() =>
            window.open(
              `http://localhost:5000${image}`,
              "_blank"
            )
          }
        />

      )
    )

  ) : (

    <p>No evidence uploaded.</p>

  )}

</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComplaintManagementAuth;