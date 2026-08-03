// import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PCFormRow, PCReadonlyInput, PCInput, PCSelect, PCSaveButton } from "@/components/pc/PCFormRow";
import { PCTable } from "@/components/pc/PCTable";

// export const Route = createFileRoute("/performance-contracts/self-eval-matrix")({
//   component: SelfEvalMatrixPage,
// });

const CATEGORIES = ["Financial Stewardship", "Service Delivery", "Core Mandate", "Presidential Directives", "Affirmative Action", "Cross Cutting"];

const INITIAL_DATA = [
  { indicator: "Absorption of Allocated Funds(GoK)", category: "Financial Stewardship", annualTarget: "100.00", selfScore: "4.00", remarks: "Target fully met" },
  { indicator: "Citizens' Service Delivery Charter", category: "Service Delivery", annualTarget: "100.00", selfScore: "5.00", remarks: "Exceeded expectations" },
  { indicator: "Improved Crop Varieties Developed", category: "Core Mandate", annualTarget: "100.00", selfScore: "3.50", remarks: "10 varieties developed" },
  { indicator: "Presidential Directives", category: "Presidential Directives", annualTarget: "100.00", selfScore: "5.00", remarks: "All directives implemented" },
];

const COLUMNS = [
  { key: "##", label: "##" },
  { key: "indicator", label: "Performance Indicator" },
  { key: "category", label: "Category" },
  { key: "annualTarget", label: "Annual Target" },
  { key: "selfScore", label: "Self Score (1-5)" },
  { key: "remarks", label: "Remarks" },
  { key: "execute", label: "Execute" },
];

function SelfEvalMatrixPage() {
  const [category, setCategory] = useState("");
  const [indicator, setIndicator] = useState("");
  const [score, setScore] = useState("");
  const [remarks, setRemarks] = useState("");
  const [data, setData] = useState(INITIAL_DATA);

  const handleSave = () => {
    if (!indicator.trim() || !score) return;
    setData((d) => [...d, { indicator, category, annualTarget: "100.00", selfScore: score, remarks }]);
    setIndicator(""); setCategory(""); setScore(""); setRemarks("");
  };
  const handleDelete = (idx: number) => setData((d) => d.filter((_, i) => i !== idx));

  return (
    <div className="max-w-5xl">
      <h1 className="mb-6 text-xl font-bold text-emerald-800">Self-Performance Evaluation — PC Matrix</h1>

      <div className="mb-6 overflow-hidden rounded border border-gray-200 bg-white">
        <PCFormRow label="MDA Name:"><PCReadonlyInput value="Kenya Agricultural and Livestock Research Organization" /></PCFormRow>
        <PCFormRow label="Contract Period:"><PCReadonlyInput value="2025/2026" /></PCFormRow>
        <PCFormRow label="Performance Category *" required>
          <PCSelect value={category} onChange={(e) => setCategory(e.target.value)} options={CATEGORIES} placeholder="-Select Category-" />
        </PCFormRow>
        <PCFormRow label="Performance Indicator *" required>
          <PCInput value={indicator} onChange={(e) => setIndicator(e.target.value)} placeholder="Enter performance indicator" />
        </PCFormRow>
        <PCFormRow label="Self Score (1-5) *" required>
          <PCSelect value={score} onChange={(e) => setScore(e.target.value)} options={["1.00", "1.50", "2.00", "2.50", "3.00", "3.50", "4.00", "4.50", "5.00"]} placeholder="-Select Score-" />
        </PCFormRow>
        <PCFormRow label="Remarks">
          <PCInput value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Add justification or remarks" />
        </PCFormRow>
      </div>

      <div className="mb-6"><PCSaveButton onClick={handleSave} /></div>

      <h2 className="mb-3 text-base font-bold text-emerald-800">Captured Self-Evaluation Scores</h2>
      <PCTable columns={COLUMNS} data={data} onDelete={handleDelete} onEdit={() => {}} />
    </div>
  );
}

export default SelfEvalMatrixPage;