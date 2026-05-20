"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HelloLoader } from "@/components/ui/HelloLoader";
import { GITHUB_USERNAME, SITE } from "@/lib/constants";
import { buildLastYearGrid, type ContributionDay } from "@/lib/github-contribution-grid";
import { cn } from "@/lib/utils";

type Payload = {
  username: string;
  total: Record<string, number>;
  contributions: ContributionDay[];
};

const DAY_LABEL_ROWS: Record<number, string> = {
  1: "Mon",
  3: "Wed",
  5: "Fri",
};

const LEVEL_CLASS = [
  "gh-contrib-0",
  "gh-contrib-1",
  "gh-contrib-2",
  "gh-contrib-3",
  "gh-contrib-4",
] as const;

type Props = {
  initialData?: Payload | null;
};

export function GitHubContributions({ initialData = null }: Props) {
  const [data, setData] = useState<Payload | null>(initialData);
  const [loading, setLoading] = useState(!initialData?.contributions?.length);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData?.contributions?.length) return;

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/github-contributions");
        const json = (await res.json()) as Payload & { error?: string };
        if (!res.ok) throw new Error(json.error ?? "Could not load GitHub activity");
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [initialData?.contributions?.length]);

  const grid = useMemo(
    () => buildLastYearGrid(data?.contributions ?? []),
    [data?.contributions],
  );

  const weekCount = grid.weeks.length || 53;
  const profileUrl = SITE.github;
  const username = data?.username ?? GITHUB_USERNAME;

  const gridStyle = {
    gridTemplateColumns: `repeat(${weekCount}, var(--gh-cell))`,
  } as const;

  return (
    <section id="activity" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px divider-line" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Activity"
          title="GitHub Activity"
          subtitle={`${username}'s coding journey over the past year`}
        />

        <Reveal>
          <div className="gh-graph-card mt-12">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--theme-border)] px-4 py-4 sm:px-6">
              <p className="text-sm text-body">
                {loading ? (
                  "Fetching your GitHub activity data"
                ) : (
                  <>
                    <span className="font-semibold text-heading">
                      {grid.totalContributions.toLocaleString()}
                    </span>{" "}
                    contributions in the last year
                  </>
                )}
              </p>
              <Link
                href={profileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-accent hover:underline"
              >
                @{username} on GitHub →
              </Link>
            </div>

            {error ? (
              <p className="border-b border-[var(--theme-border)] px-6 py-4 text-sm text-rose-500">
                {error}. Check <code className="text-accent">GITHUB_USERNAME</code> in{" "}
                <code className="text-accent">src/lib/constants.ts</code>.
              </p>
            ) : null}

            <div className="px-3 py-4 sm:px-4 sm:py-5">
              {loading ? (
                <div className="flex min-h-[200px] items-center justify-center py-10">
                  <HelloLoader size="sm" message="Pulling contribution squares from GitHub…" />
                </div>
              ) : (
                <div className="gh-graph-inner">
                  <div className="gh-graph-scroll">
                    <div className="flex gap-2 sm:gap-3">
                      <div
                        className="flex shrink-0 flex-col justify-between pt-[18px]"
                        style={{ height: "calc(7 * var(--gh-cell) + 6 * var(--gh-gap))" }}
                      >
                        {Array.from({ length: 7 }, (_, row) => (
                          <span
                            key={row}
                            className="flex items-center text-[9px] leading-none text-subtle sm:text-[10px]"
                            style={{ height: "var(--gh-cell)" }}
                          >
                            {DAY_LABEL_ROWS[row] ?? ""}
                          </span>
                        ))}
                      </div>

                      <div className="min-w-0">
                        <div className="gh-month-row" style={gridStyle}>
                          {Array.from({ length: weekCount }, (_, wi) => {
                            const label = grid.monthLabels.find((m) => m.weekIndex === wi)?.label;
                            return (
                              <span key={wi} className="gh-month-label">
                                {label ?? ""}
                              </span>
                            );
                          })}
                        </div>

                        <div className="gh-graph-weeks" style={gridStyle}>
                          {grid.weeks.map((week, wi) =>
                            week.map((day, di) => {
                              if (!day) {
                                return (
                                  <div
                                    key={`e-${wi}-${di}`}
                                    className="gh-contrib-cell gh-contrib-empty"
                                    aria-hidden
                                  />
                                );
                              }
                              const level = Math.min(4, Math.max(0, day.level));
                              return (
                                <div
                                  key={day.date}
                                  title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                                  className={cn("gh-contrib-cell", LEVEL_CLASS[level])}
                                  role="img"
                                  aria-label={`${day.count} contributions on ${day.date}`}
                                />
                              );
                            }),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!loading ? (
                <div className="gh-legend-scale mt-4 flex flex-wrap items-center justify-between gap-3 px-1 text-xs text-subtle">
                  {/* <a
                    href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent hover:underline"
                  >
                    Learn how we count contributions
                  </a> */}
                    <span>Hover on grid boxes to check the number of contributions for the day</span>
                  <div className="flex items-center gap-1">
                    <span>Less</span>
                    {LEVEL_CLASS.map((c) => (
                      <span key={c} className={cn("gh-contrib-legend", c)} />
                    ))}
                    <span>More</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
