"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, Send } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function validate(name: string, email: string, message: string): Errors {
  const e: Errors = {};
  if (name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email.";
  if (message.trim().length < 10) e.message = "Tell me a bit more (10+ characters).";
  return e;
}

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const socials = useMemo(
    () => [
      { href: SITE.github, label: "GitHub", icon: Github },
      { href: SITE.linkedin, label: "LinkedIn", icon: Linkedin },
      { href: `mailto:${SITE.email}`, label: SITE.email, icon: Mail },
      { href: `tel:${SITE.phone.replace(/\s/g, "")}`, label: SITE.phone, icon: Phone },
    ],
    [],
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate(name, email, message);
    setErrors(next);
    if (Object.keys(next).length) return;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "18420264-7a70-4731-9200-8da0cc92b928",
          name,
          email,
          message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSent(true);
        setName("");
        setEmail("");
        setMessage("");
        window.setTimeout(() => setSent(false), 5000);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s build something resilient, fast, and beautifully usable"
          subtitle="Tell me about the problem space, constraints, and what success looks like. I typically respond within one business day."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="panel rounded-3xl p-6 sm:p-7">
              <p className="text-sm font-semibold text-heading">Direct channels</p>
              <p className="mt-2 text-sm leading-relaxed text-subtle">
                Prefer email for detailed briefs. For quick intros, LinkedIn works great too.
              </p>

              <div className="mt-6 grid gap-3">
                {socials.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                    className="panel-hover group flex items-center justify-between rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-3 text-sm text-body transition"
                  >
                    <span className="flex items-center gap-3">
                      <s.icon className="h-4 w-4 icon-themed transition group-hover:scale-110" />
                      {s.label}
                    </span>
                    <span className="text-xs font-semibold text-subtle transition group-hover:text-accent">
                      Open
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              className="panel rounded-3xl p-6 sm:p-8"
              noValidate
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label className="text-xs font-semibold uppercase tracking-wide text-subtle" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={cn(
                      "mt-2 w-full rounded-xl border bg-[var(--theme-surface)] px-4 py-3 text-sm text-heading outline-none transition placeholder:text-subtle",
                      errors.name ? "border-red-400/40" : "border-[var(--theme-border)] focus:border-[var(--theme-accent)]",
                    )}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  {errors.name ? <p className="mt-2 text-xs text-red-300">{errors.name}</p> : null}
                </div>
                <div className="sm:col-span-1">
                  <label className="text-xs font-semibold uppercase tracking-wide text-subtle" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      "mt-2 w-full rounded-xl border bg-[var(--theme-surface)] px-4 py-3 text-sm text-heading outline-none transition placeholder:text-subtle",
                      errors.email ? "border-red-400/40" : "border-[var(--theme-border)] focus:border-[var(--theme-accent)]",
                    )}
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                  {errors.email ? <p className="mt-2 text-xs text-red-300">{errors.email}</p> : null}
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs font-semibold uppercase tracking-wide text-subtle" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className={cn(
                    "mt-2 w-full resize-y rounded-xl border bg-[var(--theme-surface)] px-4 py-3 text-sm text-heading outline-none transition placeholder:text-subtle",
                    errors.message ? "border-red-400/40" : "border-[var(--theme-border)] focus:border-[var(--theme-accent)]",
                  )}
                  placeholder="What are you building, what’s the timeline, and what does great look like?"
                />
                {errors.message ? <p className="mt-2 text-xs text-red-300">{errors.message}</p> : null}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <motion.button
                  type="submit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  className="btn-primary"
                >
                  <Send className="h-4 w-4" />
                  Send message
                </motion.button>
                {sent ? (
                  <p className="text-sm font-semibold text-emerald-300">Thanks — your message has been sent successfully!</p>
                ) : (
                  <p className="text-xs text-subtle">
                    Your message will be sent directly to my inbox securely.
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
