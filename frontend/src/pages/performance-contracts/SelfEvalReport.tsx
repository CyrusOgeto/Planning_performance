// import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Download } from "lucide-react";

// export const Route = createFileRoute("/performance-contracts/self-eval-report")({
//   component: SelfEvalReportPage,
// });

function SelfEvalReportPage() {
  const [page, setPage] = useState(1);
  const totalPages = 4;

  return (
    <div className="max-w-5xl">
      <h1 className="mb-6 text-xl font-bold text-emerald-800">Self-Performance Evaluation Report</h1>

      <div className="mb-4 flex items-center justify-between rounded border border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-emerald-700" />
          <span className="text-sm font-medium text-gray-700">KALRO Self-Performance Evaluation Report — FY 2025/2026</span>
        </div>
        <button className="inline-flex items-center gap-1 rounded bg-emerald-600 px-3 py-1.5 text-xs text-white hover:bg-emerald-700">
          <Download className="h-3.5 w-3.5" /> Download PDF
        </button>
      </div>

      <div className="min-h-[500px] rounded border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-bold text-gray-800">SELF-PERFORMANCE EVALUATION REPORT</h2>
            <p className="text-sm text-gray-600 mt-1">Kenya Agricultural and Livestock Research Organization</p>
            <p className="text-sm font-medium text-emerald-700 mt-1">Financial Year 2025/2026</p>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h3 className="mb-3 font-semibold text-gray-800">Self-Evaluation Summary</h3>
            <table className="w-full text-xs border border-gray-200 rounded">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-3 py-2 text-left text-emerald-800">Category</th>
                  <th className="px-3 py-2 text-left text-emerald-800">Weight</th>
                  <th className="px-3 py-2 text-left text-emerald-800">Self Score</th>
                  <th className="px-3 py-2 text-left text-emerald-800">Weighted Score</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Financial Stewardship", "10%", "4.0", "0.40"],
                  ["Service Delivery", "15%", "5.0", "0.75"],
                  ["Core Mandate", "60%", "3.5", "2.10"],
                  ["Presidential Directives", "2%", "5.0", "0.10"],
                  ["Affirmative Action", "4%", "4.0", "0.16"],
                  ["Cross Cutting", "3%", "4.5", "0.14"],
                  ["Targets", "6%", "3.5", "0.21"],
                ].map(([cat, wt, ss, ws]) => (
                  <tr key={cat} className="border-t border-gray-100">
                    <td className="px-3 py-1.5 text-gray-700">{cat}</td>
                    <td className="px-3 py-1.5 text-gray-700">{wt}</td>
                    <td className="px-3 py-1.5 font-medium text-blue-700">{ss}</td>
                    <td className="px-3 py-1.5 font-medium text-emerald-700">{ws}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-gray-300 bg-gray-50 font-semibold">
                  <td className="px-3 py-1.5 text-gray-800">Total</td>
                  <td className="px-3 py-1.5 text-gray-800">100%</td>
                  <td className="px-3 py-1.5 text-blue-700">—</td>
                  <td className="px-3 py-1.5 text-emerald-700">3.86</td>
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

export default SelfEvalReportPage