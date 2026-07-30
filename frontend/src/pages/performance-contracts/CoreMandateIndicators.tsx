import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PCFormRow, PCReadonlyInput, PCSelect, PCTextarea, PCSaveButton } from "@/components/pc/PCFormRow";
import { PCTable } from "@/components/pc/PCTable";

// export const Route = createFileRoute("/performance-contracts/core-mandate-indicators")({
//   component: CoreMandateIndicatorsPage,
// });

const CLASSIFICATIONS = [
  "Crop Research", "Livestock Research", "Food Safety", "Agricultural Engineering",
  "Biotechnology", "Soil & Water Management", "Policy & Strategy",
];

const INITIAL_DATA = [
  { criteria: "Core Mandate", classification: "", code: "C57_1", name: "Improved Crop Varieties Developed", decline: "False" },
  { criteria: "Core Mandate", classification: "", code: "C57_10", name: "Food Safety Technologies for Microbial and Mycotoxin Management Developed, Validated and Promoted", decline: "False" },
  { criteria: "Core Mandate", classification: "", code: "C57_11", name: "Technologies for Optimal Plant Nutrition and Crop Productivity Developed and/or Validated and Promoted", decline: "False" },
  { criteria: "Core Mandate", classification: "", code: "C57_12", name: "Organic Farming Technologies Developed and Promoted", decline: "False" },
  { criteria: "Core Mandate", classification: "", code: "C57_13", name: "Technologies for Planning and Sustainable Land Management in Crops and Livestock Developed", decline: "False" },
  { criteria: "Core Mandate", classification: "", code: "C57_15", name: "Climate Change Adaptation and Mitigation and Environmentally Sustainable Technologies Validated and Promoted", decline: "False" },
  { criteria: "Core Mandate", classification: "", code: "C57_16", name: "Breeding Bulls and Heifers Availed", decline: "False" },
  { criteria: "Core Mandate", classification: "", code: "C57_17", name: "Breeding Sheep and Goats Availed", decline: "False" },
  { criteria: "Core Mandate", classification: "", code: "C57_18", name: "Breeding Camels Availed", decline: "False" },
];

const COLUMNS = [
  { key: "##", label: "##" },
  { key: "criteria", label: "Performance Criteria" },
  { key: "classification", label: "Core Mandate Classification" },
  { key: "code", label: "Performance Indicator Code" },
  { key: "name", label: "Performance Indicator Name", link: true },
  { key: "decline", label: "Decline Status" },
  { key: "execute", label: "Execute" },
];

function CoreMandateIndicatorsPage() {
  const [classification, setClassification] = useState("");
  const [indicators, setIndicators] = useState("");
  const [declining, setDeclining] = useState("No");
  const [data, setData] = useState(INITIAL_DATA);

  const handleSave = () => {
    if (!classification || !indicators.trim()) return;
    const newIndicators = indicators.split("\n").map((name) => ({ criteria: "Core Mandate", classification, code: "", name, decline: declining }));
    setData((prev) => [...prev, ...newIndicators]);
    setClassification("");
    setIndicators("");
    setDeclining("No");
  };

  const handleDelete = (idx: number) => setData((d) => d.filter((_, i) => i !== idx));

  // const handleDelete = (idx) => setData((d) => d.filter((_, i) => i !== idx));

  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 text-xl font-bold text-emerald-800">Define MDA Core Mandate Performance Indicators</h1>

      <div className="mb-6 overflow-hidden rounded border border-gray-200 bg-white">
        <PCFormRow label="MDA Name:">
          <PCReadonlyInput value="Kenya Agricultural and Livestock Research Organization" />
        </PCFormRow>
        <PCFormRow label="Contract Year:">
          <PCReadonlyInput value="2025/2026" />
        </PCFormRow>
        <PCFormRow label="Performance Criteria:">
          <PCReadonlyInput value="Core Mandate" />
        </PCFormRow>
        <PCFormRow label="Core Mandate Classifications">
          <PCSelect
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
            options={CLASSIFICATIONS}
            placeholder="Select Core Mandate Classifications"
          />
        </PCFormRow>
        <PCFormRow label="Performance Indicators *" required>
          <PCTextarea value={indicators} onChange={(e) => setIndicators(e.target.value)} rows={4} />
        </PCFormRow>
        <PCFormRow label="Declining Status Checkbox">
          <div className="flex items-center gap-4 py-1">
            <label className="flex items-center gap-1.5 text-sm">
              <input type="radio" name="declining" value="Yes" checked={declining === "Yes"} onChange={() => setDeclining("Yes")} />
              Yes
            </label>
            <label className="flex items-center gap-1.5 text-sm">
              <input type="radio" name="declining" value="No" checked={declining === "No"} onChange={() => setDeclining("No")} />
              No
            </label>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            (Select Yes if the indicator has a decline effect i.e. where less is better)
          </p>
        </PCFormRow>
      </div>

      <div className="mb-6">
        <PCSaveButton onClick={handleSave} />
      </div>

      <h2 className="mb-3 text-base font-bold text-emerald-800">Captured Core Mandate Performance Indicators</h2>
      <PCTable columns={COLUMNS} data={data} onDelete={handleDelete} onEdit={() => {}} />
    </div>
  );
}

export default CoreMandateIndicatorsPage;