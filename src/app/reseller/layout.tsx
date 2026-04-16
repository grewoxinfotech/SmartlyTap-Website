import { ResellerShell } from "@/components/reseller/reseller-shell";

export default function ResellerLayout({ children }: { children: React.ReactNode }) {
  return <ResellerShell>{children}</ResellerShell>;
}

