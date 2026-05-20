"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Download, FileText, Gauge, Server, Shield } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/constants";

const metrics = [
  { label: "API performance lift", value: "25%", hint: "Measured improvements on critical routes" },
  { label: "Workflow efficiency", value: "30%", hint: "Operational gains from better product flows" },
  { label: "RBAC coverage", value: "Full", hint: "Role-based access across admin + mobile" },
];

export function ResumeSection() {
  return (
    <section id="resume" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Resume"
          title="A concise snapshot built for fast recruiter scanning"
          subtitle="High-signal achievements, technologies, and deployment experience—download the PDF for the full narrative."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[var(--theme-accent-subtle)]" />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[var(--theme-border)] bg-[var(--theme-accent-muted)] px-3 py-1 text-xs font-semibold text-heading">
                    <FileText className="h-4 w-4 text-cyan-200" />
                    Resume preview
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-heading">{SITE.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-accent">{SITE.title}</p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-body">
                    MERN + TypeScript + React Native engineer focused on secure APIs, real-time experiences, push-ready
                    architectures, and VPS/Docker deployments with observability-minded defaults.
                  </p>
                </div>
                <Link
                  href={SITE.resumePath}
                  className="btn-primary self-start !px-5 !py-3"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Link>
              </div>

              <div className="relative mt-8 overflow-hidden rounded-2xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-surface-2)]">
                <div className="grid gap-4 p-5 sm:grid-cols-3">
                  {metrics.map((m) => (
                    <div key={m.label} className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-subtle">{m.label}</p>
                      <p className="mt-2 text-2xl font-semibold text-heading">{m.value}</p>
                      <p className="mt-2 text-xs leading-relaxed text-body">{m.hint}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[var(--theme-border)] p-5">
                  <div className="flex flex-wrap gap-2">
                    {[
                      "TypeScript",
                      "React",
                      "Next.js",
                      "Node.js",
                      "MongoDB",
                      "Docker",
                      "Nginx",
                      "PM2",
                      "JWT",
                      "Firebase",
                      "CI/CD",
                      "Linux",
                    ].map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-accent-muted)] px-3 py-1 text-xs font-semibold text-heading"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-subtle">
                    Your latest resume is available as a one-click PDF download above.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-5">
            <div className="grid gap-4">
              {[
                {
                  title: "Security posture",
                  body: "JWT-hardened APIs, RBAC across modules, SSL/TLS termination, and pragmatic secret handling.",
                  icon: Shield,
                },
                {
                  title: "Performance mindset",
                  body: "Caching-aware endpoints, lean payloads, and UI patterns that stay smooth on mid-tier devices.",
                  icon: Gauge,
                },
                {
                  title: "Deployment discipline",
                  body: "Dockerized services, Nginx reverse proxying, PM2 orchestration, backups, and firewall baselines.",
                  icon: Server,
                },
              ].map((card) => (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -4 }}
                  className="rounded-3xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-6"
                >
                  <div className="flex items-start gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10">
                      <card.icon className="h-5 w-5 text-cyan-200" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-heading">{card.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-body">{card.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
