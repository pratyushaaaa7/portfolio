"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-10 w-[4.5rem] shrink-0 items-center rounded-full border p-1 transition-colors",
        "border-[var(--theme-border)] bg-[var(--theme-surface-2)]",
        className,
      )}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 520, damping: 34 }}
        className="absolute top-1 h-8 w-8 rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-[var(--theme-shadow-card)]"
        style={{ left: isDark ? "calc(100% - 2.25rem)" : "0.25rem" }}
      />

      <span className="relative z-10 flex w-full items-center justify-between px-2">
        <motion.span
          animate={{
            scale: isDark ? 0.82 : 1,
            opacity: isDark ? 0.35 : 1,
            rotate: isDark ? -25 : 0,
          }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          className="grid place-items-center"
        >
          <Sun className="h-4 w-4 text-amber-500" />
        </motion.span>
        <motion.span
          animate={{
            scale: isDark ? 1 : 0.82,
            opacity: isDark ? 1 : 0.35,
            rotate: isDark ? 0 : 25,
          }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          className="grid place-items-center"
        >
          <Moon className="h-4 w-4 icon-themed" />
        </motion.span>
      </span>
    </button>
  );
}
