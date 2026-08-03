import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";

// export const Route = createFileRoute("/performance-contracts/self-eval-uncaptured")({
//   component: SelfEvalUncapturedPage,
// });

const UNCAPTURED = [
  { indicator: "Organic Farming Technologies Developed and Promoted", category: "Core Mandate", annualTarget: "100.00" },
  { indicator: "Technologies for Planning and Sustainable Land Management", category: "Core Mandate", annualTarget: "100.00" },
  { indicator: "Climate Change Adaptation and Mitigation Technologies", category: "Core Mandate", annualTarget: "100.00" },
  { indicator: "Breeding Camels Availed", category: "Core Mandate", annualTarget: "100.00" },
  { indicator: "Access to Government Procurement Opportunities", category: "Affirmative Action", annualTarget: "403,006,143.60" },
];

function SelfEvalUncapturedPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 text-xl font-bold text-emerald-800">Uncaptured Self-Performance Evaluation Scores</h1>

      <div className="mb-4 rounded border border-amber-200 bg-amber-50 p-3 flex items-center gap-2 text-sm text-amber-800">
        <AlertCircle className="h-4 w-4 shrink-0" />
        The following performance indicators have not yet been scored in the self-evaluation. Please capture scores to complete the evaluation.
      </div>

      <div className="overflow-hidden rounded border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-emerald-800">##</th>
              <th className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-emerald-800">Performance Indicator</th>
              <th className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-emerald-800">Category</th>
              <th className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-emerald-800">Annual Target</th>
              <th className="border-b border-gray-200 px-4 py-2.5 text-left font-semibold text-emerald-800">Action</th>
            </tr>
          </thead>
          <tbody>
            {UNCAPTURED.map((r, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-2.5 text-gray-600">{i + 1}</td>
                <td className="px-4 py-2.5 text-gray-800 font-medium">{r.indicator}</td>
                <td className="px-4 py-2.5 text-gray-600">{r.category}</td>
                <td className="px-4 py-2.5 text-gray-700">{r.annualTarget}</td>
                <td className="px-4 py-2.5">
                  <a href="/performance-contracts/self-eval-matrix" className="text-xs text-blue-700 hover:underline">
                    Capture Score
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SelfEvalUncapturedPage;