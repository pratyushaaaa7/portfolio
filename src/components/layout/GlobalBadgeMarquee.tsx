"use client";

import { GLOBAL_BADGES } from "@/lib/constants";
import { motion } from "framer-motion";

export function GlobalBadgeMarquee() {
  const doubled = [...GLOBAL_BADGES, ...GLOBAL_BADGES];

  return (
    <div className="relative overflow-hidden border-y border-[var(--theme-border)] bg-[var(--theme-accent-subtle)] py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--theme-bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--theme-bg)] to-transparent" />
      <motion.div
        className="flex w-max gap-3"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((b, i) => (
          <span
            key={`${b}-${i}`}
            className="chip !px-4 !py-1 text-xs font-medium"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--theme-accent)]" />
            {b}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
