export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type ContributionGrid = {
  weeks: (ContributionDay | null)[][];
  monthLabels: { weekIndex: number; label: string }[];
  totalContributions: number;
  startDate: string;
  endDate: string;
};

/** GitHub profile graph — quartile buckets over non-zero days (same idea as github.com). */
export function githubContributionLevel(count: number, countsInRange: number[]): number {
  if (count <= 0) return 0;

  const active = countsInRange.filter((c) => c > 0).sort((a, b) => a - b);
  if (active.length === 0) return 0;

  const q1 = active[Math.floor(active.length * 0.25)] ?? active[0];
  const q2 = active[Math.floor(active.length * 0.5)] ?? active[0];
  const q3 = active[Math.floor(active.length * 0.75)] ?? active[active.length - 1];

  if (count >= q3) return 4;
  if (count >= q2) return 3;
  if (count >= q1) return 2;
  return 1;
}

function withGitHubLevels(contributions: ContributionDay[]): ContributionDay[] {
  const counts = contributions.map((c) => c.count);
  return contributions.map((c) => ({
    ...c,
    level: githubContributionLevel(c.count, counts),
  }));
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parseDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfWeekSunday(d: Date): Date {
  const copy = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  copy.setDate(copy.getDate() - copy.getDay());
  return copy;
}

function addDays(d: Date, days: number): Date {
  const copy = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  copy.setDate(copy.getDate() + days);
  return copy;
}

/** Rolling last ~53 weeks — matches github.com profile graph */
export function buildLastYearGrid(contributions: ContributionDay[]): ContributionGrid {
  const normalized = withGitHubLevels(contributions);
  const map = new Map<string, ContributionDay>();
  for (const c of normalized) map.set(c.date, c);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const rangeStart = addDays(today, -364);
  const gridStart = startOfWeekSunday(rangeStart);

  const weeks: (ContributionDay | null)[][] = [];
  let cursor = new Date(gridStart);
  let totalContributions = 0;

  while (cursor <= today || weeks.length < 53) {
    const week: (ContributionDay | null)[] = [];
    for (let day = 0; day < 7; day++) {
      if (cursor > today) {
        week.push(null);
      } else {
        const key = formatDate(cursor);
        const cell = map.get(key) ?? { date: key, count: 0, level: 0 };
        if (cursor >= rangeStart) totalContributions += cell.count;
        week.push(cell);
      }
      cursor = addDays(cursor, 1);
    }
    weeks.push(week);
    if (weeks.length >= 53) break;
  }

  const monthLabels: { weekIndex: number; label: string }[] = [];
  let lastMonth = -1;
  for (let wi = 0; wi < weeks.length; wi++) {
    const firstDay = weeks[wi]?.find((d) => d !== null);
    if (!firstDay) continue;
    const month = parseDate(firstDay.date).getMonth();
    if (month !== lastMonth) {
      monthLabels.push({ weekIndex: wi, label: MONTHS[month] });
      lastMonth = month;
    }
  }

  const firstCell = weeks.flat().find((d) => d !== null);
  const lastCell = [...weeks].reverse().flat().find((d) => d !== null);

  return {
    weeks,
    monthLabels,
    totalContributions,
    startDate: firstCell?.date ?? formatDate(rangeStart),
    endDate: lastCell?.date ?? formatDate(today),
  };
}
