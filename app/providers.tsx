"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTheme } from "next-themes";
import * as React from "react";
import { useEffect } from "react";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 600 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        {children}
        <ThemeToaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function ThemeToaster() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {}, [resolvedTheme]);

  const toasterTheme: "light" | "dark" | "system" =
    resolvedTheme === "light" || resolvedTheme === "dark"
      ? resolvedTheme
      : "system";

  return <Toaster richColors={true} theme={toasterTheme} />;
}
