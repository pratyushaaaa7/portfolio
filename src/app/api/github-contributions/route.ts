import { NextResponse } from "next/server";
import { fetchGitHubContributions } from "@/lib/fetch-github-contributions";

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await fetchGitHubContributions();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Contribution fetch failed" }, { status: 500 });
  }
}
