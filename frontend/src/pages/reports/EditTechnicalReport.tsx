import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useMainActivities,
  useSubActivities,
  useTechnicalReport,
  useUpdateTechnicalReport,
  useProjects,
} from "@/hooks/useProjectsApi";

import {
  QUARTER_OPTIONS,
  FINANCIAL_YEAR_OPTIONS,
} from "@/pages/projects/wizard/data";

import type { TechnicalReport } from "@/utils/types";

type Form = Pick<
  TechnicalReport,
  | "title"
  | "quarter"
  | "financialYear"
  | "category"
  | "valueChain"
  | "startDate"
  | "endDate"
  | "status"
  | "achievement"
  | "remarks"
  | "supportingInformation"
> & {
  projectId: string;
  mainActivityId: string;
  subActivityId: string;
  disbursedAmount: string;
  utilizedAmount: string;
};

const initial = (report: TechnicalReport): Form => ({
  title: report.title || "",
  projectId: report.projectId || "",
  quarter: report.quarter || "",
  financialYear: report.financialYear || "",
  mainActivityId: report.mainActivityId || "",
  subActivityId: report.subActivityId || "",
  category: report.category || "",
  valueChain: report.valueChain || "",
  startDate: report.startDate || "",
  endDate: report.endDate || "",
  disbursedAmount: String(report.disbursedAmount ?? 0),
  utilizedAmount: String(report.utilizedAmount ?? 0),
  status: report.status || "Draft",
  achievement: report.achievement || "",
  remarks: report.remarks || "",
  supportingInformation: report.supportingInformation || "",
});

