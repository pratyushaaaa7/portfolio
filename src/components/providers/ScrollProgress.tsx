"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-[var(--theme-accent)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
