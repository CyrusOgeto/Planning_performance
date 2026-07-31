// import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PCFormRow, PCReadonlyInput, PCInput, PCSelect, PCSaveButton } from "@/components/pc/PCFormRow";
import { PCTable } from "@/components/pc/PCTable";

// export const Route = createFileRoute("/performance-contracts/matrix-service")({
//   component: MatrixServicePage,
// });

const INDICATORS = [
  "Implementation of Citizens' Service Delivery Charter",
  "Digitalization of Government Services",
  "Resolution of Public Complaints",
  "Client Satisfaction Index",
];
const UNITS = ["%", "Kshs.", "Number", "Days"];

const INITIAL_DATA = [
  { indicator: "Implementation of Citizens' Service Delivery Charter", unit: "%", weight: "4.00", statusPrev: "100.00", annualTarget: "100.00" },
  { indicator: "Digitalization of Government Services", unit: "%", weight: "7.00", statusPrev: "100.00", annualTarget: "100.00" },
  { indicator: "Resolution of Public Complaints", unit: "%", weight: "4.00", statusPrev: "100.00", annualTarget: "100.00" },
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

function MatrixServicePage() {
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
      <h1 className="mb-6 text-xl font-bold text-emerald-800">Service Delivery Performance Indicators</h1>

      <div className="mb-6 overflow-hidden rounded border border-gray-200 bg-white">
        <PCFormRow label="MDA Name:"><PCReadonlyInput value="Kenya Agricultural and Livestock Research Organization" /></PCFormRow>
        <PCFormRow label="Contract Period:"><PCReadonlyInput value="2025/2026" /></PCFormRow>
        <PCFormRow label="Service Delivery Performance Indicators*" required>
          <PCSelect value={indicator} onChange={(e) => setIndicator(e.target.value)} options={INDICATORS} placeholder="-Select Indicator-" />
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
      <div className="mt-2 text-sm text-gray-600">
        Weight Sub-Total: {data.reduce((s, r) => s + parseFloat((r.weight || 0).toString()), 0).toFixed(2)}
      </div>
    </div>
  );
}

export default MatrixServicePage;