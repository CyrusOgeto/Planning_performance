// import { createFileRoute } from "@tanstack/react-router";
import { Archive, Download, Eye } from "lucide-react";

// export const Route = createFileRoute("/performance-contracts/mon-reports-prev")({
//   component: MonReportsPrevPage,
// });

const PREVIOUS = [
  { year: "2024/2025", quarter: "Q4 (Final)", score: "3.8/5", date: "Aug 15, 2025" },
  { year: "2024/2025", quarter: "Q3", score: "3.5/5", date: "Apr 20, 2025" },
  { year: "2024/2025", quarter: "Q2 (Mid-Year)", score: "3.2/5", date: "Jan 15, 2025" },
  { year: "2024/2025", quarter: "Q1", score: "2.9/5", date: "Oct 18, 2024" },
  { year: "2023/2024", quarter: "Q4 (Final)", score: "3.6/5", date: "Aug 12, 2024" },
];

function MonReportsPrevPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 text-xl font-bold text-emerald-800">Previous Cumulative Achievements</h1>

      <div className="overflow-hidden rounded border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-emerald-800">##</th>
              <th className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-emerald-800">Financial Year</th>
              <th className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-emerald-800">Quarter</th>
              <th className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-emerald-800">Overall Score</th>
              <th className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-emerald-800">Date Submitted</th>
              <th className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-emerald-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {PREVIOUS.map((r, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-2.5 text-gray-600">{i + 1}</td>
                <td className="px-4 py-2.5 font-medium text-gray-800">{r.year}</td>
                <td className="px-4 py-2.5 text-gray-700">{r.quarter}</td>
                <td className="px-4 py-2.5">
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">{r.score}</span>
                </td>
                <td className="px-4 py-2.5 text-gray-600">{r.date}</td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <button className="inline-flex items-center gap-1 text-xs text-blue-700 hover:underline">
                      <Eye className="h-3.5 w-3.5" /> View
                    </button>
                    <button className="inline-flex items-center gap-1 text-xs text-gray-600 hover:underline">
                      <Download className="h-3.5 w-3.5" /> Download
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MonReportsPrevPage;