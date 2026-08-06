import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateProjectOutputs, useProjectOutputs, useProjectSubComponents, useUpdateProjectOutput } from "@/hooks/useProjectsApi";

interface Props { mode?: "create" | "edit" | "view" }
interface Row { key: string; name: string; error?: string }
const row = (): Row => ({ key: Math.random().toString(36).slice(2), name: "" });

export default function ProjectOutputForm({ mode = "create" }: Props) {
  const navigate = useNavigate(); const { id } = useParams<{ id: string }>();
  const { data: subComponents = [] } = useProjectSubComponents(); const { data: outputs = [] } = useProjectOutputs();
  const create = useCreateProjectOutputs(); const update = useUpdateProjectOutput();
  const [subComponentId, setSubComponentId] = useState(""); const [rows, setRows] = useState<Row[]>([row()]); const [subError, setSubError] = useState("");
  const isView = mode === "view";
  useEffect(() => { if (mode !== "create" && id && outputs.length) { const item = outputs.find((output) => output.id === id); if (!item) { toast.error("Project Output not found"); navigate("/projects/project-outputs"); return; } setSubComponentId(item.subComponentId); setRows([{ key: item.id, name: item.name }]); } }, [id, mode, navigate, outputs]);
  const save = async (event: React.FormEvent) => { event.preventDefault(); const checked = rows.map((item) => ({ ...item, error: item.name.trim() ? "" : "Project Output is required" })); setRows(checked); setSubError(subComponentId ? "" : "Please select a Sub Component"); if (!subComponentId || checked.some((item) => item.error)) return; try { if (mode === "create") { await create.mutateAsync(checked.map((item) => ({ subComponentId, name: item.name.trim() }))); toast.success(`${checked.length} Project Output${checked.length === 1 ? "" : "s"} created`); } else { await update.mutateAsync({ id: id!, subComponentId, name: checked[0].name.trim() }); toast.success("Project Output updated"); } navigate("/projects/project-outputs"); } catch (error) { toast.error(error instanceof Error ? error.message : "Failed to save Project Output"); } };
  return <div className="space-y-6"><PageHeader title={mode === "create" ? "Add New Project Output" : mode === "edit" ? "Edit Project Output" : "View Project Output"} description="Create one or more Project Outputs under a Sub Component." actions={<Button asChild variant="outline"><Link to="/projects/project-outputs"><ArrowLeft className="h-4 w-4" /> Back</Link></Button>} />
    <form onSubmit={save} className="space-y-4"><div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5"><div className="max-w-2xl space-y-1.5"><Label>Sub Component {!isView && <span className="text-red-600">*</span>}</Label>{isView ? <Input disabled value={subComponents.find((item) => item.id === subComponentId)?.name ?? ""} /> : <select value={subComponentId} onChange={(event) => setSubComponentId(event.target.value)} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"><option value="">- Select Sub Component -</option>{subComponents.map((item) => <option key={item.id} value={item.id}>{item.componentName} - {item.name}</option>)}</select>}{subError && <p className="text-xs text-red-600">{subError}</p>}</div><div className="space-y-4"><div className="flex items-center justify-between"><h2 className="font-semibold">Project Outputs</h2>{mode === "create" && <Button type="button" variant="outline" size="sm" onClick={() => setRows((items) => [...items, row()])}><Plus className="h-3.5 w-3.5" /> Add Another Project Output</Button>}</div>{rows.map((item, index) => <div key={item.key} className="rounded-lg border border-border p-4"><div className="mb-2 flex justify-between"><Label>Project Output {index + 1} {!isView && <span className="text-red-600">*</span>}</Label>{mode === "create" && rows.length > 1 && <Button type="button" size="sm" variant="ghost" className="text-red-500" onClick={() => setRows((items) => items.filter((candidate) => candidate.key !== item.key))}><Trash2 className="h-3.5 w-3.5" /></Button>}</div><Input disabled={isView} value={item.name} onChange={(event) => setRows((items) => items.map((candidate) => candidate.key === item.key ? { ...candidate, name: event.target.value, error: "" } : candidate))} placeholder="Enter Project Output" />{item.error && <p className="mt-1 text-xs text-red-600">{item.error}</p>}</div>)}</div></div>{!isView && <div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => navigate("/projects/project-outputs")}>Cancel</Button><Button type="submit"><Save className="h-4 w-4" /> Save</Button></div>}{isView && <div className="flex justify-end"><Button asChild><Link to={`/projects/project-outputs/${id}/edit`}>Edit</Link></Button></div>}</form>
  </div>;
}
