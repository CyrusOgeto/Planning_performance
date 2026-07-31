// import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";

// export const Route = createFileRoute("/performance-contracts/pc-status")({
//   component: PCStatusPage,
// });

const STATUS_DATA = [
  { stage: "PC Preparation", status: "In Progress", date: "June 10, 2025", remarks: "" },
  { stage: "Submitted for Negotiation", status: "Pending", date: "—", remarks: "" },
  { stage: "Negotiation", status: "Not Started", date: "—", remarks: "" },
  { stage: "Signed/Final", status: "Not Started", date: "—", remarks: "" },
];

const STATUS_COLORS = {
  "In Progress": "bg-blue-100 text-blue-700",
  "Pending": "bg-amber-100 text-amber-700",
  "Not Started": "bg-gray-100 text-gray-500",
  "Completed": "bg-emerald-100 text-emerald-700",
};

const REMARKS = [
  { from: "Performance Secretariat", date: "June 5, 2025", message: "Please ensure all Core Mandate indicators are captured with appropriate weights totaling 60%." },
  { from: "Performance Secretariat", date: "June 3, 2025", message: "Draft PC reviewed. Kindly review the Affirmative Action indicators for accuracy." },
];

function PCStatusPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 text-xl font-bold text-emerald-800">PC Status & Draft PC Remarks</h1>

      <h2 className="mb-3 text-base font-semibold text-gray-700">Current Status</h2>
      <div className="mb-6 overflow-hidden rounded border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-emerald-800">Stage</th>
              <th className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-emerald-800">Status</th>
              <th className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-emerald-800">Date</th>
            </tr>
          </thead>
          <tbody>
            {STATUS_DATA.map((row) => (
              <tr key={row.stage} className="border-b border-gray-100">
                <td className="px-4 py-2.5 font-medium text-gray-800">{row.stage}</td>
                <td className="px-4 py-2.5">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[row.status] || "bg-gray-100 text-gray-600"}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-gray-600">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mb-3 text-base font-semibold text-gray-700">Draft PC Remarks</h2>
      <div className="space-y-3">
        {REMARKS.map((r, i) => (
          <div key={i} className="rounded border border-gray-200 bg-white p-4">
            <div className="mb-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-gray-800">{r.from}</span>
              </div>
              <span className="text-xs text-gray-400">{r.date}</span>
            </div>
            <p className="text-sm text-gray-600">{r.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PCStatusPage;