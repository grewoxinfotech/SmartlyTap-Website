"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 30_000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <Toaster
        richColors
        position="top-right"
        toastOptions={{
          style: {
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            color: "#111827",
            borderRadius: 12,
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

