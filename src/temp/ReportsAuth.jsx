import { FaChartPie, FaPrint } from "react-icons/fa";

function ReportsAuth({
  darkMode,
  panelClass,
  complaints = [],
  sosComplaints = [],
  authorities = [],
  users = [],
}) {
//authority
  const registeredCitizens = users.filter(
    (user) => user.role === "citizen"
  ).length;

  const registeredAuthorities  = users.filter(    //
    (user) => user.role === "authority"
  ).length;

  // const authorityData  = users.filter(    //
  //   (user) => user.role === "authority"
  // ).length;

  const authorityDepartments =
    authorities.length;

    // const authorities =
    // authorities.name;

  const submittedCount = complaints.filter(
    (c) => c.status === "Submitted"
  ).length;

  const reviewedCount = complaints.filter(
    (c) => c.status === "Reviewed"
  ).length;

  const takingActionCount =
    complaints.filter(
      (c) => c.status === "Taking Action"
    ).length;

  const solvedCount = complaints.filter(
    (c) => c.status === "Solved"
  ).length;

  const closedCount = complaints.filter(
    (c) => c.status === "Closed"
  ).length;

  const pendingCount =
    submittedCount +
    reviewedCount +
    takingActionCount;

    const summaryData = [
    [
      "Registered Citizens",
      registeredCitizens,
    ],
    [
      "Registered Authorities",
      registeredAuthorities,
    ],
    
    [
      "Authority Departments",
      authorityDepartments,
    ],
    [
      "Total Complaints",
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
  ];

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
//new
const authorityCounts = {};

complaints.forEach((complaint) => {
  const authority =
    complaint.assignedAuthority?.fullName ||
    "Not Assigned";

  authorityCounts[authority] =
    (authorityCounts[authority] || 0) + 1;
});

const authorityData = Object.entries(
  authorityCounts
).map(([authority, count]) => [
  authority,
  count,
]);

    const statusData = [
    ["Submitted", submittedCount],
    ["Reviewed", reviewedCount],
    ["Taking Action", takingActionCount],
    ["Solved", solvedCount],
    ["Closed", closedCount],
  ];

    const districtCounts = {};

  complaints.forEach((complaint) => {
    const district =
      complaint.location?.district ||
      "Unknown";

    if (!districtCounts[district]) {
      districtCounts[district] = {
        total: 0,
        resolved: 0,
        pending: 0,
      };
    }

    districtCounts[district].total += 1;

    if (
      complaint.status === "Solved" ||
      complaint.status === "Closed"
    ) {
      districtCounts[district].resolved += 1;
    } else {
      districtCounts[district].pending += 1;
    }
  });

  const districtData = Object.entries(
    districtCounts
  ).map(([district, data]) => [
    district,
    data.total,
    data.resolved,
    data.pending,
  ]);
  
//  const rows = 
//   authorities.map((authorities)) => [
//     authorities.name,
//   ]};

  return (
    <div className={`${panelClass} rounded-[24px] p-5 shadow-card`}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-black flex items-center gap-3">
          <FaChartPie className="text-primary" />
          System Analytics
        </h2>

        <button
          onClick={() => window.print()}
          className="bg-dark text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary transition"
        >
          <FaPrint />
          Print Official Report
        </button>
      </div>

      <div
        className={`rounded-2xl p-6 border ${
          darkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-start justify-between border-b-2 border-primary pb-4 mb-5">
          <div>
            <h1 className="text-3xl font-black text-primary">
              ONEVOICE SYSTEM REPORT
            </h1>
            <p className="text-sm opacity-70">
              Official Administrative Performance Report
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

        <ReportTitle darkMode={darkMode} title="I. Executive System Summary" />

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
              <h3 className="text-2xl font-black text-primary mt-2">
                {value}
              </h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">
          <ReportTitle
  darkMode={darkMode}
  title="II. Complaints By Authority"
/>

<ReportTable
  darkMode={darkMode}
  headers={["Authority Name", "Total Complaints"]}
  rows={authorityData}
/>

          <div>
            <ReportTitle darkMode={darkMode} title="III. Complaints By Category" />

            <ReportTable
              darkMode={darkMode}
              headers={["Category Name", "Total Count"]}
              rows={categoryData}
            />
          </div>

          <div>
            <ReportTitle darkMode={darkMode} title="III. Current Ticket Status" />

            <ReportTable
              darkMode={darkMode}
              headers={["Status Group", "Total Count"]}
              rows={statusData}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5 mb-6">
          <div>
            <ReportTitle darkMode={darkMode} title="IV. Complaints By District" />

            <ReportTable
              darkMode={darkMode}
              headers={["District", "Total Complaints", "Resolved", "Pending"]}
              rows={districtData}
            />
          </div>

          <div>
            <ReportTitle darkMode={darkMode} title="V. Status Pie Chart" />

            <div
              className={`rounded-lg border p-5 flex flex-col items-center justify-center ${
                darkMode ? "border-white/10 bg-white/5" : "border-gray-200"
              }`}
            >
              <div className="w-44 h-44 rounded-full border-[28px] border-primary border-r-yellow-400 border-b-green-500 border-l-orange-400 flex items-center justify-center">
                <div className="text-center">
                  <h4 className="text-2xl font-black">
  {complaints.length}
</h4>
                  <p className="text-xs opacity-60 font-bold">Total</p>
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

        <ReportTitle darkMode={darkMode} title="VI. Administrative Notes" />

        <div
          className={`rounded-lg border p-4 text-sm leading-7 ${
            darkMode ? "border-white/10 bg-white/5" : "border-gray-200"
          }`}
        >
          OneVoice enables the admin to monitor all complaints, SOS alerts,
          citizen accounts, authority departments, complaint categories, and
          status progress across all areas. Authorities can update assigned
          complaint statuses, while the admin can view full system performance.
        </div>
      </div>
    </div>
  );
}

function ReportTitle({ darkMode, title }) {
  return (
    <div
      className={`border-l-4 border-primary px-4 py-3 mb-4 font-black uppercase tracking-wide text-sm ${
        darkMode ? "bg-white/10" : "bg-gray-50"
      }`}
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

export default ReportsAuth;