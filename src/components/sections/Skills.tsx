"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillIcon } from "@/components/ui/SkillIcon";
import { SKILL_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Skills() {
  const allSkills = SKILL_CATEGORIES.flatMap((cat) => cat.items.map((item) => item.name));

  return (
    <section id="skills" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px divider-line" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I ship with daily"
          subtitle="Icon-first stack — no progress bars, just the technologies behind production apps."
        />

        <Reveal>
          <div className="panel relative mt-10 overflow-hidden rounded-3xl py-5">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--theme-bg)] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--theme-bg)] to-transparent" />
            <div className="skill-marquee flex w-max gap-3 px-6">
              {[...allSkills, ...allSkills].map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="chip !rounded-2xl !px-3 !py-2"
                >
                  <SkillIcon name={name} size="sm" />
                  <span className="whitespace-nowrap text-sm font-medium text-body">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SKILL_CATEGORIES.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.05}>
              <div
                className={cn(
                  "panel panel-hover group relative overflow-hidden rounded-3xl p-6",
                  cat.title === "DevOps & Deployment" && "md:col-span-2",
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full blur-3xl opacity-50 transition group-hover:opacity-80 bg-gradient-to-br",
                    cat.accent,
                  )}
                />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-heading">{cat.title}</h3>
                      <p className="mt-1 text-sm text-subtle">{cat.items.length} technologies</p>
                    </div>
                    <span className="chip !px-2.5 !py-1 text-[10px] font-bold uppercase tracking-wider">
                      Stack
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                    {cat.items.map((item, j) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-5%" }}
                        transition={{ delay: j * 0.02, duration: 0.35 }}
                        whileHover={{ y: -4, scale: 1.04 }}
                        className="panel-hover group/tile flex flex-col items-center justify-center gap-2 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-accent-subtle)] p-3 text-center transition aspect-square min-h-[128px] sm:aspect-auto sm:min-h-0"
                      >
                        <SkillIcon name={item.name} size="lg" />
                        <p className="text-[11px] font-semibold leading-tight text-body group-hover/tile:text-heading sm:text-xs">
                          {item.name}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
