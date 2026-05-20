/** Devicon slug per skill — https://devicon.dev */
const DEVICON_MAP: Record<string, string> = {
  React: "react",
  "Next.js": "nextjs",
  TypeScript: "typescript",
  "Tailwind CSS": "tailwindcss",
  Redux: "redux",
  Bootstrap: "bootstrap",
  MUI: "materialui",
  Expo: "expo",
  "Node.js": "nodejs",
  "Express.js": "express",
  MongoDB: "mongodb",
  Firebase: "firebase",
  MySQL: "mysql",
  Docker: "docker",
  Nginx: "nginx",
  AWS: "amazonwebservices",
  Linux: "linux",
  Git: "git",
  GitHub: "github",
  Figma: "figma",
  npm: "npm",
  Postman: "postman",
};

/** Simple Icons slug fallback — https://simpleicons.org */
const SIMPLE_ICONS_MAP: Record<string, string> = {
  "Context API": "react",
  "REST APIs": "openapiinitiative",
  JWT: "jsonwebtokens",
  "Passport.js": "passport",
  "S3 Storage": "amazons3",
  PM2: "pm2",
  "CI/CD": "githubactions",
  VPS: "digitalocean",
  "SSL/TLS": "letsencrypt",
  "Cron Jobs": "linux",
  SSH: "openssh",
};

export function getSkillIconUrl(name: string): string | null {
  const devicon = DEVICON_MAP[name];
  if (devicon) {
    return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${devicon}/${devicon}-original.svg`;
  }
  const simple = SIMPLE_ICONS_MAP[name];
  if (simple) {
    return `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${simple}.svg`;
  }
  return null;
}

export function getSkillInitials(name: string): string {
  return name
    .split(/[\s./]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
