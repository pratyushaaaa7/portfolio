import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/lib/constants";
import { themeInitScript } from "@/app/theme-init";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"),
  title: {
    default: `${SITE.name} — ${SITE.title} | MERN, React Native, Cloud`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Premium portfolio of Pratyusha — Full Stack Developer specializing in MERN, TypeScript, React Native, real-time systems, push notifications, Dockerized deployments, and enterprise-grade architecture.",
  keywords: [
    "Pratyusha",
    "Full Stack Developer",
    "MERN",
    "React Native",
    "Next.js",
    "TypeScript",
    "Docker",
    "DevOps",
    "MongoDB",
    "Express",
    "Portfolio",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    title: `${SITE.name} — ${SITE.title}`,
    description:
      "Scalable web & mobile engineering with production deployment experience across VPS, Docker, Nginx, and CI/CD.",
    type: "website",
    locale: "en_US",
    siteName: `${SITE.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.title}`,
    description:
      "Full-stack + mobile + DevOps. Enterprise workflows, real-time systems, and cloud-ready architectures.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: SITE.title,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
    sameAs: [SITE.github, SITE.linkedin],
    email: SITE.email,
    knowsAbout: [
      "Full-stack web development",
      "Mobile application development",
      "Cloud deployment",
      "DevOps",
      "Real-time systems",
      "Push notifications",
    ],
  };

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#080c14" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <AppProviders>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
