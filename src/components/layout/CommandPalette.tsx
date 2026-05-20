"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Command, Search } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const items = useMemo(() => [...NAV_LINKS], []);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/45 dark:bg-black/60 p-4 pt-28 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="glass w-full max-w-xl overflow-hidden rounded-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-[var(--theme-border)] px-4 py-3">
              <Search className="h-4 w-4 icon-themed opacity-70" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to section…"
                className="w-full bg-transparent text-sm text-heading outline-none placeholder:text-subtle"
                aria-label="Command palette search"
              />
              <span className="hidden items-center gap-1 rounded-md border border-[var(--theme-border)] px-2 py-1 text-[10px] font-semibold text-subtle sm:inline-flex">
                <Command className="h-3 w-3" /> K
              </span>
            </div>
            <div className="max-h-[50vh] overflow-auto p-2">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm text-body transition hover:bg-[var(--theme-accent-muted)]"
                  onClick={() => {
                    scrollToId(item.id);
                    setOpen(false);
                    setQuery("");
                  }}
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-subtle">Go</span>
                </button>
              ))}
              {filtered.length === 0 ? (
                <p className="px-3 py-6 text-sm text-subtle">No matches.</p>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
