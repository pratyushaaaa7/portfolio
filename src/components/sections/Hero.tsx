"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { HERO_TECH_BADGES, SITE } from "@/lib/constants";
import { ParticleField } from "@/components/ui/ParticleField";
import { Reveal } from "@/components/ui/Reveal";

function scrollToId(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.35], [0, -40]);

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-indigo-600/15 blur-3xl" />
        <div className="absolute -right-24 top-40 h-96 w-96 rounded-full bg-indigo-500/12 blur-3xl" />
        <ParticleField />
        <div className="noise pointer-events-none absolute inset-0" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-10 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-14">
        <div className="relative z-10 lg:col-span-7">
          <Reveal>
            <div className="chip uppercase tracking-[0.22em]">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Open for exciting/impactful projects or opportunities
            </div>
          </Reveal>

          <div className="mt-6 space-y-4">
            <Reveal delay={0.05}>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-heading sm:text-5xl lg:text-6xl">
                {SITE.name}
                <span className="block text-subtle">Full Stack Developer</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-pretty text-base leading-relaxed text-body sm:text-lg">
                I&apos;m a Full-Stack Engineer with over 2 years of experience
                building end-to-end web and mobile applications . Skilled in
                designing responsive interfaces, implementing real-time
                services, and optimizing scalable backends, I deliver complete
                solutions from database architecture to VPS/cloud deployment.
                From integrating Expo push notification systems to orchestrating
                containerized environments with Docker, Nginx, and CI/CD
                pipelines, I focus on writing clean, maintainable, and
                production-ready code while collaborating effectively with
                cross-functional teams to deliver reliable and scalable
                solutions.
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={0.18}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button
              type="button"
              onClick={() => scrollToId("projects")}
              className="btn-primary group"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
            <Link href={SITE.resumePath} className="btn-ghost">
              <Download className="h-4 w-4 text-accent" />
              Download Resume
            </Link>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="inline-flex items-center justify-center rounded-full border border-transparent px-2 py-3 text-sm font-semibold text-subtle underline-offset-4 transition hover:text-heading hover:underline sm:px-4"
            >
              Contact Me
            </button>
          </Reveal>
        </div>

        <div className="relative z-10 lg:col-span-5">
          <motion.div
            style={{ y }}
            className="relative mx-auto max-w-md lg:max-w-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto aspect-[4/5] w-full max-w-[280px]"
            >
              <div className="absolute inset-6 rounded-[2.2rem] bg-indigo-500/20 blur-2xl" />
              <motion.div className="relative h-full w-full">
                <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] border-gradient glow-ring">
                  <div className="absolute inset-[1px] overflow-hidden rounded-[2.15rem] bg-[var(--theme-surface)]">
                    <Image
                      src="/profile.png"
                      alt="Pratyusha — Full Stack Developer"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 280px"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)]/70 via-transparent to-transparent" />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <div className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start lg:justify-center">
              {HERO_TECH_BADGES.map((t) => (
                <span key={t} className="chip text-xs font-semibold">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Skills — full width below the intro + image row */}
      <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <Reveal delay={0.22} className="space-y-3">
          {[
            {
              k: "Frontend",
              v: "React, React Native, TypeScript, JavaScript (ES6+), Redux, Zustand, Context API, Next.js, Expo, TailwindCSS, Material UI (MUI), Bootstrap",
            },
            {
              k: "Backend",
              v: "Node.js, Express.js, REST APIs, Authentication (JWT, Passport.js, OAuth/Google Login), WebSockets, Socket.IO",
            },
            {
              k: "Databases & Storage",
              v: "MongoDB, MySQL, Firebase, Amazon S3, Redis",
            },
            {
              k: "Cloud & DevOps",
              v: "AWS (EC2, S3), Docker, CI/CD, Nginx, PM2, SSL/TLS, SSH, VPS Deployment, Vercel, Netlify, Cron Jobs",
            },
            {
              k: "API & Data Handling",
              v: "Axios, React Query (TanStack Query), API Integration, Payment Integrations (Stripe/Razorpay)",
            },
            {
              k: "Mobile & Notifications",
              v: "Expo Notifications, Push Notifications, Deep Linking",
            },
            {
              k: "Analytics & Monitoring",
              v: "Google Analytics (GA4), Mixpanel",
            },
            {
              k: "Tools & Workflow",
              v: "Git, GitHub, Postman, Figma, npm/yarn, Linux Command Line",
            },
          ].map((row) => (
            <div
              key={row.k}
              className="panel rounded-2xl px-4 py-3 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3"
            >
              <p className="text-xs uppercase tracking-wide text-subtle whitespace-nowrap shrink-0 w-44">
                {row.k}
              </p>
              <p className="text-sm font-semibold text-heading leading-relaxed">
                {row.v}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
