"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EXPERIENCE } from "@/lib/constants";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Shipping products where reliability is non-negotiable"
          subtitle="A timeline of high-impact engineering across mobile and web platforms, production deployments, and secure API systems."
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute left-[14px] top-3 bottom-3 w-px bg-[var(--theme-accent)]/40 sm:left-5" />

          <div className="space-y-10">
            {EXPERIENCE.map((job, idx) => (
              <Reveal key={job.company}>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ delay: idx * 0.05 }}
                  className="relative pl-12 sm:pl-16"
                >
                  <div className="icon-box absolute left-0 top-2 h-9 w-9 sm:left-1">
                    <span className="text-xs font-bold">{idx + 1}</span>
                  </div>

                  <div className="glass rounded-3xl p-6 sm:p-7">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-heading">{job.company}</p>
                        <p className="text-sm font-semibold text-accent">{job.role}</p>
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-subtle">{job.duration}</p>
                    </div>

                    <ul className="mt-5 space-y-3">
                      {job.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-sm leading-relaxed text-body">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
