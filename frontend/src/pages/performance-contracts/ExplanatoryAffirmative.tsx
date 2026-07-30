// import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PCFormRow, PCReadonlyInput, PCSelect, PCTextarea, PCSaveButton } from "@/components/pc/PCFormRow";

// export const Route = createFileRoute("/performance-contracts/explanatory-affirmative")({
//   component: ExplanatoryAffirmativePage,
// });

const INDICATORS = [
  "Access to Government Procurement Opportunities",
  "Promotion of Local Content in Procurement",
];

function ExplanatoryAffirmativePage() {
  const [indicator, setIndicator] = useState("");
  const [statement, setStatement] = useState("");

  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 text-xl font-bold text-emerald-800">Explanatory Notes - Affirmative Action in Procurement</h1>

      <div className="mb-6 overflow-hidden rounded border border-gray-200 bg-white">
        <PCFormRow label="MDA Name:"><PCReadonlyInput value="Kenya Agricultural and Livestock Research Organization" /></PCFormRow>
        <PCFormRow label="Contract Year:"><PCReadonlyInput value="2025/2026" /></PCFormRow>
        <PCFormRow label="Affirmative Action Indicators *" required>
          <PCSelect value={indicator} onChange={(e) => setIndicator(e.target.value)} options={INDICATORS} placeholder="-Select Indicator-" />
        </PCFormRow>
        <PCFormRow label="Introductory Statement *" required>
          <PCTextarea value={statement} onChange={(e) => setStatement(e.target.value)} rows={5} />
        </PCFormRow>
      </div>

      <PCSaveButton />
    </div>
  );
}

export default ExplanatoryAffirmativePage;
