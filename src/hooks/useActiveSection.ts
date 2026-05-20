"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";

export function useActiveSection() {
  const [active, setActive] = useState<(typeof NAV_LINKS)[number]["id"]>("home");

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) {
          setActive(visible.target.id as (typeof NAV_LINKS)[number]["id"]);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.15, 0.35, 0.55, 0.75, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}
