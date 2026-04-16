"use client";

import * as React from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-[28px] font-semibold tracking-[-0.02em] text-[#111827]">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 text-sm text-[#6B7280]">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const variant =
    status === "Paid" || status === "Active" || status === "Success"
      ? "success"
      : status === "Pending"
        ? "warning"
        : status === "Processing"
          ? "info"
          : status === "Failed" || status === "Error"
            ? "error"
            : "neutral";

  return <Badge variant={variant}>{status}</Badge>;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="grid place-items-center rounded-xl border border-dashed border-[#E5E7EB] bg-white p-10 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      <div className="max-w-md">
        <div className="text-sm font-semibold text-[#111827]">{title}</div>
        <div className="mt-1 text-sm text-[#6B7280]">{description}</div>
        {actionLabel && onAction ? (
          <div className="mt-5 flex justify-center">
            <Button
              variant="secondary"
              onClick={() => {
                onAction();
                toast.success("Action triggered");
              }}
            >
              {actionLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (next: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex items-center justify-between gap-3 border-t border-[#E5E7EB] px-4 py-3">
      <div className="text-xs text-[#6B7280]">
        Page <span className="font-medium text-[#111827]">{page}</span> of{" "}
        <span className="font-medium text-[#111827]">{totalPages}</span> ·{" "}
        <span className="font-medium text-[#111827]">{total}</span> results
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={!canPrev}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={!canNext}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export function StatCard({
  title,
  value,
  deltaLabel,
  deltaTone,
  icon,
}: {
  title: string;
  value: string;
  deltaLabel: string;
  deltaTone: "up" | "down" | "flat";
  icon: React.ReactNode;
}) {
  const toneClass =
    deltaTone === "up"
      ? "text-[#16A34A] bg-[#F0FDF4] border-[#BBF7D0]"
      : deltaTone === "down"
        ? "text-[#DC2626] bg-[#FEF2F2] border-[#FECACA]"
        : "text-[#374151] bg-[#F9FAFB] border-[#E5E7EB]";

  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-[1px] hover:shadow-[0_14px_30px_rgba(0,0,0,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-medium text-[#6B7280]">{title}</div>
          <div className="mt-2 text-3xl font-semibold tracking-tight text-[#111827]">
            {value}
          </div>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-full bg-[#EEF2FF] text-[#4F46E5] ring-1 ring-[#C7D2FE]">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className={cn("rounded-full border px-2 py-0.5 text-xs font-medium", toneClass)}>
          {deltaLabel}
        </span>
        <span className="text-xs text-[#9CA3AF]">vs last 30 days</span>
      </div>
    </div>
  );
}

