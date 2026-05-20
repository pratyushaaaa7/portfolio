"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";

export function FloatingNote() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const t = window.setTimeout(() => setOpen(false), 9000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-[55] w-[min(92vw,360px)]"
        >
          <div className="glass relative overflow-hidden rounded-2xl p-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-accent-muted)] p-1 text-heading transition hover:bg-[var(--theme-accent-subtle)]"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-start gap-3 pr-8">
              <div className="icon-box h-10 w-10">
                <Bell className="h-5 w-5 text-cyan-200" />
              </div>
              <div>
                <p className="text-sm font-semibold text-heading">Open to impactful roles</p>
                <p className="mt-1 text-xs leading-relaxed text-body">
                  Full-stack + mobile + DevOps. Especially excited about real-time systems and production deployment
                  ownership.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px divider-line" />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
