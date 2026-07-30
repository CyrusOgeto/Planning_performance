// import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PCFormRow, PCReadonlyInput, PCInput, PCSelect, PCSaveButton } from "@/components/pc/PCFormRow";
import { PCTable } from "@/components/pc/PCTable";

// export const Route = createFileRoute("/performance-contracts/matrix-affirmative")({
//   component: MatrixAffirmativePage,
// });

const INDICATORS = [
  "Access to Government Procurement Opportunities",
  "Promotion of Local Content in Procurement",
  "Youth, Women and PWD Access to Procurement",
];
const UNITS = ["%", "Kshs.", "Number", "Days"];

const INITIAL_DATA = [
  { indicator: "Access to Government Procurement Opportunities", unit: "Kshs.", weight: "2.00", statusPrev: "262,190,849.07", annualTarget: "403,006,143.60" },
  { indicator: "Promotion of Local Content in Procurement", unit: "Kshs.", weight: "2.00", statusPrev: "984,342,846.79", annualTarget: "537,341,524.80" },
];

const COLUMNS = [
  { key: "##", label: "##" },
  { key: "indicator", label: "Performance Indicator" },
  { key: "unit", label: "Unit of Measure" },
  { key: "weight", label: "Weight" },
  { key: "statusPrev", label: "Status Previous Year" },
  { key: "annualTarget", label: "Annual Target" },
  { key: "delete", label: "Delete" },
];

function MatrixAffirmativePage() {
  const [indicator, setIndicator] = useState("");
  const [unit, setUnit] = useState("");
  const [weight, setWeight] = useState("");
  const [statusPrev, setStatusPrev] = useState("");
  const [annualTarget, setAnnualTarget] = useState("");
  const [data, setData] = useState(INITIAL_DATA);

  const handleSave = () => {
    if (!indicator || !unit || !weight) return;
    setData((d) => [...d, { indicator, unit, weight, statusPrev, annualTarget }]);
    setIndicator(""); setUnit(""); setWeight(""); setStatusPrev(""); setAnnualTarget("");
  };
  const handleDelete = (idx: number) => setData((d) => d.filter((_, i) => i !== idx));

  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 text-xl font-bold text-emerald-800">Affirmative Action in Procurement Performance Indicator</h1>

      <div className="mb-6 overflow-hidden rounded border border-gray-200 bg-white">
        <PCFormRow label="MDA Name:"><PCReadonlyInput value="Kenya Agricultural and Livestock Research Organization" /></PCFormRow>
        <PCFormRow label="Contract Period:"><PCReadonlyInput value="2025/2026" /></PCFormRow>
        <PCFormRow label="Affirmative Action in Procurement Indicators*" required>
          <PCSelect value={indicator} onChange={(e) => setIndicator(e.target.value)} options={INDICATORS} placeholder="-Select Indicator-" />
        </PCFormRow>
        <PCFormRow label="Unit of Measure *" required>
          <PCSelect value={unit} onChange={(e) => setUnit(e.target.value)} options={UNITS} placeholder="-Select Unit of Measure-" />
        </PCFormRow>
        <PCFormRow label="Weight*" required><PCInput value={weight} onChange={(e) => setWeight(e.target.value)} /></PCFormRow>
        <PCFormRow label="Status Previous Year *" required><PCInput value={statusPrev} onChange={(e) => setStatusPrev(e.target.value)} /></PCFormRow>
        <PCFormRow label="Annual Target*" required><PCInput value={annualTarget} onChange={(e) => setAnnualTarget(e.target.value)} /></PCFormRow>
      </div>

      <div className="mb-6"><PCSaveButton onClick={handleSave} /></div>

      <h2 className="mb-3 text-base font-bold text-emerald-800">Captured Performance Indicators</h2>
      <PCTable columns={COLUMNS} data={data} onDelete={handleDelete} />
    </div>
  );
}

export default MatrixAffirmativePage;