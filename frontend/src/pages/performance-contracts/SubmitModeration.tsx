// import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, CheckCircle, AlertTriangle } from "lucide-react";

// export const Route = createFileRoute("/performance-contracts/submit-moderation")({
//   component: SubmitModerationPage,
// });

const CHECKLIST = [
  { item: "Self-evaluation scores captured for all indicators", done: true },
  { item: "Remarks/justification provided for all scores", done: true },
  { item: "No uncaptured self-evaluation scores remaining", done: false },
  { item: "Self-evaluation report reviewed", done: true },
];

function SubmitModerationPage() {
  const [submitted, setSubmitted] = useState(false);
  const allDone = CHECKLIST.every((c) => c.done);

  if (submitted) {
    return (
      <div className="max-w-2xl">
        <h1 className="mb-6 text-xl font-bold text-emerald-800">Submit for Moderation</h1>
        <div className="rounded border border-emerald-200 bg-emerald-50 p-8 text-center">
          <CheckCircle className="mx-auto mb-3 h-12 w-12 text-emerald-600" />
          <p className="text-lg font-semibold text-emerald-800">Submitted for Moderation!</p>
          <p className="mt-1 text-sm text-emerald-700">
            Your self-performance evaluation has been submitted to the Performance Secretariat for moderation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-xl font-bold text-emerald-800">Submit for Moderation</h1>

      <div className="mb-6 overflow-hidden rounded border border-gray-200 bg-white">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
          <p className="text-sm font-semibold text-gray-700">Pre-Submission Checklist</p>
        </div>
        <div className="divide-y divide-gray-100">
          {CHECKLIST.map((c, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5">
              {c.done ? (
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
              )}
              <span className={`text-sm ${c.done ? "text-gray-700" : "text-amber-700"}`}>{c.item}</span>
            </div>
          ))}
        </div>
      </div>

      {!allDone && (
        <div className="mb-4 rounded border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <AlertTriangle className="inline h-4 w-4 mr-1" />
          Please complete all checklist items before submitting for moderation.
        </div>
      )}

      <button
        onClick={() => setSubmitted(true)}
        disabled={!allDone}
        className="inline-flex items-center gap-2 rounded bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
        Submit for Moderation
      </button>
    </div>
  );
}

export default SubmitModerationPage;