// import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PCFormRow, PCReadonlyInput, PCSelect, PCTextarea, PCSaveButton } from "@/components/pc/PCFormRow";

// export const Route = createFileRoute("/performance-contracts/explanatory-core")({
//   component: ExplanatoryCorePage,
// });

const INDICATORS = [
  "Improved Crop Varieties Developed",
  "Food Safety Technologies for Microbial and Mycotoxin Management",
  "Technologies for Optimal Plant Nutrition",
  "Organic Farming Technologies Developed and Promoted",
  "Breeding Bulls and Heifers Availed",
  "Breeding Sheep and Goats Availed",
  "Breeding Camels Availed",
];

function ExplanatoryCorePage() {
  const [indicator, setIndicator] = useState("");
  const [statement, setStatement] = useState("");

  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 text-xl font-bold text-emerald-800">Explanatory Notes - Core Mandate</h1>

      <div className="mb-6 overflow-hidden rounded border border-gray-200 bg-white">
        <PCFormRow label="MDA Name:"><PCReadonlyInput value="Kenya Agricultural and Livestock Research Organization" /></PCFormRow>
        <PCFormRow label="Contract Year:"><PCReadonlyInput value="2025/2026" /></PCFormRow>
        <PCFormRow label="Core Mandate Performance Indicators *" required>
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

export default ExplanatoryCorePage;