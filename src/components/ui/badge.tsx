import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        success: "border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]",
        warning: "border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]",
        error: "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]",
        info: "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]",
        neutral: "border-[#E5E7EB] bg-[#F9FAFB] text-[#374151]",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

