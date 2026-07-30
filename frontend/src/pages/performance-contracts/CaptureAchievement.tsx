// import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PCFormRow, PCReadonlyInput, PCInput, PCSelect, PCSaveButton } from "@/components/pc/PCFormRow";
import { PCTable } from "@/components/pc/PCTable";

// export const Route = createFileRoute("/performance-contracts/capture-achievement")({
//   component: CaptureAchievementPage,
// });

const QUARTERS = ["Q1 (July - September)", "Q2 (October - December)", "Q3 (January - March)", "Q4 (April - June)"];
const CATEGORIES = ["Financial Stewardship", "Service Delivery", "Core Mandate", "Presidential Directives", "Affirmative Action in Procurement", "Cross Cutting"];

const INITIAL_DATA = [
  { indicator: "Absorption of Allocated Funds(GoK)", category: "Financial Stewardship", annualTarget: "100.00", q1: "25.00", q2: "50.00", q3: "", q4: "" },
  { indicator: "Implementation of Citizens' Service Delivery Charter", category: "Service Delivery", annualTarget: "100.00", q1: "100.00", q2: "100.00", q3: "", q4: "" },
  { indicator: "Improved Crop Varieties Developed", category: "Core Mandate", annualTarget: "100.00", q1: "30.00", q2: "55.00", q3: "", q4: "" },
];

const COLUMNS = [
  { key: "##", label: "##" },
  { key: "indicator", label: "Performance Indicator" },
  { key: "category", label: "Category" },
  { key: "annualTarget", label: "Annual Target" },
  { key: "q1", label: "Q1 Achievement" },
  { key: "q2", label: "Q2 Achievement" },
  { key: "q3", label: "Q3 Achievement" },
  { key: "q4", label: "Q4 Achievement" },
  { key: "execute", label: "Execute" },
];

function CaptureAchievementPage() {
  const [quarter, setQuarter] = useState("");
  const [category, setCategory] = useState("");
  const [indicator, setIndicator] = useState("");
  const [achievement, setAchievement] = useState("");
  const [data, setData] = useState(INITIAL_DATA);

  const handleDelete = (idx) => setData((d) => d.filter((_, i) => i !== idx));

  return (
    <div className="max-w-5xl">
      <h1 className="mb-6 text-xl font-bold text-emerald-800">Capture Cumulative Achievement</h1>

      <div className="mb-6 overflow-hidden rounded border border-gray-200 bg-white">
        <PCFormRow label="MDA Name:"><PCReadonlyInput value="Kenya Agricultural and Livestock Research Organization" /></PCFormRow>
        <PCFormRow label="Contract Period:"><PCReadonlyInput value="2025/2026" /></PCFormRow>
        <PCFormRow label="Reporting Quarter *" required>
          <PCSelect value={quarter} onChange={(e) => setQuarter(e.target.value)} options={QUARTERS} placeholder="-Select Quarter-" />
        </PCFormRow>
        <PCFormRow label="Performance Category *" required>
          <PCSelect value={category} onChange={(e) => setCategory(e.target.value)} options={CATEGORIES} placeholder="-Select Category-" />
        </PCFormRow>
        <PCFormRow label="Performance Indicator *" required>
          <PCInput value={indicator} onChange={(e) => setIndicator(e.target.value)} placeholder="Select or enter indicator" />
        </PCFormRow>
        <PCFormRow label="Cumulative Achievement *" required>
          <PCInput value={achievement} onChange={(e) => setAchievement(e.target.value)} placeholder="e.g. 75.00" />
        </PCFormRow>
      </div>

      <div className="mb-6"><PCSaveButton /></div>

      <h2 className="mb-3 text-base font-bold text-emerald-800">Captured Cumulative Achievements</h2>
      <PCTable columns={COLUMNS} data={data} onDelete={handleDelete} onEdit={() => {}} />
    </div>
  );
}

export default CaptureAchievementPage;