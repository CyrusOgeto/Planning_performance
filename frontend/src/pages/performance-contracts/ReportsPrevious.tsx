// import { createFileRoute } from "@tanstack/react-router";
import { Archive, Download, Eye } from "lucide-react";

// export const Route = createFileRoute("/performance-contracts/reports-previous")({
//   component: ReportsPreviousPage,
// });

const PREVIOUS_REPORTS = [
  { year: "2024/2025", status: "Signed", date: "July 14, 2024" },
  { year: "2023/2024", status: "Signed", date: "July 18, 2023" },
  { year: "2022/2023", status: "Signed", date: "July 12, 2022" },
  { year: "2021/2022", status: "Signed", date: "July 10, 2021" },
  { year: "2020/2021", status: "Signed", date: "July 15, 2020" },
];

function ReportsPreviousPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 text-xl font-bold text-emerald-800">Final PC — Previous Years</h1>

      <div className="overflow-hidden rounded border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-emerald-800">##</th>
              <th className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-emerald-800">Financial Year</th>
              <th className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-emerald-800">Status</th>
              <th className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-emerald-800">Date Signed</th>
              <th className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-emerald-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {PREVIOUS_REPORTS.map((r, i) => (
              <tr key={r.year} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-2.5 text-gray-600">{i + 1}</td>
                <td className="px-4 py-2.5 font-medium text-gray-800">{r.year}</td>
                <td className="px-4 py-2.5">
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">{r.status}</span>
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

export default ReportsPreviousPage;