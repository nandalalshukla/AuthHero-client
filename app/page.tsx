import Link from "next/link";
import {
  FiActivity,
  FiArrowRight,
  FiCheckCircle,
  FiCode,
  FiDatabase,
  FiGlobe,
  FiLock,
  FiMail,
  FiServer,
  FiShield,
  FiZap,
} from "react-icons/fi";
import {
  SiExpress,
  SiJsonwebtokens,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiRedis,
  SiTypescript,
} from "react-icons/si";

const featureCards = [
  {
    icon: FiLock,
    title: "Credential Auth",
    description:
      "Built-in email and password flow with verification, reset links, and hardened defaults.",
  },
  {
    icon: FiGlobe,
    title: "OAuth in Minutes",
    description:
      "Ship Google, GitHub, and provider strategies through a unified and extensible auth API.",
  },
  {
    icon: FiShield,
    title: "MFA Challenge Layer",
    description:
      "Protect sensitive actions with TOTP, backup codes, and challenge-aware session upgrades.",
  },
  {
    icon: FiActivity,
    title: "Session Intelligence",
    description:
      "Rotate tokens, detect refresh reuse, and track trust signals for every active session.",
  },
  {
    icon: FiZap,
    title: "Abuse Controls",
    description:
      "Rate-limit auth routes and suspicious patterns before they become incidents.",
  },
  {
    icon: FiCode,
    title: "Type-Safe API",
    description:
      "Strong TypeScript contracts from payload validation to controller responses.",
  },
];

const stats = [
  { label: "Auth Endpoints", value: "14+" },
  { label: "Median Integration", value: "8 min" },
  { label: "Security Controls", value: "20+" },
  { label: "Open Source", value: "100%" },
];

const checklist = [
  "Drop-in Express middleware with sane defaults",
  "Typed schema validation and input guards",
  "Token rotation, revocation, and anomaly hooks",
  "Bring-your-own database, cache, and email provider",
];

