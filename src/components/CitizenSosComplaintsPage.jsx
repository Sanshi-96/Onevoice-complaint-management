import { useEffect, useState } from "react";
import API from "../services/api";

import {
  FaExclamationTriangle,
  FaEye,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaTimes,
  FaImage,
} from "react-icons/fa";

function CitizenSosComplaintsPage({
  darkMode,
  panelClass,
}) {
  const [sosComplaints, setSosComplaints] = useState([]);
  const [selectedSos, setSelectedSos] = useState(null);
  const [loading, setLoading] = useState(true);

  /*
  ========================================
  FETCH MY SOS COMPLAINTS
  ========================================
  */

  const fetchMySosComplaints = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.get("/sos/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(
        "🚨 MY SOS COMPLAINTS:",
        res.data.sosComplaints
      );

      setSosComplaints(
        res.data.sosComplaints || []
      );

    } catch (error) {
      console.error(
        "❌ Failed to fetch my SOS complaints:",
        error.response?.data || error
      );

      setSosComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMySosComplaints();
  }, []);

  /*
  ========================================
  STATUS STYLE
  ========================================
  */

  const getStatusStyle = (status) => {
    switch (status) {
      case "Submitted":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Reviewed":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";

      case "Taking Action":
        return "bg-orange-50 text-orange-700 border-orange-200";

      case "Solved":
        return "bg-green-50 text-green-700 border-green-200";

      case "Closed":
        return "bg-gray-100 text-gray-700 border-gray-300";

      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case "Submitted":
        return "🔵";

      case "Reviewed":
        return "🟡";

      case "Taking Action":
        return "🟠";

      case "Solved":
        return "🟢";

      case "Closed":
        return "⚫";

      default:
        return "⚪";
    }
  };

  /*
  ========================================
  GOOGLE MAPS LINK
  ========================================
  */

  const getMapLink = (sos) => {
    const latitude =
      sos.location?.latitude;

    const longitude =
      sos.location?.longitude;

    if (
      latitude === undefined ||
      latitude === null ||
      longitude === undefined ||
      longitude === null
    ) {
      return null;
    }

    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  };

  return (
    <div
      className={`${panelClass} rounded-[24px] p-5 shadow-card`}
    >

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-black flex items-center gap-3">
            <FaExclamationTriangle className="text-red-600" />

            My SOS Complaints
          </h2>

          <p className="text-sm opacity-60 mt-1">
            View and track SOS emergencies submitted
            from your mobile SOS service.
          </p>
        </div>

        <span className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-black">
          {sosComplaints.length} Total
        </span>

      </div>

      {/* ========================================
          LOADING
      ======================================== */}

      {loading ? (

        <div className="py-16 text-center">

          <div className="w-10 h-10 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>

          <p className="font-bold opacity-60">
            Loading your SOS complaints...
          </p>

        </div>

      ) : sosComplaints.length === 0 ? (

        /* ========================================
           EMPTY STATE
        ======================================== */

        <div
          className={`rounded-2xl p-12 text-center ${
            darkMode
              ? "bg-white/5"
              : "bg-gray-50"
          }`}
        >

          <FaExclamationTriangle className="text-5xl text-red-300 mx-auto mb-4" />

          <h3 className="font-black text-lg">
            No SOS Complaints
          </h3>

          <p className="text-sm opacity-60 mt-2">
            You have not submitted any SOS emergency
            reports yet.
          </p>

        </div>

      ) : (

        /* ========================================
           TABLE
        ======================================== */

        <div className="overflow-x-auto rounded-2xl border border-gray-200">

          <table className="w-full text-sm">

            <thead>

              <tr
                className={
                  darkMode
                    ? "bg-white/10"
                    : "bg-gray-100"
                }
              >

                <th className="py-4 px-4 text-left font-black">
                  SOS ID
                </th>

                <th className="py-4 px-4 text-left font-black">
                  Emergency Type
                </th>

                <th className="py-4 px-4 text-left font-black">
                  Location
                </th>

                <th className="py-4 px-4 text-left font-black">
                  Date
                </th>

                <th className="py-4 px-4 text-left font-black">
                  Status
                </th>

                <th className="py-4 px-4 text-center font-black">
                  View
                </th>

              </tr>

            </thead>

            <tbody>

              {sosComplaints.map((sos) => (

                <tr
                  key={sos._id}
                  className="border-t border-gray-200 hover:bg-red-50/40 transition"
                >

                  {/* SOS ID */}

                  <td className="py-4 px-4">
                    <span className="font-black">
                      {sos.sosId}
                    </span>
                  </td>

                  {/* EMERGENCY TYPE */}

                  <td className="py-4 px-4">
                    <span className="font-bold">
                      {sos.category}
                    </span>
                  </td>

                  {/* LOCATION */}

                  <td className="py-4 px-4">

                    <div className="flex items-start gap-2">

                      <FaMapMarkerAlt className="text-red-600 mt-1 shrink-0" />

                      <div>

                        {sos.location?.city ||
                        sos.location?.district ||
                        sos.location?.province ? (

                          <p className="font-bold">

                            {[
                              sos.location?.street,
                              sos.location?.city,
                              sos.location?.district,
                            ]
                              .filter(Boolean)
                              .join(", ")}

                          </p>

                        ) : (

                          <p className="text-xs opacity-60">
                            GPS Location
                          </p>

                        )}

                        {getMapLink(sos) && (

                          <a
                            href={getMapLink(sos)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-600 text-xs font-black hover:underline"
                          >
                            Open Map
                          </a>

                        )}

                      </div>

                    </div>

                  </td>

                  {/* DATE */}

                  <td className="py-4 px-4">

                    <div className="flex items-center gap-2 text-xs opacity-70">

                      <FaClock />

                      {sos.createdAt
                        ? new Date(
                            sos.createdAt
                          ).toLocaleString()
                        : "-"}

                    </div>

                  </td>

                  {/* STATUS */}

                  <td className="py-4 px-4">

                    <span
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-bold whitespace-nowrap ${getStatusStyle(
                        sos.status
                      )}`}
                    >

                      <span>
                        {getStatusDot(
                          sos.status
                        )}
                      </span>

                      {sos.status}

                    </span>

                  </td>

                  {/* VIEW */}

                  <td className="py-4 px-4 text-center">

                    <button
                      onClick={() =>
                        setSelectedSos(sos)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-black text-xs inline-flex items-center gap-2 transition"
                    >

                      <FaEye />

                      View

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

      {/* ========================================
          SOS DETAILS PANEL
      ======================================== */}

      {selectedSos && (

        <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center p-4">

          <div
            className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl ${
              darkMode
                ? "bg-[#202020] text-white"
                : "bg-white text-dark"
            }`}
          >

            {/* HEADER */}

            <div className="sticky top-0 z-10 px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-inherit">

              <div>

                <h2 className="text-xl font-black flex items-center gap-3">

                  <FaExclamationTriangle className="text-red-600" />

                  SOS Details

                </h2>

                <p className="text-xs opacity-60 mt-1">
                  {selectedSos.sosId}
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedSos(null)
                }
                className="w-10 h-10 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition"
              >
                <FaTimes />
              </button>

            </div>

            {/* DETAILS */}

            <div className="p-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

                {/* SOS ID */}

                <DetailBox
                  darkMode={darkMode}
                  label="SOS ID"
                  value={selectedSos.sosId}
                />

                {/* CATEGORY */}

                <DetailBox
                  darkMode={darkMode}
                  label="Emergency Type"
                  value={selectedSos.category}
                />

                {/* STATUS */}

                <div
                  className={`rounded-xl border p-4 ${
                    darkMode
                      ? "border-white/10 bg-white/5"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >

                  <p className="text-xs opacity-60 font-bold">
                    Current Status
                  </p>

                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-bold mt-2 ${getStatusStyle(
                      selectedSos.status
                    )}`}
                  >

                    {getStatusDot(
                      selectedSos.status
                    )}

                    {selectedSos.status}

                  </span>

                </div>

                {/* DATE */}

                <DetailBox
                  darkMode={darkMode}
                  label="Submitted"
                  value={
                    selectedSos.createdAt
                      ? new Date(
                          selectedSos.createdAt
                        ).toLocaleString()
                      : "-"
                  }
                />

                {/* PHONE */}

                <DetailBox
                  darkMode={darkMode}
                  label="Phone"
                  value={
                    selectedSos.phone || "-"
                  }
                  icon={<FaPhone />}
                />

                {/* EMAIL */}

                <DetailBox
                  darkMode={darkMode}
                  label="Email"
                  value={
                    selectedSos.email || "-"
                  }
                  icon={<FaEnvelope />}
                />

                {/* LOCATION */}

                <div
                  className={`md:col-span-2 rounded-xl border p-4 ${
                    darkMode
                      ? "border-white/10 bg-white/5"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >

                  <p className="text-xs opacity-60 font-bold">

                    <FaMapMarkerAlt className="inline mr-2 text-red-600" />

                    Location

                  </p>

                  <p className="font-black mt-2">

                    {selectedSos.location?.fullAddress ||
                      [
                        selectedSos.location?.street,
                        selectedSos.location?.city,
                        selectedSos.location?.district,
                        selectedSos.location?.province,
                      ]
                        .filter(Boolean)
                        .join(", ") ||
                      "GPS Location"}

                  </p>

                  {selectedSos.location?.latitude != null &&
                    selectedSos.location?.longitude != null && (

                      <div className="mt-3 flex flex-wrap items-center gap-3">

                        <span className="text-xs opacity-60">

                          {selectedSos.location.latitude},{" "}
                          {selectedSos.location.longitude}

                        </span>

                        <a
                          href={getMapLink(
                            selectedSos
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 text-xs font-black hover:underline"
                        >
                          Open Location in Google Maps
                        </a>

                      </div>

                    )}

                </div>

                {/* DESCRIPTION */}

                <div
                  className={`md:col-span-2 rounded-xl border p-4 ${
                    darkMode
                      ? "border-white/10 bg-white/5"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >

                  <p className="text-xs opacity-60 font-bold">
                    Description
                  </p>

                  <p className="mt-2 leading-6">
                    {selectedSos.description ||
                      "No description provided."}
                  </p>

                </div>

                {/* ASSIGNED AUTHORITY */}

                <div
                  className={`md:col-span-2 rounded-xl border p-4 ${
                    darkMode
                      ? "border-white/10 bg-white/5"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >

                  <p className="text-xs opacity-60 font-bold">
                    Assigned Authority
                  </p>

                  <p className="font-black mt-2">
                    {selectedSos.assignedAuthority
                      ?.fullName ||
                      "Not Assigned"}
                  </p>

                  {selectedSos.assignedAuthority
                    ?.department && (

                    <p className="text-xs opacity-60 mt-1">

                      Department:{" "}

                      {
                        selectedSos
                          .assignedAuthority
                          .department
                      }

                    </p>

                  )}

                </div>

                {/* EVIDENCE */}

                {selectedSos.evidenceImages
                  ?.length > 0 && (

                  <div
                    className={`md:col-span-2 rounded-xl border p-4 ${
                      darkMode
                        ? "border-white/10 bg-white/5"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >

                    <p className="text-xs opacity-60 font-bold mb-3">

                      <FaImage className="inline mr-2" />

                      Evidence Images

                    </p>

                    <div className="flex flex-wrap gap-4">

                      {selectedSos.evidenceImages.map(
                        (image, index) => (

                          <img
                            key={index}
                            src={`http://localhost:5000${image}`}
                            alt={`SOS Evidence ${
                              index + 1
                            }`}
                            className="w-48 h-36 object-cover rounded-xl border shadow"
                          />

                        )
                      )}

                    </div>

                  </div>

                )}

              </div>

            </div>

            {/* FOOTER */}

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">

              <button
                onClick={() =>
                  setSelectedSos(null)
                }
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black transition"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/*
========================================
REUSABLE DETAIL BOX
========================================
*/

function DetailBox({
  darkMode,
  label,
  value,
  icon,
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        darkMode
          ? "border-white/10 bg-white/5"
          : "border-gray-200 bg-gray-50"
      }`}
    >

      <p className="text-xs opacity-60 font-bold">

        {icon && (
          <span className="inline mr-2">
            {icon}
          </span>
        )}

        {label}

      </p>

      <p className="font-black mt-1 break-words">
        {value}
      </p>

    </div>
  );
}

export default CitizenSosComplaintsPage;