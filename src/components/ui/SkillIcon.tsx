"use client";

import Image from "next/image";
import { useState } from "react";
import { getSkillIconUrl, getSkillInitials } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: { box: "h-9 w-9", img: 22, text: "text-[10px]" },
  md: { box: "h-12 w-12", img: 28, text: "text-xs" },
  lg: { box: "h-14 w-14", img: 34, text: "text-sm" },
} as const;

export function SkillIcon({ name, size = "md", className }: Props) {
  const [failed, setFailed] = useState(false);
  const iconUrl = getSkillIconUrl(name);
  const isSimpleIcon = iconUrl?.includes("simple-icons") ?? false;
  const s = sizeMap[size];

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-accent-subtle)]",
        s.box,
        className,
      )}
    >
      {iconUrl && !failed ? (
        <Image
          src={iconUrl}
          alt=""
          width={s.img}
          height={s.img}
          className={cn(
            "object-contain opacity-90",
            isSimpleIcon && "skill-icon-mono",
          )}
          onError={() => setFailed(true)}
          unoptimized
        />
      ) : (
        <span className={cn("font-bold text-accent", s.text)}>{getSkillInitials(name)}</span>
      )}
    </div>
  );
}
