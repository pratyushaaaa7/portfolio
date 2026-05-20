"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HelloLoader } from "@/components/ui/HelloLoader";

const MIN_VISIBLE_MS = 900;

export function SiteLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const started = performance.now();

    const finish = () => {
      if (cancelled) return;
      setVisible(false);
    };

    const scheduleFinish = () => {
      const elapsed = performance.now() - started;
      window.setTimeout(finish, Math.max(0, MIN_VISIBLE_MS - elapsed));
    };

    if (document.readyState === "complete") {
      scheduleFinish();
    } else {
      const onLoad = () => scheduleFinish();
      window.addEventListener("load", onLoad, { once: true });
      return () => {
        cancelled = true;
        window.removeEventListener("load", onLoad);
      };
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="site-loader"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--theme-bg)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          aria-busy="true"
          aria-label="Loading portfolio"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--theme-accent)_12%,transparent),transparent_70%)]" />
          <HelloLoader message="Warming up sections, animations, and your GitHub activity…" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
