// import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Download } from "lucide-react";
import { PCFormRow, PCReadonlyInput, PCSelect } from "@/components/pc/PCFormRow";
import { useState } from "react";

// export const Route = createFileRoute("/performance-contracts/mon-reports-feedback")({
//   component: MonReportsFeedbackPage,
// });

const QUARTERS = ["Q1 (July - September)", "Q2 (October - December)", "Q3 (January - March)", "Q4 (April - June)"];

const FEEDBACK = [
  { indicator: "Absorption of Allocated Funds(GoK)", score: "2.5/3", remark: "Good progress but below target. Accelerate utilization of allocated funds." },
  { indicator: "Citizens' Service Delivery Charter", score: "3.0/3", remark: "Excellent — target fully met for the quarter." },
  { indicator: "Improved Crop Varieties Developed", score: "2.0/3", remark: "On track. Ensure Q3 milestone deliverables are documented." },
];

function MonReportsFeedbackPage() {
  const [quarter, setQuarter] = useState("Q2 (October - December)");

  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 text-xl font-bold text-emerald-800">Cumulative Feedback Report</h1>

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

      <div className="space-y-3">
        {FEEDBACK.map((f, i) => (
          <div key={i} className="rounded border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                <span className="text-sm font-medium text-gray-800">{f.indicator}</span>
              </div>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">{f.score}</span>
            </div>
            <p className="ml-6 text-sm text-gray-600">{f.remark}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonReportsFeedbackPage;
