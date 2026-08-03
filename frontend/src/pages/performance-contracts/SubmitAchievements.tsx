// import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, CheckCircle, AlertTriangle } from "lucide-react";
import { PCFormRow, PCReadonlyInput, PCSelect } from "@/components/pc/PCFormRow";

// export const Route = createFileRoute("/performance-contracts/submit-achievements")({
//   component: SubmitAchievementsPage,
// });

const QUARTERS = ["Q1 (July - September)", "Q2 (October - December)", "Q3 (January - March)", "Q4 (April - June)"];

function SubmitAchievementsPage() {
  const [quarter, setQuarter] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-2xl">
        <h1 className="mb-6 text-xl font-bold text-emerald-800">Submit Cumulative Achievements</h1>
        <div className="rounded border border-emerald-200 bg-emerald-50 p-8 text-center">
          <CheckCircle className="mx-auto mb-3 h-12 w-12 text-emerald-600" />
          <p className="text-lg font-semibold text-emerald-800">Successfully Submitted!</p>
          <p className="mt-1 text-sm text-emerald-700">
            Cumulative achievements for {quarter} have been submitted for review.
          </p>
          <button onClick={() => { setSubmitted(false); setQuarter(""); }}
            className="mt-4 rounded border border-emerald-300 px-4 py-2 text-sm text-emerald-700 hover:bg-emerald-100">
            Submit Another Quarter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-xl font-bold text-emerald-800">Submit Cumulative Achievements</h1>

      <div className="mb-6 overflow-hidden rounded border border-gray-200 bg-white">
        <PCFormRow label="MDA Name:"><PCReadonlyInput value="Kenya Agricultural and Livestock Research Organization" /></PCFormRow>
        <PCFormRow label="Contract Period:"><PCReadonlyInput value="2025/2026" /></PCFormRow>
        <PCFormRow label="Reporting Quarter *">
          <PCSelect value={quarter} onChange={(e) => setQuarter(e.target.value)} options={QUARTERS} placeholder="-Select Quarter-" />
        </PCFormRow>
      </div>

      <div className="mb-4 rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
        <AlertTriangle className="inline h-4 w-4 mr-1" />
        Ensure all achievements for the selected quarter have been captured before submitting.
      </div>

      <button
        onClick={() => setSubmitted(true)}
        disabled={!quarter}
        className="inline-flex items-center gap-2 rounded bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
        Submit Achievements
      </button>
    </div>
  );
}

export default SubmitAchievementsPage;