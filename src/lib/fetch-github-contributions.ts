import { GITHUB_USERNAME } from "@/lib/constants";

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type GitHubContributionsPayload = {
  username: string;
  total: Record<string, number>;
  contributions: ContributionDay[];
};

export async function fetchGitHubContributions(): Promise<GitHubContributionsPayload> {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? GITHUB_USERNAME;

  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`, {
    next: { revalidate: 3600 },
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(15_000),
  });

  if (!res.ok) {
    throw new Error(`GitHub contributions API returned ${res.status}`);
  }

  const data = (await res.json()) as {
    total?: Record<string, number>;
    contributions?: ContributionDay[];
  };

  return {
    username,
    total: data.total ?? {},
    contributions: data.contributions ?? [],
  };
}
