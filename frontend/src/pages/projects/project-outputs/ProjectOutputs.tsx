import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight, Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteProjectOutput, useProjectOutputs } from "@/hooks/useProjectsApi";

const PAGE_SIZE = 8;

export default function ProjectOutputs() {
  const { data: items = [], isLoading } = useProjectOutputs();
  const remove = useDeleteProjectOutput();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ key: "subComponentName" | "name" | "createdAt"; direction: "asc" | "desc" }>({ key: "createdAt", direction: "desc" });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const results = useMemo(() => items.filter((item) => `${item.subComponentName} ${item.name}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => {
    const result = String(a[sort.key] ?? "").localeCompare(String(b[sort.key] ?? ""));
    return sort.direction === "asc" ? result : -result;
  }), [items, query, sort]);
  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const visible = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const toggleSort = (key: typeof sort.key) => setSort((current) => ({ key, direction: current.key === key && current.direction === "asc" ? "desc" : "asc" }));
  const removeItem = async () => { if (!deleteId) return; try { await remove.mutateAsync(deleteId); toast.success("Project Output deleted"); } catch { toast.error("Failed to delete Project Output"); } setDeleteId(null); };
  const Sort = ({ label, column }: { label: string; column: typeof sort.key }) => <button className="inline-flex items-center gap-1" onClick={() => toggleSort(column)}>{label}<ArrowUpDown className="h-3.5 w-3.5" /></button>;
  return <div className="space-y-6">
    <PageHeader title="Project Output" description="Manage Project Outputs under Sub Components." actions={<Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90"><Link to="/projects/project-outputs/new"><Plus className="h-4 w-4" /> Add New Project Output</Link></Button>} />
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between"><div className="relative w-full sm:max-w-sm"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder="Search project outputs..." value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} /></div><span className="text-sm text-muted-foreground">{results.length} output{results.length === 1 ? "" : "s"}</span></div>
      <div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead><Sort label="Sub Component" column="subComponentName" /></TableHead><TableHead><Sort label="Project Output" column="name" /></TableHead><TableHead><Sort label="Date Created" column="createdAt" /></TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>{isLoading ? <TableRow><TableCell colSpan={4} className="py-12 text-center text-muted-foreground">Loading Project Outputs...</TableCell></TableRow> : visible.length === 0 ? <TableRow><TableCell colSpan={4} className="py-12 text-center text-muted-foreground">No Project Outputs found.</TableCell></TableRow> : visible.map((item) => <TableRow key={item.id}><TableCell>{item.subComponentName}</TableCell><TableCell className="font-medium">{item.name}</TableCell><TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell><TableCell className="text-right">{deleteId === item.id ? <span className="inline-flex gap-2"><Button size="sm" variant="destructive" onClick={removeItem}>Delete</Button><Button size="sm" variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button></span> : <span className="inline-flex gap-1"><Button asChild size="sm" variant="ghost"><Link to={`/projects/project-outputs/${item.id}/view`}><Eye className="h-3.5 w-3.5" /></Link></Button><Button asChild size="sm" variant="ghost"><Link to={`/projects/project-outputs/${item.id}/edit`}><Pencil className="h-3.5 w-3.5" /></Link></Button><Button size="sm" variant="ghost" className="text-red-500" onClick={() => setDeleteId(item.id)}><Trash2 className="h-3.5 w-3.5" /></Button></span>}</TableCell></TableRow>)}</TableBody></Table></div>
      <div className="flex items-center justify-between border-t border-border p-4 text-sm"><span className="text-muted-foreground">{results.length ? `${(page - 1) * PAGE_SIZE + 1}-${(page - 1) * PAGE_SIZE + visible.length} of ${results.length}` : "0"}</span><div className="flex gap-2"><Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((value) => value - 1)}><ChevronLeft className="h-4 w-4" /> Prev</Button><Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage((value) => value + 1)}>Next <ChevronRight className="h-4 w-4" /></Button></div></div>
    </div>
  </div>;
}
