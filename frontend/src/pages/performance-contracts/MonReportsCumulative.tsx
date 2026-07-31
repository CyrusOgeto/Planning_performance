// import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BarChart2, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { PCFormRow, PCReadonlyInput, PCSelect } from "@/components/pc/PCFormRow";

// export const Route = createFileRoute("/performance-contracts/mon-reports-cumulative")({
//   component: MonReportsCumulativePage,
// });

const QUARTERS = ["Q1 (July - September)", "Q2 (October - December)", "Q3 (January - March)", "Q4 (April - June)"];

function MonReportsCumulativePage() {
  const [quarter, setQuarter] = useState("Q2 (October - December)");
  const [page, setPage] = useState(1);
  const totalPages = 5;

  return (
    <div className="max-w-5xl">
      <h1 className="mb-6 text-xl font-bold text-emerald-800">Cumulative Achievements Report</h1>

      <div className="mb-4 overflow-hidden rounded border border-gray-200 bg-white">
        <PCFormRow label="Contract Period:"><PCReadonlyInput value="2025/2026" /></PCFormRow>
        <PCFormRow label="Reporting Quarter *">
          <PCSelect value={quarter} onChange={(e) => setQuarter(e.target.value)} options={QUARTERS} placeholder="-Select Quarter-" />
        </PCFormRow>
      </div>

      <div className="mb-4 flex justify-end">
        <button className="inline-flex items-center gap-1 rounded bg-emerald-600 px-3 py-1.5 text-xs text-white hover:bg-emerald-700">
          <Download className="h-3.5 w-3.5" /> Download PDF
        </button>
      </div>

      <div className="min-h-[500px] rounded border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-emerald-600" />
          <h2 className="text-base font-semibold text-gray-800">KALRO Cumulative Achievement Report — {quarter}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="border-b border-gray-200 px-3 py-2 text-left font-semibold text-emerald-800">##</th>
                <th className="border-b border-gray-200 px-3 py-2 text-left font-semibold text-emerald-800">Performance Indicator</th>
                <th className="border-b border-gray-200 px-3 py-2 text-left font-semibold text-emerald-800">Category</th>
                <th className="border-b border-gray-200 px-3 py-2 text-left font-semibold text-emerald-800">Annual Target</th>
                <th className="border-b border-gray-200 px-3 py-2 text-left font-semibold text-emerald-800">Cumulative Achievement</th>
                <th className="border-b border-gray-200 px-3 py-2 text-left font-semibold text-emerald-800">% Achievement</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Absorption of Allocated Funds(GoK)", "Financial Stewardship", "100.00%", "50.00%", "50.00%"],
                ["Citizens' Service Delivery Charter", "Service Delivery", "100.00%", "100.00%", "100.00%"],
                ["Improved Crop Varieties Developed", "Core Mandate", "100.00%", "55.00%", "55.00%"],
                ["Presidential Directives Implementation", "Presidential Directives", "100.00%", "100.00%", "100.00%"],
              ].map(([ind, cat, at, ca, pct], i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-600">{i + 1}</td>
                  <td className="px-3 py-2 text-gray-700">{ind}</td>
                  <td className="px-3 py-2 text-gray-600">{cat}</td>
                  <td className="px-3 py-2 text-gray-700">{at}</td>
                  <td className="px-3 py-2 text-gray-700">{ca}</td>
                  <td className="px-3 py-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${parseFloat(pct) >= 100 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      {pct}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default MonReportsCumulativePage