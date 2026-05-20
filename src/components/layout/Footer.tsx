"use client";

import { ArrowUpRight, Github, Heart, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function Footer() {
  return (
    <footer
      className="border-t py-14"
      style={{
        borderColor: "var(--theme-border)",
        backgroundColor: "var(--theme-footer-bg)",
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="icon-box h-10 w-10 text-sm font-semibold">P</span>
            <div>
              <p className="text-sm font-semibold text-heading">{SITE.name}</p>
              <p className="text-xs text-subtle">{SITE.title}</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-subtle">
            Building scalable web and mobile systems with production-grade deployment discipline.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {[
            { href: SITE.github, label: "GitHub", icon: Github },
            { href: SITE.linkedin, label: "LinkedIn", icon: Linkedin },
            { href: `mailto:${SITE.email}`, label: "Email", icon: Mail },
          ].map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost !px-4 !py-2 group"
            >
              <Icon className="h-4 w-4 icon-themed" />
              {label}
              <ArrowUpRight className="h-4 w-4 opacity-60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>

      <div
        className="mx-auto mt-10 flex max-w-7xl flex-col items-start justify-between gap-4 border-t px-4 pt-8 sm:flex-row sm:items-center sm:px-6 lg:px-8"
        style={{ borderColor: "var(--theme-border)" }}
      >
        <p className="flex flex-wrap items-center gap-1.5 text-sm text-subtle">
          <span>Designed & developed by</span>
          <span className="font-semibold text-heading">{SITE.name}</span>
          <Heart className="inline h-3.5 w-3.5 fill-[var(--theme-accent)] text-[var(--theme-accent)]" aria-hidden />
          <span className="text-subtle">· © {new Date().getFullYear()}</span>
        </p>
        <motion.button
          type="button"
          onClick={scrollTop}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="btn-ghost !px-4 !py-2 !text-xs"
        >
          Back to top
        </motion.button>
      </div>
    </footer>
  );
}
