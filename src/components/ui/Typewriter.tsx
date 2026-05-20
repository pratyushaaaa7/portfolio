"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_ROLES } from "@/lib/constants";

export function Typewriter() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_ROLES.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative h-9 min-h-[2.25rem] sm:h-10">
      <AnimatePresence mode="wait">
        <motion.span
          key={HERO_ROLES[index]}
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="chip absolute left-0 top-0 !text-sm sm:!text-base"
        >
          {HERO_ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