export default function EditTechnicalReport() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: report,
    isLoading,
    isError,
    error,
  } = useTechnicalReport(id);

  const { data: projects = [] } = useProjects();
  const { data: mainActivities = [] } = useMainActivities();
  const { data: subActivities = [] } = useSubActivities();

  const update = useUpdateTechnicalReport();

  const [form, setForm] = useState<Form | null>(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (report) {
      setForm(initial(report));
    }
  }, [report]);

  const availableSubActivities = useMemo(
    () =>
      subActivities.filter(
        (item) => item.mainActivityId === form?.mainActivityId
      ),
    [subActivities, form?.mainActivityId]
  );

  if (isLoading) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        Loading technical report...
      </div>
    );
  }

  if (isError || !report) {
    return (
      <Card className="p-6">
        <p className="text-red-700">
          {error instanceof Error
            ? error.message
            : "Technical report could not be loaded."}
        </p>

        <Button asChild className="mt-4">
          <Link to="/technical-reports">Back to Technical Reports</Link>
        </Button>
      </Card>
    );
  }

  if (!form) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        Preparing edit form...
      </div>
    );
  }

  const change = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((current) =>
      current
        ? {
            ...current,
            [key]: value,
          }
        : current
    );
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError("");

    if (
      !form.title.trim() ||
      !form.projectId ||
      !form.quarter ||
      !form.financialYear
    ) {
      setFormError(
        "Title, project, financial year, and quarter are required."
      );
      return;
    }

    if (
      form.endDate &&
      form.startDate &&
      form.endDate < form.startDate
    ) {
      setFormError("End date cannot be before start date.");
      return;
    }

    try {
      const disbursed = Number(form.disbursedAmount || 0);
      const utilized = Number(form.utilizedAmount || 0);

      await update.mutateAsync({
        id: report.id,
        ...form,

        title: form.title.trim(),

        startDate: form.startDate || null,
        endDate: form.endDate || null,

        disbursedAmount: disbursed,
        utilizedAmount: utilized,

        percentageUtilization: disbursed
          ? Number(((utilized / disbursed) * 100).toFixed(2))
          : 0,

        subSubActivities: report.subSubActivities,
        indicators: report.indicators,
        supportingDocuments: report.supportingDocuments || [],
        reportingPeriod: report.reportingPeriod,
      });

      toast.success("Technical report updated successfully.");

      navigate("/technical-reports");
    } catch (reason) {
      toast.error(
        reason instanceof Error
          ? reason.message
          : "Unable to update technical report."
      );
    }
  };

  const field = (label: string, child: React.ReactNode) => (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {child}
    </div>
  );

  return (
    <>
      {/* Page Header */}
      <div className="mb-6">
        <Link
          to="/technical-reports"
          className="inline-flex items-center gap-2 rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Technical Reports
        </Link>

        <h1 className="mt-4 text-2xl font-semibold">
          Edit Technical Report
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Update the saved report and its reporting details.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={submit} className="space-y-5">
        {/* Basic Information */}
        <Card className="p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">
              Report Information
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Update the main information associated with this technical
              report.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {field(
              "Report title",
              <Input
                value={form.title}
                onChange={(e) =>
                  change("title", e.target.value)
                }
                placeholder="Enter report title"
              />
            )}

            {field(
              "Project",
              <Select
                value={form.projectId}
                onValueChange={(value) =>
                  change("projectId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>

                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem
                      key={project.id}
                      value={project.id}
                    >
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {field(
              "Financial year",
              <Select
                value={form.financialYear}
                onValueChange={(value) =>
                  change("financialYear", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select financial year" />
                </SelectTrigger>

                <SelectContent>
                  {FINANCIAL_YEAR_OPTIONS.map((value) => (
                    <SelectItem
                      key={value}
                      value={value}
                    >
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {field(
              "Quarter",
              <Select
                value={form.quarter}
                onValueChange={(value) =>
                  change("quarter", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select quarter" />
                </SelectTrigger>

                <SelectContent>
                  {QUARTER_OPTIONS.map((value) => (
                    <SelectItem
                      key={value}
                      value={value}
                    >
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {field(
              "Main activity",
              <Select
                value={form.mainActivityId}
                onValueChange={(value) => {
                  change("mainActivityId", value);
                  change("subActivityId", "");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select main activity" />
                </SelectTrigger>

                <SelectContent>
                  {mainActivities.map((activity) => (
                    <SelectItem
                      key={activity.id}
                      value={activity.id}
                    >
                      {activity.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {field(
              "Sub activity",
              <Select
                value={form.subActivityId}
                onValueChange={(value) =>
                  change("subActivityId", value)
                }
                disabled={!form.mainActivityId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sub activity" />
                </SelectTrigger>

                <SelectContent>
                  {availableSubActivities.map((activity) => (
                    <SelectItem
                      key={activity.id}
                      value={activity.id}
                    >
                      {activity.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {field(
              "Category",
              <Input
                value={form.category || ""}
                onChange={(e) =>
                  change("category", e.target.value)
                }
                placeholder="Enter category"
              />
            )}

            {field(
              "Value chain",
              <Input
                value={form.valueChain || ""}
                onChange={(e) =>
                  change("valueChain", e.target.value)
                }
                placeholder="Enter value chain"
              />
            )}

            {field(
              "Start date",
              <Input
                type="date"
                value={form.startDate || ""}
                onChange={(e) =>
                  change("startDate", e.target.value)
                }
              />
            )}

            {field(
              "End date",
              <Input
                type="date"
                value={form.endDate || ""}
                onChange={(e) =>
                  change("endDate", e.target.value)
                }
              />
            )}

            {field(
              "Amount disbursed",
              <Input
                type="number"
                min="0"
                value={form.disbursedAmount}
                onChange={(e) =>
                  change(
                    "disbursedAmount",
                    e.target.value
                  )
                }
                placeholder="0"
              />
            )}

            {field(
              "Amount utilized",
              <Input
                type="number"
                min="0"
                value={form.utilizedAmount}
                onChange={(e) =>
                  change(
                    "utilizedAmount",
                    e.target.value
                  )
                }
                placeholder="0"
              />
            )}

            {field(
              "Status",
              <Select
                value={form.status}
                onValueChange={(value) =>
                  change("status", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  {[
                    "Draft",
                    "Submitted",
                    "Under Review",
                    "Approved",
                  ].map((value) => (
                    <SelectItem
                      key={value}
                      value={value}
                    >
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </Card>

        {/* Report Details */}
        <Card className="space-y-5 p-6">
          <div>
            <h2 className="text-lg font-semibold">
              Report Details
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Provide the achievements, remarks, and supporting
              information for this report.
            </p>
          </div>

          {field(
            "Achievement",
            <Textarea
              rows={5}
              value={form.achievement}
              onChange={(e) =>
                change("achievement", e.target.value)
              }
              placeholder="Describe the achievements made during this reporting period..."
            />
          )}

          {field(
            "Remarks",
            <Textarea
              rows={5}
              value={form.remarks}
              onChange={(e) =>
                change("remarks", e.target.value)
              }
              placeholder="Enter any remarks or observations..."
            />
          )}

          {field(
            "Supporting information",
            <Textarea
              rows={5}
              value={form.supportingInformation || ""}
              onChange={(e) =>
                change(
                  "supportingInformation",
                  e.target.value
                )
              }
              placeholder="Enter any additional supporting information..."
            />
          )}

          {/* Retained Information */}
          <div className="rounded-md border bg-muted/20 p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">
              Retained information
            </p>

            <p className="mt-1">
              Sub-sub activities, indicators, reporting period,
              and supporting documents are retained when this
              report is updated.
            </p>
          </div>

          {/* Error */}
          {formError && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {formError}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 border-t pt-5">
            <Button
              asChild
              type="button"
              variant="outline"
            >
              <Link to="/technical-reports">
                Cancel
              </Link>
            </Button>

            <Button
              type="submit"
              disabled={update.isPending}
            >
              {update.isPending
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </div>
        </Card>
      </form>
    </>
  );
}