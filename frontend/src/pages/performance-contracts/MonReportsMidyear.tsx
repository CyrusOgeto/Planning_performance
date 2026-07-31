// import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Download } from "lucide-react";

// export const Route = createFileRoute("/performance-contracts/mon-reports-midyear")({
//   component: MonReportsMidyearPage,
// });

function MonReportsMidyearPage() {
  const [page, setPage] = useState(1);
  const totalPages = 6;

  return (
    <div className="max-w-5xl">
      <h1 className="mb-6 text-xl font-bold text-emerald-800">Mid Year Review Report</h1>

      <div className="mb-4 flex items-center justify-between rounded border border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-emerald-700" />
          <span className="text-sm font-medium text-gray-700">KALRO Mid-Year Review — FY 2025/2026</span>
        </div>
        <button className="inline-flex items-center gap-1 rounded bg-emerald-600 px-3 py-1.5 text-xs text-white hover:bg-emerald-700">
          <Download className="h-3.5 w-3.5" /> Download PDF
        </button>
      </div>

      <div className="min-h-[500px] rounded border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-bold text-gray-800">MID-YEAR REVIEW REPORT</h2>
            <p className="text-sm text-gray-600 mt-1">Kenya Agricultural and Livestock Research Organization</p>
            <p className="text-sm font-medium text-emerald-700 mt-1">Financial Year 2025/2026</p>
            <p className="text-xs text-gray-500 mt-1">Period: July 2025 — December 2025 (Q1 & Q2)</p>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h3 className="mb-2 font-semibold text-gray-800">Executive Summary</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              KALRO's mid-year performance for FY 2025/2026 shows commendable progress across all performance categories. The organization has achieved an overall cumulative score of 67.5% against the annual targets set in the Performance Contract.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-gray-800">Performance Summary by Category</h3>
            <table className="w-full text-xs border border-gray-200 rounded">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-3 py-2 text-left text-emerald-800">Category</th>
                  <th className="px-3 py-2 text-left text-emerald-800">Weight</th>
                  <th className="px-3 py-2 text-left text-emerald-800">Mid-Year Achievement</th>
                  <th className="px-3 py-2 text-left text-emerald-800">Score</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Financial Stewardship", "10%", "50%", "5.0"],
                  ["Service Delivery", "15%", "100%", "15.0"],
                  ["Core Mandate", "60%", "55%", "33.0"],
                  ["Presidential Directives", "2%", "100%", "2.0"],
                  ["Affirmative Action", "4%", "80%", "3.2"],
                  ["Cross Cutting", "3%", "90%", "2.7"],
                  ["Targets", "6%", "60%", "3.6"],
                ].map(([cat, wt, ach, sc]) => (
                  <tr key={cat} className="border-t border-gray-100">
                    <td className="px-3 py-1.5 text-gray-700">{cat}</td>
                    <td className="px-3 py-1.5 text-gray-700">{wt}</td>
                    <td className="px-3 py-1.5 text-gray-700">{ach}</td>
                    <td className="px-3 py-1.5 font-medium text-emerald-700">{sc}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-gray-300 bg-gray-50 font-semibold">
                  <td className="px-3 py-1.5 text-gray-800">Total</td>
                  <td className="px-3 py-1.5 text-gray-800">100%</td>
                  <td className="px-3 py-1.5 text-gray-800">—</td>
                  <td className="px-3 py-1.5 text-emerald-700">64.5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded border border-gray-200 bg-gray-50 px-4 py-2">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
          className="inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-100 disabled:opacity-40">
          <ChevronLeft className="h-3.5 w-3.5" /> Previous
        </button>
        <span className="text-xs text-gray-600">Page {page} of {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
          className="inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-100 disabled:opacity-40">
          Next <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default MonReportsMidyearPage