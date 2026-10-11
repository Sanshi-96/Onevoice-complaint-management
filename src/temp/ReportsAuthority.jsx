import { FaChartPie, FaPrint } from "react-icons/fa";

function ReportsAuthority({
  darkMode,
  panelClass,
  complaints = [],
  sosComplaints = [],
}) {
  const AUTH_COLOR = "#F97316";

  const submittedCount = complaints.filter(
  (c) => c.status === "Submitted"
).length;

const reviewedCount = complaints.filter(
  (c) => c.status === "Reviewed"
).length;

const takingActionCount = complaints.filter(
  (c) => c.status === "Taking Action"
).length;

const solvedCount = complaints.filter(
  (c) => c.status === "Solved"
).length;

const closedCount = complaints.filter(
  (c) => c.status === "Closed"
).length;

const pendingCount =
  submittedCount + reviewedCount + takingActionCount;

const assignedCitizenIds = [
  ...new Set(
    complaints
      .map((c) =>
        typeof c.citizen === "object"
          ? c.citizen?._id
          : c.citizen
      )
      .filter(Boolean)
  ),
];

const assignedCitizensCount =
  assignedCitizenIds.length;

  const sosSubmittedCount = sosComplaints.filter(
  (sos) => sos.status === "Submitted"
).length;

const sosReviewedCount = sosComplaints.filter(
  (sos) => sos.status === "Reviewed"
).length;

const sosTakingActionCount =
  sosComplaints.filter(
    (sos) => sos.status === "Taking Action"
  ).length;

const sosSolvedCount = sosComplaints.filter(
  (sos) => sos.status === "Solved"
).length;

const sosClosedCount = sosComplaints.filter(
  (sos) => sos.status === "Closed"
).length;

const categoryCounts = {};

complaints.forEach((complaint) => {
  const category =
    complaint.category || "Unknown";

  categoryCounts[category] =
    (categoryCounts[category] || 0) + 1;
});

const categoryData = Object.entries(
  categoryCounts
).map(([category, count]) => [
  category,
  count,
]);

const areaCounts = {};

complaints.forEach((complaint) => {
  const location =
    complaint.location || {};

  const area =
    location.street ||
    location.city ||
    location.district ||
    "Unknown";

  if (!areaCounts[area]) {
    areaCounts[area] = {
      total: 0,
      resolved: 0,
      pending: 0,
    };
  }

  areaCounts[area].total += 1;

  if (
    complaint.status === "Solved" ||
    complaint.status === "Closed"
  ) {
    areaCounts[area].resolved += 1;
  } else {
    areaCounts[area].pending += 1;
  }
});

const areaData = Object.entries(
  areaCounts
).map(([area, data]) => [
  area,
  data.total,
  data.resolved,
  data.pending,
]);

const summaryData = [
  [
    "Assigned Citizens",
    assignedCitizensCount,
  ],
  [
    "Assigned Complaints",
    complaints.length,
  ],
  [
    "SOS Complaints",
    sosComplaints.length,
  ],
  [
    "Pending Complaints",
    pendingCount,
  ],
  [
    "Reviewed Complaints",
    reviewedCount,
  ],
  [
    "Taking Action",
    takingActionCount,
  ],
  [
    "Solved Complaints",
    solvedCount,
  ],
  [
    "Closed Complaints",
    closedCount,
  ],
];

const statusData = [
  ["Submitted", submittedCount],
  ["Reviewed", reviewedCount],
  ["Taking Action", takingActionCount],
  ["Solved", solvedCount],
  ["Closed", closedCount],
];
  return (
    <div className={`${panelClass} rounded-[24px] p-5 shadow-card`}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-black flex items-center gap-3">
          <FaChartPie style={{ color: AUTH_COLOR }} />
          Authority Analytics
        </h2>

        <button
          onClick={() => window.print()}
          className="bg-dark text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:opacity-90 transition"
        >
          <FaPrint />
          Print Authority Report
        </button>
      </div>

      <div
        className={`rounded-2xl p-6 border ${
          darkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
        }`}
      >
        <div
          className="flex items-start justify-between border-b-2 pb-4 mb-5"
          style={{ borderColor: AUTH_COLOR }}
        >
          <div>
            <h1
              className="text-3xl font-black"
              style={{ color: AUTH_COLOR }}
            >
              ONEVOICE AUTHORITY REPORT
            </h1>
            <p className="text-sm opacity-70">
              Assigned Area Performance Report
            </p>
          </div>

          <div className="text-right text-sm font-bold">
            <p>Report Date: {new Date().toLocaleDateString()}</p>
            <p>
              Time:{" "}
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <ReportTitle
          darkMode={darkMode}
          color={AUTH_COLOR}
          title="I. Authority Summary"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {summaryData.map(([label, value]) => (
            <div
              key={label}
              className={`rounded-lg border p-4 text-center ${
                darkMode ? "border-white/10 bg-white/5" : "border-gray-200"
              }`}
            >
              <p className="text-[11px] uppercase opacity-60 font-black">
                {label}
              </p>
              <h3
                className="text-2xl font-black mt-2"
                style={{ color: AUTH_COLOR }}
              >
                {value}
              </h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">
          <div>
            <ReportTitle
              darkMode={darkMode}
              color={AUTH_COLOR}
              title="II. Assigned Complaints By Category"
            />

            <ReportTable
              darkMode={darkMode}
              headers={["Category Name", "Total Count"]}
              rows={categoryData}
            />
          </div>

          <div>
            <ReportTitle
              darkMode={darkMode}
              color={AUTH_COLOR}
              title="III. Assigned Complaint Status"
            />

            <ReportTable
              darkMode={darkMode}
              headers={["Status Group", "Total Count"]}
              rows={statusData}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5 mb-6">
          <div>
            <ReportTitle
              darkMode={darkMode}
              color={AUTH_COLOR}
              title="IV. Complaints By Assigned Area"
            />

            <ReportTable
              darkMode={darkMode}
              headers={["Area", "Total Complaints", "Resolved", "Pending"]}
              rows={areaData}
            />
          </div>

          <div>
            <ReportTitle
              darkMode={darkMode}
              color={AUTH_COLOR}
              title="V. Status Pie Chart"
            />

            <div
              className={`rounded-lg border p-5 flex flex-col items-center justify-center ${
                darkMode ? "border-white/10 bg-white/5" : "border-gray-200"
              }`}
            >
              <div
                className="
                  w-44
                  h-44
                  rounded-full
                  border-[28px]
                  border-r-yellow-400
                  border-b-green-500
                  border-l-orange-400
                  flex
                  items-center
                  justify-center
                "
                style={{ borderTopColor: AUTH_COLOR }}
              >
                <div className="text-center">
                  <h4 className="text-2xl font-black">
  {complaints.length}
</h4>
                  <p className="text-xs opacity-60 font-bold">Assigned</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
                <span>🔵 Submitted</span>
                <span>🟡 Reviewed</span>
                <span>🟠 Action</span>
                <span>🟢 Solved</span>
              </div>
            </div>
          </div>
        </div>

        <ReportTitle
          darkMode={darkMode}
          color={AUTH_COLOR}
          title="VI. Authority Notes"
        />

        <div
          className={`rounded-lg border p-4 text-sm leading-7 ${
            darkMode ? "border-white/10 bg-white/5" : "border-gray-200"
          }`}
        >
          This report shows only complaints and SOS requests assigned to the
          logged-in authority area. The authority can review assigned complaints,
          update complaint statuses, add response remarks, and monitor progress
          within the assigned operational region.
        </div>
      </div>
    </div>
  );
}

function ReportTitle({ darkMode, title, color }) {
  return (
    <div
      className={`border-l-4 px-4 py-3 mb-4 font-black uppercase tracking-wide text-sm ${
        darkMode ? "bg-white/10" : "bg-gray-50"
      }`}
      style={{ borderColor: color }}
    >
      {title}
    </div>
  );
}

function ReportTable({ darkMode, headers, rows }) {
  return (
    <div className="overflow-x-auto mb-5">
      <table className="w-full text-sm border border-gray-200">
        <thead>
          <tr className={darkMode ? "bg-white/10" : "bg-gray-100"}>
            {headers.map((head) => (
              <th
                key={head}
                className="border border-gray-200 px-4 py-3 text-left font-black"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, i) => (
                <td
                  key={i}
                  className="border border-gray-200 px-4 py-3 font-bold"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportsAuthority;