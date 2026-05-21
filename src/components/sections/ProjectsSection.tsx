"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Github, Layers, Smartphone, Monitor } from "lucide-react";
import { PROJECTS, type ProjectFilter } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const filters: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "mobile", label: "Mobile" },
  { id: "web", label: "Web" },
  { id: "fullstack", label: "Full Stack" },
];

function PlaceholderShot({
  label,
  variant,
}: {
  label: string;
  variant: "phone" | "desktop";
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-accent-subtle)]",
        variant === "phone" ? "h-[520px]" : "h-[300px] sm:h-[380px]",
      )}
    >
      <div className="absolute inset-0 bg-[var(--theme-accent-muted)] opacity-50 blur-3xl" />
      <div className="relative flex h-full flex-col justify-end p-4">
        <p className="eyebrow !tracking-[0.22em]">Screenshot</p>
        <p className="mt-1 text-sm font-semibold text-heading">{label}</p>
        <p className="mt-2 text-xs leading-relaxed text-body">
          Drop your PNG/WebP into <span className="font-mono text-accent">/public/projects/&lt;slug&gt;/</span> and
          wire it in the data layer.
        </p>
      </div>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[min(92vw,320px)]">
      <div className="device-frame relative rounded-[2.4rem] p-[10px]">
        <div className="device-frame-inner relative overflow-hidden rounded-[2.05rem]">
          <div className="absolute left-1/2 top-2 z-20 h-1.5 w-16 -translate-x-1/2 rounded-full bg-[var(--theme-muted)]/40" />
          {children}
        </div>
      </div>
    </div>
  );
}

function DesktopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-4xl">
      <div className="device-frame rounded-2xl p-2">
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-400/70" />
          </div>
          <div className="mx-auto h-2 w-40 rounded-full bg-[var(--theme-border)]" />
        </div>
        <div className="device-frame-inner overflow-hidden rounded-xl">{children}</div>
      </div>
    </div>
  );
}

function Gallery({ labels, slug, mockup }: { labels: readonly string[]; slug: string; mockup: "phone" | "desktop" }) {
  const [index, setIndex] = useState(0);
  const label = labels[index] ?? labels[0];

  const next = () => setIndex((i) => (i + 1) % labels.length);
  const prev = () => setIndex((i) => (i - 1 + labels.length) % labels.length);

  const inner = (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${slug}-${index}`}
        initial={{ opacity: 0, x: 18, filter: "blur(8px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, x: -18, filter: "blur(8px)" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <PlaceholderShot label={label} variant={mockup} />
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="space-y-4">
      {mockup === "phone" ? <PhoneFrame>{inner}</PhoneFrame> : <DesktopFrame>{inner}</DesktopFrame>}

      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {labels.map((l, i) => (
            <button
              key={l}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-semibold transition",
                i === index ? "filter-pill-active" : "filter-pill hover:text-heading",
              )}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prev}
            className="icon-box !rounded-xl p-0 text-heading"
            aria-label="Previous screenshot"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            className="icon-box !rounded-xl p-0 text-heading"
            aria-label="Next screenshot"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <div
      className={cn(
        "panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8",
        project.featured && "border-[color-mix(in_srgb,var(--theme-accent)_35%,var(--theme-border))]",
      )}
    >
      {project.featured ? (
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--theme-accent-muted)] blur-3xl" />
      ) : null}

      <div className="relative grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip text-xs font-semibold">
              {project.category === "mobile" ? (
                <Smartphone className="h-3.5 w-3.5 text-cyan-200" />
              ) : (
                <Monitor className="h-3.5 w-3.5 text-cyan-200" />
              )}
              {project.category === "mobile"
                ? "Mobile"
                : project.category === "web"
                  ? "Web"
                  : "Full Stack"}
            </span>
            {project.featured ? (
              <span className="chip !border-[color-mix(in_srgb,var(--theme-accent)_40%,var(--theme-border))] !bg-[var(--theme-accent-muted)] text-xs font-semibold text-accent">
                Flagship
              </span>
            ) : null}
          </div>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-heading sm:text-3xl">{project.title}</h3>
          <p className="mt-2 text-sm font-semibold text-cyan-200/90">{project.subtitle}</p>
          <p className="mt-4 text-sm leading-relaxed text-body sm:text-base">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2 items-center">
            {project.slug !== "workflo-web" ? (
              <Link
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost !px-4 !py-2"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            ) : null}
            {project.status ? (
              <span className="rounded-full border border-[var(--theme-border)] bg-[var(--theme-accent-subtle)] px-4 py-2 text-sm font-semibold text-heading">
                {project.status}
              </span>
            ) : null}
          </div>

          <div className="mt-8 rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-accent-subtle)] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-heading">
              <Layers className="h-4 w-4 text-cyan-200" />
              Deployment architecture
            </div>
            <p className="mt-3 text-sm leading-relaxed text-body">{project.architecture}</p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <Gallery labels={project.galleryLabels} slug={project.slug} mockup={project.mockup} />
        </div>

        <div className="lg:col-span-12">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5">
              <p className="text-sm font-semibold text-heading">Feature highlights</p>
              <ul className="mt-4 space-y-2 text-sm text-body">
                {project.features.slice(0, 8).map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--theme-accent)]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-5">
              <p className="text-sm font-semibold text-heading">Important highlights</p>
              <ul className="mt-4 space-y-2 text-sm text-body">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--theme-accent)]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="chip text-xs font-semibold"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectFilter>("all");

  const visible = useMemo(() => {
    const list = [...PROJECTS];
    const filtered =
      filter === "all" ? list : list.filter((p) => (filter === "fullstack" ? p.category === "fullstack" : p.category === filter));
    return filtered.sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [filter]);

  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Featured work that mirrors how I build in production"
          subtitle="Enterprise workflows, secure APIs, real-time surfaces, notification-ready architectures, and deployment pipelines you can trust."
        />

        <Reveal className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition",
                filter === f.id ? "filter-pill-active" : "filter-pill hover:text-heading",
              )}
            >
              {f.label}
            </button>
          ))}
        </Reveal>

        <div className="mt-12 space-y-10">
          {visible.map((p) => (
            <Reveal key={p.slug}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        <Reveal className="panel mt-10 rounded-3xl border-dashed p-6 text-sm text-subtle">
          <p className="font-semibold text-heading">Image workflow</p>
          <p className="mt-2 leading-relaxed">
            Add responsive screenshots under <span className="font-mono text-accent">public/projects/</span> and
            swap the placeholder gallery for <span className="font-mono text-accent">next/image</span> slides.
            Lazy-load heavy assets per slide to keep LCP crisp.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default ProjectsSection;
