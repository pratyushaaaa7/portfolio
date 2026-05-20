"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { STATS } from "@/lib/constants";

const pillars = [
  "Full-Stack Development",
  "React & Next.js",
  "React Native & Expo",
  "TypeScript",
  "Node.js & Express",
  "REST API Design",
  "MongoDB & MySQL",
  "Docker & CI/CD",
  "VPS Deployment",
  "Nginx & PM2",
  "Cloud Infrastructure",
  "Expo Push Notifications",
  "Real-time Applications",
  "JWT & Auth Systems",
  "Responsive UI Systems",
];

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="Engineering for scale, clarity, and production reality"
          subtitle="I design and ship systems that behave well under load, stay observable in production, and feel effortless for users across web and mobile."
        />

        <div className="mt-14">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {STATS.map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden group"
              >
                {/* subtle glow blob */}
                <div className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full bg-indigo-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <p className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-br from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  {s.value}
                </p>
                <p className="mt-3 text-sm font-semibold text-heading leading-snug">{s.label}</p>
                <p className="mt-1 text-xs text-subtle">{s.hint}</p>
              </motion.div>
            ))}
          </div>
        </div>


        {/* <Reveal className="mt-10">
          <div className="glass rounded-3xl p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/80">Expertise map</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {pillars.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-accent-muted)] px-3 py-1 text-xs font-semibold text-heading"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </Reveal> */}
      </div>
    </section>
  );
}
