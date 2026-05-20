"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = useMemo(() => [...NAV_LINKS], []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-4",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl border border-[var(--theme-border)] px-4 py-3 backdrop-blur-xl transition-all",
            scrolled ? "bg-[var(--theme-surface)] shadow-[var(--theme-shadow-card)]" : "bg-[var(--theme-surface-glass)]",
          )}
        >
          <button
            type="button"
            onClick={() => scrollToId("home")}
            className="group flex items-center gap-2 text-left"
            aria-label="Go to home"
          >
            <span className="icon-box relative h-10 w-10 text-sm font-semibold">
              P
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-semibold tracking-tight text-heading">Pratyusha</span>
              <span className="block text-xs text-subtle">Full Stack Developer</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {items.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToId(item.id)}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-sm font-medium transition",
                    isActive ? "text-heading" : "text-subtle hover:text-heading",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-[var(--theme-border)] bg-[var(--theme-accent-muted)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="btn-primary hidden !px-4 !py-2 md:inline-flex"
            >
              Let&apos;s talk
            </button>
            <button
              type="button"
              className="icon-box !rounded-xl p-2 lg:hidden text-heading"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="glass mt-3 rounded-2xl p-3 lg:hidden"
            >
              <div className="grid gap-1">
                {items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={cn(
                      "rounded-xl px-3 py-3 text-left text-sm font-medium",
                      active === item.id
                        ? "bg-[var(--theme-accent-muted)] text-heading"
                        : "text-body hover:bg-[var(--theme-accent-subtle)] hover:text-heading",
                    )}
                    onClick={() => {
                      setOpen(false);
                      scrollToId(item.id);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
                <Link
                  href={SITE.resumePath}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-body hover:bg-[var(--theme-accent-subtle)] hover:text-heading"
                  onClick={() => setOpen(false)}
                >
                  Download resume
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
