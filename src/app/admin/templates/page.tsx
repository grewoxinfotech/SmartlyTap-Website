"use client";

import * as React from "react";
import { LayoutTemplate, Search } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/admin/page-kit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/admin/page-kit";

const templates = [
  { id: "TPL-01", name: "Minimal Profile", tag: "Popular", tone: "info" as const },
  { id: "TPL-02", name: "Creator Links", tag: "New", tone: "success" as const },
  { id: "TPL-03", name: "Business Card", tag: "Verified", tone: "neutral" as const },
  { id: "TPL-04", name: "Portfolio Grid", tag: "Premium", tone: "warning" as const },
  { id: "TPL-05", name: "Landing CTA", tag: "Conversion", tone: "info" as const },
  { id: "TPL-06", name: "Event RSVP", tag: "Seasonal", tone: "neutral" as const },
];

export default function AdminTemplatesPage() {
  const [query, setQuery] = React.useState("");

  const filtered = templates.filter((t) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return t.name.toLowerCase().includes(q) || t.id.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Templates"
        description="Card landing templates in a clean, card-based grid."
        actions={
          <Button onClick={() => toast.success("Template created", { description: "UI-only demo action." })}>
            Create template
          </Button>
        }
      />

      <Card>
        <CardHeader className="p-6 pb-0">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Template gallery</CardTitle>
              <div className="mt-1 text-sm text-[#6B7280]">
                Keep templates minimal, high-contrast, and easy to scan.
              </div>
            </div>
            <div className="relative w-full md:w-[320px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
              <Input
                placeholder="Search templates..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {filtered.length === 0 ? (
            <EmptyState
              title="No templates found"
              description="Try a different keyword."
              actionLabel="Clear search"
              onAction={() => setQuery("")}
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((t) => (
                <div
                  key={t.id}
                  className="rounded-xl border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-[1px]"
                >
                  <div className="aspect-[16/10] rounded-t-xl border-b border-[#E5E7EB] bg-gradient-to-br from-[#EEF2FF] via-white to-[#EFF6FF] p-4">
                    <div className="flex h-full items-center justify-center">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-[#4F46E5] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                        <LayoutTemplate className="h-7 w-7" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-[#111827]">
                          {t.name}
                        </div>
                        <div className="mt-1 text-xs text-[#9CA3AF]">{t.id}</div>
                      </div>
                      <Badge variant={t.tone}>{t.tag}</Badge>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => toast.message("Preview", { description: `${t.name} (UI-only)` })}
                      >
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toast.message("Edit", { description: `${t.name} (UI-only)` })}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

