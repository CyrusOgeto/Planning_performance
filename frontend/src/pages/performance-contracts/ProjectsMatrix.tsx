// import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PCFormRow, PCReadonlyInput, PCInput, PCSelect, PCSaveButton } from "@/components/pc/PCFormRow";
import { PCTable } from "@/components/pc/PCTable";

// export const Route = createFileRoute("/performance-contracts/projects-matrix")({
//   component: ProjectsMatrixPage,
// });

const COLUMNS = [
  { key: "##", label: "##" },
  { key: "project", label: "Project Name" },
  { key: "output", label: "Expected Output" },
  { key: "budget", label: "Budget (Kshs.)" },
  { key: "timeline", label: "Timeline" },
  { key: "delete", label: "Delete" },
];

function ProjectsMatrixPage() {
  const [project, setProject] = useState("");
  const [output, setOutput] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [data, setData] = useState([]);

  const handleSave = () => {
    if (!project.trim()) return;
    setData((d) => [...d, { project, output, budget, timeline }]);
    setProject(""); setOutput(""); setBudget(""); setTimeline("");
  };
  const handleDelete = (idx: number) => setData((d) => d.filter((_, i) => i !== idx));

  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 text-xl font-bold text-emerald-800">Projects Matrix</h1>

      <div className="mb-6 overflow-hidden rounded border border-gray-200 bg-white">
        <PCFormRow label="MDA Name:"><PCReadonlyInput value="Kenya Agricultural and Livestock Research Organization" /></PCFormRow>
        <PCFormRow label="Contract Period:"><PCReadonlyInput value="2025/2026" /></PCFormRow>
        <PCFormRow label="Project Name *" required><PCInput value={project} onChange={(e) => setProject(e.target.value)} /></PCFormRow>
        <PCFormRow label="Expected Output *" required><PCInput value={output} onChange={(e) => setOutput(e.target.value)} /></PCFormRow>
        <PCFormRow label="Budget (Kshs.)"><PCInput value={budget} onChange={(e) => setBudget(e.target.value)} /></PCFormRow>
        <PCFormRow label="Timeline">
          <PCSelect value={timeline} onChange={(e) => setTimeline(e.target.value)} options={["Q1", "Q2", "Q3", "Q4", "Full Year"]} placeholder="-Select Timeline-" />
        </PCFormRow>
      </div>

      <div className="mb-6"><PCSaveButton onClick={handleSave} /></div>

      <h2 className="mb-3 text-base font-bold text-emerald-800">Captured Projects</h2>
      <PCTable columns={COLUMNS} data={data} onDelete={handleDelete} />
    </div>
  );
}

export default ProjectsMatrixPage;