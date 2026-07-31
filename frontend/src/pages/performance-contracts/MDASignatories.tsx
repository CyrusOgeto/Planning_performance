// import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PCFormRow, PCReadonlyInput, PCInput, PCSelect, PCSaveButton } from "@/components/pc/PCFormRow";
import { PCTable } from "@/components/pc/PCTable";
import { useNavigate } from "@tanstack/react-router";

// export const Route = createFileRoute("/performance-contracts/MDASignatories")({
//   component: MDASignatoriesPage,
// });



const DESIGNATIONS = ["Chairperson", "Independent Board Member", "Cabinet Secretary", "Chief Executive Officer", "Director General"];
const SIGNING_FOR = ["For MDA", "For Government", "Counter Signing for Government", "As Witness"];

const INITIAL_SIGNATORIES = [
  { name: "Dr. THUO MATHENGE", designation: "Chairperson", signingFor: "For MDA" },
  { name: "HON. JOHANA CHERUYIOT", designation: "Independent Board Member", signingFor: "For MDA" },
  { name: "SEN. MUTAHI KAGWE, EGH", designation: "Cabinet Secretary", signingFor: "For Government" },
  { name: "HON. FCPA JOHN MBADI NG'ONGO, EGH", designation: "Cabinet Secretary", signingFor: "Counter Signing for Government" },
];

const COLUMNS = [
  { key: "##", label: "##" },
  { key: "name", label: "Signatory Name" },
  { key: "designation", label: "Designation" },
  { key: "signingFor", label: "Signing For" },
  { key: "execute", label: "Execute" },
];

function MDASignatoriesPage() {
  const [signatoryName, setSignatoryName] = useState("");
  const [designation, setDesignation] = useState("");
  const [signingFor, setSigningFor] = useState("");
  const [signatories, setSignatories] = useState(INITIAL_SIGNATORIES);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const navigate = useNavigate();

  // navigate({
  //   to: "/performance-contracts/MDASignatories",
  // });

  const handleSave = () => {
    if (!signatoryName.trim() || !designation || !signingFor) return;
    setSignatories((prev) => [...prev, { name: signatoryName, designation, signingFor }]);
    setSignatoryName("");
    setDesignation("");
    setSigningFor("");
  };

  const handleDelete = (idx: number) => setSignatories((s) => s.filter((_, i) => i !== idx));

  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 text-xl font-bold text-emerald-800">MDA Logo and Signatories</h1>

      <div className="mb-6 overflow-hidden rounded border border-gray-200 bg-white">
        <PCFormRow label="MDA Name:">
          <PCReadonlyInput value="Kenya Agricultural and Livestock Research Organization" />
        </PCFormRow>
        <PCFormRow label="Contract Period:">
          <PCReadonlyInput value="2025/2026" />
        </PCFormRow>
        <PCFormRow label="Attach MDA Logo *" required>
          <div className="flex items-start gap-4">
            <div>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm hover:bg-gray-100">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                />
                Choose File
              </label>
              <span className="ml-2 text-sm text-gray-500">
                {logoFile ? logoFile.name : "No file chosen"}
              </span>
              <div className="mt-2 flex gap-2">
                <button className="rounded bg-emerald-600 px-3 py-1 text-xs text-white hover:bg-emerald-700">
                  Upload Logo
                </button>
                <button className="rounded border border-gray-300 px-3 py-1 text-xs text-gray-700 hover:bg-gray-50">
                  View Logo
                </button>
              </div>
            </div>
            <div className="h-24 w-28 rounded border border-gray-200 bg-gray-50" />
          </div>
        </PCFormRow>
        <PCFormRow label="Signatory Name:(Including Decorations)">
          <PCInput
            value={signatoryName}
            onChange={(e) => setSignatoryName(e.target.value)}
            placeholder="e.g. Dr. JOHN DOE, EGH"
          />
        </PCFormRow>
        <PCFormRow label="Designation:">
          <PCSelect
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            options={DESIGNATIONS}
            placeholder="Select Designation"
          />
        </PCFormRow>
        <PCFormRow label="Signing For:">
          <PCSelect
            value={signingFor}
            onChange={(e) => setSigningFor(e.target.value)}
            options={SIGNING_FOR}
            placeholder="-Select Signature For-"
          />
        </PCFormRow>
      </div>

      <div className="mb-6">
        <PCSaveButton onClick={handleSave} />
      </div>

      <h2 className="mb-3 text-base font-bold text-emerald-800">Institution Signatories</h2>
      <PCTable columns={COLUMNS} data={signatories} onDelete={handleDelete} onEdit={() => { }} />
    </div>
  );
}

export default MDASignatoriesPage;