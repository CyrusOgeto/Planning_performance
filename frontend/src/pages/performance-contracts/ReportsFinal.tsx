// import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileCheck, ChevronLeft, ChevronRight, Download, Printer } from "lucide-react";

// export const Route = createFileRoute("/performance-contracts/reports-final")({
//   component: ReportsFinalPage,
// });

function ReportsFinalPage() {
  const [page, setPage] = useState(1);
  const totalPages = 10;

  return (
    <div className="max-w-5xl">
      <h1 className="mb-6 text-xl font-bold text-emerald-800">Final Performance Contract</h1>

      <div className="mb-4 flex items-center justify-between rounded border border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-emerald-700" />
          <span className="text-sm font-medium text-gray-700">
            KALRO Performance Contract 2025/2026 — Final
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
              <FileCheck className="h-10 w-10 text-emerald-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">PERFORMANCE CONTRACT</h2>
            <p className="text-sm text-gray-600">Between</p>
            <p className="font-semibold text-gray-800">The Government of Kenya</p>
            <p className="text-sm text-gray-600">And</p>
            <p className="font-semibold text-gray-800">Kenya Agricultural and Livestock Research Organization (KALRO)</p>
            <p className="mt-2 text-sm font-medium text-emerald-700">For the Financial Year 2025/2026</p>
            <p className="mt-1 rounded bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 inline-block border border-emerald-200">FINAL — SIGNED</p>
          </div>

          <div className="rounded border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Signatories</p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between"><span>Dr. THUO MATHENGE</span><span className="text-gray-400">Chairperson, For MDA</span></div>
              <div className="flex justify-between"><span>SEN. MUTAHI KAGWE, EGH</span><span className="text-gray-400">Cabinet Secretary, For Government</span></div>
              <div className="flex justify-between"><span>HON. FCPA JOHN MBADI NG'ONGO, EGH</span><span className="text-gray-400">Cabinet Secretary, Counter Signing</span></div>
            </div>
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

export default ReportsFinalPage;