const architectureBlocks = [
  {
    icon: FiServer,
    title: "App Layer",
    stack: "Next.js Client -> Express API",
    detail: "Handles auth routes, validation, and strategy orchestration.",
  },
  {
    icon: FiActivity,
    title: "Queue Layer",
    stack: "BullMQ + Redis",
    detail: "Email jobs and background work are processed asynchronously.",
  },
  {
    icon: FiDatabase,
    title: "Data Layer",
    stack: "Prisma + PostgreSQL",
    detail: "Stores users, sessions, MFA state, and audit-related records.",
  },
  {
    icon: FiMail,
    title: "Worker Layer",
    stack: "Email Worker",
    detail: "Consumes queue jobs for verification, reset, and security alerts.",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-x-clip bg-[#080b14] text-zinc-100 selection:bg-cyan-300/30">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(56,189,248,0.22),transparent_42%),radial-gradient(circle_at_82%_5%,rgba(14,165,233,0.15),transparent_36%),linear-gradient(180deg,#0b1020_0%,#080b14_56%,#070a12_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 bg-[linear-gradient(rgba(148,163,184,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.09)_1px,transparent_1px)] bg-size-[56px_56px]" />

      <section className="relative mx-auto grid w-full max-w-310 items-center gap-12 px-6 pb-20 pt-28 md:grid-cols-2 md:gap-10 md:pt-40 lg:pb-28">
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-300/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.24em] text-cyan-100/90">
            <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse" />
            Built For Product Teams
          </span>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
            Auth that feels
            <span className="block bg-linear-to-r from-cyan-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
              enterprise on day one.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
            AuthHero gives your app a modern identity stack with secure
            defaults, expressive APIs, and production-ready auth journeys that
            ship fast.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/docs/getting-started"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-200/60 bg-linear-to-r from-cyan-300 to-sky-300 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:scale-[1.02]"
            >
              Start Free
              <FiArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-100 backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              Explore Docs
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-300">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-30">
                <p className="font-display text-2xl text-cyan-200">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-in-up [animation-delay:120ms]">
          <div className="relative rounded-3xl border border-cyan-100/20 bg-[#0f162b]/85 p-4 shadow-[0_24px_100px_rgba(14,165,233,0.28)] backdrop-blur-xl sm:p-6">
            <div className="rounded-2xl border border-cyan-100/15 bg-[#0a1020] p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </div>
                <span className="font-mono text-xs text-slate-400">
                  authhero.config.ts
                </span>
              </div>

              <pre className="overflow-x-auto font-mono text-[12px] leading-6 text-slate-300 sm:text-[13px]">
                <code>
                  <span className="text-slate-500">// Install</span>
                  {"\n"}
                  <span className="text-cyan-300">pnpm add</span>{" "}
                  <span className="text-emerald-300">
                    @nandalalshukla/auth-hero
                  </span>
                  {"\n\n"}
                  <span className="text-sky-300">import</span>{" "}
                  {"{ createAuthHero } "}
                  <span className="text-sky-300">from</span>{" "}
                  <span className="text-emerald-300">
                    "@nandalalshukla/auth-hero"
                  </span>
                  {";\n\n"}
                  <span className="text-sky-300">const</span>{" "}
                  <span className="text-amber-200">auth</span>
                  {" = await "}
                  <span className="text-cyan-300">createAuthHero</span>
                  {"({\n"}
                  {"  appName: "}
                  <span className="text-emerald-300">"AuthHero SaaS"</span>
                  {",\n"}
                  {"  session: { strategy: "}
                  <span className="text-emerald-300">"jwt"</span>
                  {" },\n"}
                  {"  mfa: { enabled: "}
                  <span className="text-amber-200">true</span>
                  {" }\n"}
                  {"});\n\n"}
                  <span className="text-slate-500">
                    // mount: /api/v1/auth/*
                  </span>
                </code>
              </pre>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-emerald-200/20 bg-emerald-300/10 px-3 py-2 text-xs text-emerald-100">
                  Token reuse detection enabled
                </div>
                <div className="rounded-xl border border-cyan-200/20 bg-cyan-300/10 px-3 py-2 text-xs text-cyan-100">
                  OAuth providers connected
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-[#060a15]/70 py-10 backdrop-blur-lg">
        <div className="mx-auto flex max-w-310 flex-wrap items-center justify-center gap-10 px-6 text-slate-400">
          <SiTypescript className="h-7 w-7 transition-colors hover:text-cyan-200" />
          <SiExpress className="h-7 w-7 transition-colors hover:text-cyan-200" />
          <SiPrisma className="h-7 w-7 transition-colors hover:text-cyan-200" />
          <SiPostgresql className="h-7 w-7 transition-colors hover:text-cyan-200" />
          <SiRedis className="h-7 w-7 transition-colors hover:text-cyan-200" />
          <SiNextdotjs className="h-7 w-7 transition-colors hover:text-cyan-200" />
          <SiJsonwebtokens className="h-7 w-7 transition-colors hover:text-cyan-200" />
        </div>
      </section>

      <section className="relative border-b border-white/10 bg-[#060d1e]/70 py-24 md:py-28">
        <div className="mx-auto w-full max-w-310 px-6">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Architecture at a glance.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                The same core stack from your previous design is back: BullMQ,
                Redis, PostgreSQL, and worker-based email delivery.
              </p>
            </div>
            <Link
              href="/docs/architecture"
              className="inline-flex items-center gap-2 rounded-lg border border-cyan-200/35 px-4 py-2 text-sm font-semibold text-cyan-100 transition-colors hover:bg-cyan-300/10"
            >
              Full Architecture Docs
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-3xl border border-cyan-100/15 bg-[#09122a]/85 p-5 shadow-[0_20px_80px_rgba(6,182,212,0.18)] sm:p-7">
            <div className="grid gap-4 md:grid-cols-2">
              {architectureBlocks.map((block) => (
                <article
                  key={block.title}
                  className="rounded-2xl border border-white/12 bg-white/5 p-5"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-200/30 bg-cyan-300/10 text-cyan-100">
                    <block.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {block.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-cyan-200/90">
                    {block.stack}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {block.detail}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-emerald-200/20 bg-emerald-300/10 px-4 py-3 font-mono text-xs text-emerald-100">
              {
                "Request Flow: Client -> Express Auth API -> Redis rate limiter -> BullMQ email queue -> Worker -> PostgreSQL session state"
              }
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-310 px-6 py-24 md:py-28">
        <div className="mb-14 max-w-2xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Built like a security product. Priced like a dev tool.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Every surface of AuthHero is designed for velocity: strong auth
            primitives, clean DX, and runtime controls your team can trust.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((feature, index) => (
            <article
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-white/12 bg-linear-to-b from-white/10 to-transparent p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200/40"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-300/10 blur-2xl transition-opacity group-hover:opacity-100" />
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-200/35 bg-cyan-300/10 text-cyan-100">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-slate-300">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative border-t border-white/10 bg-[#070d1d]/80 py-24 md:py-28">
        <div className="mx-auto grid w-full max-w-310 gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Your launch checklist, already done.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Plug AuthHero into your API and move straight to product work. You
              get resilient auth flows, security tooling, and developer
              ergonomics from the first deploy.
            </p>

            <ul className="mt-8 space-y-4">
              {checklist.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-slate-200"
                >
                  <FiCheckCircle className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
                  <span className="leading-7">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/docs/api-reference"
              className="mt-10 inline-flex items-center gap-2 rounded-lg border border-cyan-200/35 px-4 py-2 text-sm font-semibold text-cyan-100 transition-colors hover:bg-cyan-300/10"
            >
              Browse API Reference
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-3xl border border-cyan-100/15 bg-[#0b142b]/90 p-5 shadow-[0_30px_120px_rgba(8,145,178,0.2)] sm:p-7">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-200/90">
                AuthHero Package Facts
              </p>
              <h3 className="mt-3 font-display text-2xl text-white sm:text-3xl">
                Secure auth code, owned by your stack.
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                AuthHero is a package, not a hosted auth platform. You integrate
                it into your own backend and keep full control of users,
                sessions, and authentication data.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/12 bg-[#101b35] p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Package
                  </p>
                  <p className="mt-2 text-lg font-semibold text-cyan-100">
                    @nandalalshukla/auth-hero
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-200/25 bg-emerald-300/10 p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-100/80">
                    Total So Far
                  </p>
                  <p className="mt-2 font-display text-3xl text-emerald-200">
                    290
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-white/12 bg-[#0f1a33] p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
                  Ownership Model
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Your application handles storage. AuthHero provides secure,
                  production-ready auth logic so teams can ship authentication
                  in minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-28">
        <div className="mx-auto w-full max-w-245 px-6 text-center">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Launch a safer product this sprint.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Keep your team focused on product features while AuthHero handles
            auth complexity behind a clean developer-first API.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-cyan-300 to-sky-300 px-7 py-3.5 text-sm font-semibold text-slate-950 transition-transform hover:scale-[1.02]"
            >
              Create Free Project
            </Link>
            <Link
              href="/docs/getting-started"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              See Quickstart
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
