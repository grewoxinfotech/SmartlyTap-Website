"use client";

import * as React from "react";
import { Shield, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/components/admin/page-kit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminSettingsPage() {
  const [orgName, setOrgName] = React.useState("SmartlyTap");
  const [supportEmail, setSupportEmail] = React.useState("support@smartlytap.com");
  const [timezone, setTimezone] = React.useState("Asia/Kolkata");
  const [maintenance, setMaintenance] = React.useState(false);

  const [twoFactor, setTwoFactor] = React.useState(true);
  const [ipAllowlist, setIpAllowlist] = React.useState("203.0.113.10\n203.0.113.42");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Form UI with inputs, selects, and toggles."
        actions={
          <Button
            onClick={() =>
              toast.success("Settings saved", {
                description: "UI-only demo action.",
              })
            }
          >
            Save changes
          </Button>
        }
      />

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">
            <SlidersHorizontal className="h-4 w-4" /> General
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4" /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-[#111827]">
                    Organization name
                  </label>
                  <Input value={orgName} onChange={(e) => setOrgName(e.target.value)} />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium text-[#111827]">
                    Support email
                  </label>
                  <Input value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium text-[#111827]">
                    Timezone
                  </label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata</SelectItem>
                      <SelectItem value="Asia/Dubai">Asia/Dubai</SelectItem>
                      <SelectItem value="Europe/London">Europe/London</SelectItem>
                      <SelectItem value="America/New_York">America/New_York</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E5E7EB] bg-white p-4">
                  <div>
                    <div className="text-sm font-semibold text-[#111827]">
                      Maintenance mode
                    </div>
                    <div className="mt-1 text-sm text-[#6B7280]">
                      Temporarily disable public traffic.
                    </div>
                  </div>
                  <Switch checked={maintenance} onCheckedChange={setMaintenance} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Brand defaults</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                  <div className="text-xs font-semibold text-[#6B7280]">Primary</div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#4F46E5]" />
                    <div className="text-sm font-medium text-[#111827]">#4F46E5</div>
                  </div>
                </div>
                <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                  <div className="text-xs font-semibold text-[#6B7280]">Background</div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#F9FAFB] ring-1 ring-[#E5E7EB]" />
                    <div className="text-sm font-medium text-[#111827]">#F9FAFB</div>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => toast.message("Theme exported", { description: "UI-only demo action." })}
                >
                  Export theme
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Access controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E5E7EB] bg-white p-4">
                  <div>
                    <div className="text-sm font-semibold text-[#111827]">
                      Two-factor authentication
                    </div>
                    <div className="mt-1 text-sm text-[#6B7280]">
                      Require 2FA for admin logins.
                    </div>
                  </div>
                  <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium text-[#111827]">
                    IP allowlist
                  </label>
                  <textarea
                    value={ipAllowlist}
                    onChange={(e) => setIpAllowlist(e.target.value)}
                    className="min-h-[120px] w-full rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#111827] shadow-sm outline-none placeholder:text-[#9CA3AF] focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                    placeholder="One IP per line"
                  />
                  <div className="text-xs text-[#9CA3AF]">
                    Use this to restrict access from unknown networks.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  ["Chrome on Windows", "Active now"],
                  ["Safari on iPhone", "Last active 2d ago"],
                  ["Edge on Windows", "Last active 6d ago"],
                ].map(([title, meta]) => (
                  <div key={title} className="rounded-xl border border-[#E5E7EB] bg-white p-4">
                    <div className="text-sm font-semibold text-[#111827]">{title}</div>
                    <div className="mt-1 text-sm text-[#6B7280]">{meta}</div>
                    <div className="mt-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toast.message("Session revoked", { description: `${title} (UI-only)` })}
                      >
                        Revoke
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

