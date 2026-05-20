"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const HELLOS = ["Hello", "Namaste", "Ni hao", "Hola", "Bonjour", "Ciao"];

type HelloLoaderProps = {
  className?: string;
  message?: string;
  size?: "sm" | "lg";
};

export function HelloLoader({
  className,
  message = "Loading the experience — hang tight while the page gets ready.",
  size = "lg",
}: HelloLoaderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % HELLOS.length);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-col items-center justify-center gap-4 text-center", className)}
    >
      <div className="relative flex items-center justify-center h-16 w-full">
        <AnimatePresence mode="wait">
          <motion.span
            key={HELLOS[index]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute font-semibold tracking-tight text-heading",
              size === "lg" ? "text-4xl sm:text-5xl" : "text-2xl",
            )}
          >
            {HELLOS[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
