"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { STRENGTHS } from "@/lib/constants";

export function AchievementsSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Strengths"
          title="What I bring to teams that ship under pressure"
          subtitle="Depth across product surfaces, backend contracts, deployment hygiene, and the operational details that keep systems trustworthy."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STRENGTHS.map((s, idx) => (
            <Reveal key={s} delay={idx * 0.03}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="panel panel-hover group relative overflow-hidden rounded-3xl p-6"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--theme-accent-muted)] blur-2xl opacity-60 transition group-hover:opacity-80" />
                <div className="relative">
                  <p className="eyebrow !tracking-[0.18em]">Core strength</p>
                  <p className="mt-3 text-lg font-semibold text-heading">{s}</p>
                  <p className="mt-3 text-sm leading-relaxed text-subtle">
                    Applied across production environments with an emphasis on measurable outcomes and maintainable
                    architecture.
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
