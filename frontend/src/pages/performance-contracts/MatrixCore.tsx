// import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PCFormRow, PCReadonlyInput, PCInput, PCSelect, PCSaveButton } from "@/components/pc/PCFormRow";
import { PCTable } from "@/components/pc/PCTable";

// export const Route = createFileRoute("/performance-contracts/matrix-core")({
//   component: MatrixCorePage,
// });

const INDICATORS = [
  "Improved Crop Varieties Developed",
  "Food Safety Technologies for Microbial and Mycotoxin Management",
  "Technologies for Optimal Plant Nutrition",
  "Organic Farming Technologies Developed and Promoted",
  "Breeding Bulls and Heifers Availed",
  "Breeding Sheep and Goats Availed",
];
const UNITS = ["%", "Kshs.", "Number", "Days"];

const INITIAL_DATA = [
  { indicator: "Improved Crop Varieties Developed", unit: "%", weight: "3.00", statusPrev: "100.00", annualTarget: "100.00" },
  { indicator: "Food Safety Technologies for Microbial and Mycotoxin Management Developed, Validated and Promoted", unit: "%", weight: "2.00", statusPrev: "100.00", annualTarget: "100.00" },
  { indicator: "Technologies for Optimal Plant Nutrition and Crop Productivity Developed and/or Validated and Promoted", unit: "%", weight: "2.00", statusPrev: "100.00", annualTarget: "97.88" },
  { indicator: "Organic Farming Technologies Developed and Promoted", unit: "%", weight: "2.00", statusPrev: "100.00", annualTarget: "100.00" },
];

const COLUMNS = [
  { key: "##", label: "##" },
  { key: "indicator", label: "Performance Indicators" },
  { key: "unit", label: "Unit of Measure" },
  { key: "weight", label: "Weight" },
  { key: "statusPrev", label: "Status Previous Year" },
  { key: "annualTarget", label: "Annual Target" },
  { key: "delete", label: "Delete" },
];

function MatrixCorePage() {
  const [indicator, setIndicator] = useState("");
  const [isNew, setIsNew] = useState("No");
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
      <h1 className="mb-6 text-xl font-bold text-emerald-800">Core Mandate Performance Indicators</h1>

      <div className="mb-6 overflow-hidden rounded border border-gray-200 bg-white">
        <PCFormRow label="MDA Name:"><PCReadonlyInput value="Kenya Agricultural and Livestock Research Organization" /></PCFormRow>
        <PCFormRow label="Contract Period:"><PCReadonlyInput value="2025/2026" /></PCFormRow>
        <PCFormRow label="Core Mandate Performance Indicators*" required>
          <PCSelect value={indicator} onChange={(e) => setIndicator(e.target.value)} options={INDICATORS} placeholder="-Select Indicator-" />
        </PCFormRow>
        <PCFormRow label="New Performance Indicator?*" required>
          <div className="flex items-center gap-4 py-1">
            <label className="flex items-center gap-1.5 text-sm"><input type="radio" name="isNew" value="Yes" checked={isNew === "Yes"} onChange={() => setIsNew("Yes")} />Yes</label>
            <label className="flex items-center gap-1.5 text-sm"><input type="radio" name="isNew" value="No" checked={isNew === "No"} onChange={() => setIsNew("No")} />No</label>
          </div>
          <p className="text-xs text-gray-500">(Select Yes if the Performance Indicator is new!!)</p>
        </PCFormRow>
        <PCFormRow label="Unit of Measure *" required>
          <PCSelect value={unit} onChange={(e) => setUnit(e.target.value)} options={UNITS} placeholder="-Select Unit of Measure-" />
        </PCFormRow>
        <PCFormRow label="Weight*" required>
          <PCInput value={weight} onChange={(e) => setWeight(e.target.value)} />
        </PCFormRow>
        <PCFormRow label="Status Previous Year *" required>
          <PCInput value={statusPrev} onChange={(e) => setStatusPrev(e.target.value)} />
        </PCFormRow>
        <PCFormRow label="Annual Target*" required>
          <PCInput value={annualTarget} onChange={(e) => setAnnualTarget(e.target.value)} />
        </PCFormRow>
      </div>

      <div className="mb-6"><PCSaveButton onClick={handleSave} /></div>

      <h2 className="mb-3 text-base font-bold text-emerald-800">Captured Performance Indicators</h2>
      <PCTable columns={COLUMNS} data={data} onDelete={handleDelete} />
    </div>
  );
}

export default MatrixCorePage;