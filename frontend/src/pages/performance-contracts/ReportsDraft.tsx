// import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, ChevronLeft, ChevronRight, Download, Printer } from "lucide-react";

// export const Route = createFileRoute("/performance-contracts/reports-draft")({
//   component: ReportsDraftPage,
// });

function ReportsDraftPage() {
  const [page, setPage] = useState(1);
  const totalPages = 8;

  return (
    <div className="max-w-5xl">
      <h1 className="mb-6 text-xl font-bold text-emerald-800">Draft Performance Contract</h1>

      <div className="mb-4 flex items-center justify-between rounded border border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-emerald-700" />
          <span className="text-sm font-medium text-gray-700">
            KALRO Performance Contract 2025/2026 — Draft
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-100">
            <Printer className="h-3.5 w-3.5" /> Print
          </button>
          <button className="inline-flex items-center gap-1 rounded bg-emerald-600 px-3 py-1.5 text-xs text-white hover:bg-emerald-700">
            <Download className="h-3.5 w-3.5" /> Download PDF
          </button>
        </div>
      </div>

      <div className="min-h-[600px] rounded border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="text-center">
            <div className="mx-auto mb-3 h-20 w-20 rounded-full bg-emerald-50 flex items-center justify-center">
              <FileText className="h-10 w-10 text-emerald-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">PERFORMANCE CONTRACT</h2>
            <p className="text-sm text-gray-600">Between</p>
            <p className="font-semibold text-gray-800">The Government of Kenya</p>
            <p className="text-sm text-gray-600">And</p>
            <p className="font-semibold text-gray-800">Kenya Agricultural and Livestock Research Organization (KALRO)</p>
            <p className="mt-2 text-sm font-medium text-emerald-700">For the Financial Year 2025/2026</p>
            <p className="mt-1 rounded bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 inline-block border border-amber-200">DRAFT</p>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h3 className="mb-2 font-semibold text-gray-800">1. BACKGROUND</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              This Performance Contract is entered into between the Government of Kenya, represented by the Principal Secretary, State Department for Crop Development, and the Kenya Agricultural and Livestock Research Organization (KALRO), for the Financial Year 2025/2026.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-gray-800">2. MANDATE</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              KALRO is established under the Kenya Agricultural and Livestock Research Act, 2013, to organize, carry out, co-ordinate, supervise, and assess agricultural and livestock research in Kenya.
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-gray-800">3. PERFORMANCE INDICATORS SUMMARY</h3>
            <table className="w-full text-xs border border-gray-200 rounded">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-3 py-2 text-left text-emerald-800">Category</th>
                  <th className="px-3 py-2 text-left text-emerald-800">Weight</th>
                  <th className="px-3 py-2 text-left text-emerald-800">No. of Indicators</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Financial Stewardship", "10.00", "4"],
                  ["Service Delivery", "15.00", "3"],
                  ["Core Mandate", "60.00", "9"],
                  ["Presidential Directives", "2.00", "1"],
                  ["Affirmative Action", "4.00", "2"],
                  ["Cross Cutting", "3.00", "2"],
                  ["Targets", "6.00", "2"],
                ].map(([cat, wt, num]) => (
                  <tr key={cat} className="border-t border-gray-100">
                    <td className="px-3 py-1.5 text-gray-700">{cat}</td>
                    <td className="px-3 py-1.5 text-gray-700">{wt}</td>
                    <td className="px-3 py-1.5 text-gray-700">{num}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded border border-gray-200 bg-gray-50 px-4 py-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-100 disabled:opacity-40"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Previous
        </button>
        <span className="text-xs text-gray-600">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="inline-flex items-center gap-1 rounded border border-gray-300 px-3 py-1.5 text-xs hover:bg-gray-100 disabled:opacity-40"
        >
          Next <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default ReportsDraftPage