"use client";

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollProgress } from "@/components/providers/ScrollProgress";
import { OnekoCursor } from "@/components/providers/OnekoCursor";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SiteLoader } from "@/components/providers/SiteLoader";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { FloatingNote } from "@/components/layout/FloatingNote";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SiteLoader />
      <SmoothScroll>
        <ScrollProgress />
        <OnekoCursor />
        <CommandPalette />
        <FloatingNote />
        {children}
      </SmoothScroll>
    </ThemeProvider>
  );
}
