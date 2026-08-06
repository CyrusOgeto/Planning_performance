import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { ArrowUpDown, BarChart2, ChevronLeft, ChevronRight, Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useActivityIndicators, useDeleteActivityIndicator } from "@/hooks/useProjectsApi";
import type { ActivityIndicator } from "@/utils/types";

const GROUPS_PER_PAGE = 3;
type SortKey = "indicator" | "projectOutputName" | "mainActivityName" | "target" | "unitOfMeasure" | "createdAt";

export default function ActivityIndicators() {
  const { data: items = [], isLoading } = useActivityIndicators();
  const deleteItem = useDeleteActivityIndicator();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [sort, setSort] = useState<{ key: SortKey; direction: "asc" | "desc" }>({ key: "createdAt", direction: "desc" });

  const groups = useMemo(() => {
    const term = query.trim().toLowerCase();
    const matching = items.filter((item) => !term || [item.subComponentName, item.indicator, item.projectOutputName, item.mainActivityName, item.target, item.unitOfMeasure].some((value) => (value ?? "").toLowerCase().includes(term)));
    const sorted = [...matching].sort((left, right) => {
      const comparison = String(left[sort.key] ?? "").localeCompare(String(right[sort.key] ?? ""));
      return sort.direction === "asc" ? comparison : -comparison;
    });
    return sorted.reduce<Array<{ key: string; name: string; subComponentName: string; indicators: ActivityIndicator[] }>>((all, item) => {
      const key = item.mainActivityId ?? `unassigned-${item.subComponentId}`;
      const name = item.mainActivityName || "No Main Activity Assigned";
      const group = all.find((entry) => entry.key === key);
      if (group) group.indicators.push(item); else all.push({ key, name, subComponentName: item.subComponentName || "Unassigned Sub Component", indicators: [item] });
      return all;
    }, []);
  }, [items, query, sort]);

  const totalPages = Math.max(1, Math.ceil(groups.length / GROUPS_PER_PAGE));
  const visibleGroups = groups.slice((page - 1) * GROUPS_PER_PAGE, page * GROUPS_PER_PAGE);
  const indicatorCount = groups.reduce((total, group) => total + group.indicators.length, 0);
  const toggleSort = (key: SortKey) => setSort((current) => ({ key, direction: current.key === key && current.direction === "asc" ? "desc" : "asc" }));
  const handleDelete = async () => { if (!deleteId) return; try { await deleteItem.mutateAsync(deleteId); toast.success("Indicator deleted"); } catch { toast.error("Failed to delete Indicator"); } setDeleteId(null); };
  const SortButton = ({ label, sortKey }: { label: string; sortKey: SortKey }) => <button type="button" onClick={() => toggleSort(sortKey)} className="inline-flex items-center gap-1">{label}<ArrowUpDown className="h-3.5 w-3.5" /></button>;

  return <div className="space-y-6">
    <PageHeader title="Indicator" description="Manage Indicators grouped by Main Activity." actions={<Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90"><Link to="/projects/activity-indicators/new"><Plus className="h-4 w-4" /> Add New Indicator</Link></Button>} />
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:max-w-xs"><div className="flex items-center gap-3"><div className="rounded-lg bg-primary/10 p-2.5"><BarChart2 className="h-5 w-5 text-primary" /></div><div><p className="text-xs text-muted-foreground">Total Indicators</p><p className="text-2xl font-bold text-foreground">{items.length}</p></div></div></div>
    <div className="rounded-xl border border-border bg-card shadow-sm"><div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between"><div className="relative w-full sm:max-w-sm"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search indicators, outputs, or activities..." value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} className="pl-9" /></div><span className="text-sm text-muted-foreground">{indicatorCount} indicator{indicatorCount === 1 ? "" : "s"} in {groups.length} Main Activit{groups.length === 1 ? "y" : "ies"}</span></div></div>
    {isLoading ? <div className="rounded-xl border border-border bg-card p-12 text-center text-sm text-muted-foreground">Loading Indicators...</div> : visibleGroups.length === 0 ? <div className="rounded-xl border border-border bg-card p-12 text-center text-sm text-muted-foreground">{query ? "No Indicators match your search." : "No Indicators yet. Click 'Add New Indicator' to get started."}</div> : visibleGroups.map((group) => <section key={group.key} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"><div className="border-b border-primary/20 bg-primary/5 px-5 py-4"><h2 className="font-semibold text-primary">Main Activity: {group.name}</h2><p className="mt-1 text-xs text-muted-foreground">Sub Component: {group.subComponentName} · {group.indicators.length} Indicator{group.indicators.length === 1 ? "" : "s"}</p></div><div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead><SortButton label="Indicator" sortKey="indicator" /></TableHead><TableHead><SortButton label="Project Output" sortKey="projectOutputName" /></TableHead><TableHead><SortButton label="Target" sortKey="target" /></TableHead><TableHead><SortButton label="Unit of Measure" sortKey="unitOfMeasure" /></TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>{group.indicators.map((item) => <TableRow key={item.id}><TableCell className="font-medium">{item.indicator}</TableCell><TableCell>{item.projectOutputName || "-"}</TableCell><TableCell>{item.target || "-"}</TableCell><TableCell>{item.unitOfMeasure || "-"}</TableCell><TableCell className="text-right">{deleteId === item.id ? <span className="inline-flex gap-2"><Button size="sm" variant="destructive" onClick={handleDelete}>Delete</Button><Button size="sm" variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button></span> : <span className="inline-flex gap-1"><Button asChild size="sm" variant="ghost"><Link to={`/projects/activity-indicators/${item.id}/view`} aria-label="View Indicator"><Eye className="h-3.5 w-3.5" /></Link></Button><Button asChild size="sm" variant="ghost"><Link to={`/projects/activity-indicators/${item.id}/edit`} aria-label="Edit Indicator"><Pencil className="h-3.5 w-3.5" /></Link></Button><Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50 hover:text-red-600" onClick={() => setDeleteId(item.id)} aria-label="Delete Indicator"><Trash2 className="h-3.5 w-3.5" /></Button></span>}</TableCell></TableRow>)}</TableBody></Table></div></section>)}
    <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4 text-sm"><span className="text-muted-foreground">{groups.length === 0 ? "0" : `Main Activities ${(page - 1) * GROUPS_PER_PAGE + 1}-${Math.min(page * GROUPS_PER_PAGE, groups.length)} of ${groups.length}`}</span><div className="flex items-center gap-2"><Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((value) => value - 1)}><ChevronLeft className="h-4 w-4" /> Prev</Button><span className="text-muted-foreground">Page {page} / {totalPages}</span><Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage((value) => value + 1)}>Next <ChevronRight className="h-4 w-4" /></Button></div></div>
  </div>;
}
