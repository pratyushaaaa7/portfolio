"use client";

import { HelloLoader } from "@/components/ui/HelloLoader";

export function ProjectsLoading() {
  return (
    <section className="py-24" aria-busy="true" aria-label="Loading projects">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[var(--theme-border)] bg-[var(--theme-surface)] p-6 shadow-[var(--theme-shadow-card)]">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
          </div>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--theme-border)] bg-[var(--theme-accent-subtle)] p-10">
            <div className="absolute inset-0 bg-[var(--theme-surface)]/80" />
            <div className="relative flex h-72 items-center justify-center">
              <HelloLoader message="Loading the experience inside the MacBook — hang tight while the page becomes ready." />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
