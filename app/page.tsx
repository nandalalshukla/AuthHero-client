import Link from "next/link";
import {
  FiShield,
  FiZap,
  FiCode,
  FiLock,
  FiDatabase,
  FiGlobe,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import { AiFillGithub } from "react-icons/ai";

const features = [
  {
    icon: FiLock,
    title: "Email & Password",
    description:
      "Complete auth flows — register, login, email verification, password reset & change. Production-ready from day one.",
  },
  {
    icon: FiGlobe,
    title: "OAuth 2.0",
    description:
      "Google, GitHub, Facebook with the Strategy Pattern. Add custom providers in minutes with zero boilerplate.",
  },
  {
    icon: FiShield,
    title: "MFA (TOTP)",
    description:
      "Time-based one-time passwords with QR codes, backup codes, and a complete challenge flow.",
  },
  {
    icon: FiDatabase,
    title: "Session Management",
    description:
      "JWT access tokens + rotating refresh tokens with automatic reuse detection and revocation.",
  },
  {
    icon: FiZap,
    title: "Rate Limiting",
    description:
      "Per-route Redis-backed rate limiters prevent brute-force and DDoS attacks out of the box.",
  },
  {
    icon: FiCode,
    title: "TypeScript Native",
    description:
      "Built with TypeScript in strict mode. Full type safety from request validation to response payloads.",
  },
];

const techStack = [
  "TypeScript",
  "Express 5",
  "Prisma 7",
  "PostgreSQL",
  "Redis",
  "JWT",
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1C1C1C] pt-16 overflow-hidden">
      {/* ═══ Hero Section — Supabase style ═══ */}
      <section className="relative w-full flex flex-col items-center px-6 pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Heading — large bold, Supabase style */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tight text-white leading-[1.05] animate-fade-in-up">
            Secure in minutes
            <br />
            Scale to millions
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:0.1s]">
            AuthHero is the authentication platform for Express apps.
            <br className="hidden sm:block" />
            Start your project with Email/Password, OAuth, MFA, Sessions,
            <br className="hidden sm:block" />
            Rate Limiting, and full TypeScript support.
          </p>

          {/* CTAs — Supabase style: green filled + dark bordered */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up [animation-delay:0.2s]">
            <Link
              href="/docs/getting-started"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-md bg-[#3ECF8E] text-[#1C1C1C] px-6 py-2.5 text-sm font-medium hover:bg-[#4EEEA0] transition-all"
            >
              Start your project
            </Link>
            <a
              href="https://github.com/nandalalshukla/authhero"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-md border border-zinc-700 bg-[#2A2A2A] text-white px-6 py-2.5 text-sm font-medium hover:bg-[#333] hover:border-zinc-600 transition-all"
            >
              <AiFillGithub size={16} />
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ═══ Logo Showcase — wireframe shield that glows on hover ═══ */}
      <section className="relative py-16 sm:py-20 flex justify-center">
        {/* Grid background behind logo */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        <div className="logo-container relative z-10 cursor-pointer p-8 rounded-3xl">
          {/* Geometric construction guides (like Supabase elephant wireframe) */}
          <div className="relative">
            {/* Outer guide square */}
            <div className="absolute -inset-8 rounded-2xl border border-zinc-800/40" />
            <div className="absolute -inset-4 rounded-xl border border-zinc-800/30" />
            {/* Diagonal guides */}
            <svg
              className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] opacity-[0.08]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="0"
                x2="100"
                y2="100"
                stroke="white"
                strokeWidth="0.3"
              />
              <line
                x1="100"
                y1="0"
                x2="0"
                y2="100"
                stroke="white"
                strokeWidth="0.3"
              />
              <line
                x1="50"
                y1="0"
                x2="50"
                y2="100"
                stroke="white"
                strokeWidth="0.3"
              />
              <line
                x1="0"
                y1="50"
                x2="100"
                y2="50"
                stroke="white"
                strokeWidth="0.3"
              />
            </svg>

            {/* The main shield + lock logo */}
            <svg
              width="180"
              height="180"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Shield body */}
              <path
                className="logo-shield"
                d="M60 10L18 32v28c0 27.75 19.2 53.7 42 58 22.8-4.3 42-30.25 42-58V32L60 10z"
                fill="none"
                stroke="#444"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {/* Inner shield line */}
              <path
                className="logo-shield"
                d="M60 18L24 37v23c0 24 16.5 46.5 36 50.5 19.5-4 36-26.5 36-50.5V37L60 18z"
                fill="none"
                stroke="#333"
                strokeWidth="1"
                strokeLinejoin="round"
                strokeDasharray="4 4"
              />
              {/* Lock body */}
              <rect
                className="logo-lock"
                x="42"
                y="52"
                width="36"
                height="28"
                rx="4"
                fill="none"
                stroke="#555"
                strokeWidth="2.5"
              />
              {/* Lock shackle */}
              <path
                className="logo-accent"
                d="M48 52V42a12 12 0 0124 0v10"
                fill="none"
                stroke="#3ECF8E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Keyhole */}
              <circle
                className="logo-lock"
                cx="60"
                cy="66"
                r="4"
                fill="none"
                stroke="#555"
                strokeWidth="2"
              />
              <line
                className="logo-lock"
                x1="60"
                y1="70"
                x2="60"
                y2="74"
                stroke="#555"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ═══ Tech Stack Strip — like Supabase "Trusted by" ═══ */}
      <section className="relative border-t border-white/[0.06] py-10">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-zinc-500 mb-6">
            Built with modern technologies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="text-sm font-medium text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Features Section ═══ */}
      <section className="relative py-24 sm:py-32">
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-[#3ECF8E] text-sm font-semibold tracking-wide uppercase mb-3">
              Features
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Everything you need for authentication
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Production-ready security primitives, so you can focus on building
              your product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 card-hover"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#3ECF8E]/10 border border-[#3ECF8E]/20 mb-4">
                  <feature.icon className="w-5 h-5 text-[#3ECF8E]" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Code Showcase ═══ */}
      <section className="relative border-t border-white/[0.06] py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-[#3ECF8E] text-sm font-semibold tracking-wide uppercase mb-3">
                Quick Start
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
                Up and running in under 5 minutes
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Install the package, create your auth server, and you instantly
                get 14 production-ready API endpoints — including registration,
                login, OAuth, MFA, email verification, and session management.
              </p>
              <ul className="space-y-3">
                {[
                  "14 secure API endpoints",
                  "JWT with rotating refresh tokens",
                  "OAuth 2.0 (Google, GitHub, Facebook)",
                  "TOTP-based MFA with backup codes",
                  "Email verification & password reset",
                  "Redis-backed rate limiting",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-zinc-300"
                  >
                    <FiCheckCircle className="w-4 h-4 text-[#3ECF8E] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Code block */}
            <div className="rounded-xl border border-white/[0.06] bg-[#111] overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                </div>
                <span className="text-xs text-zinc-500 ml-2 font-mono">
                  index.ts
                </span>
              </div>
              <pre className="p-5 text-sm leading-relaxed overflow-x-auto">
                <code className="text-zinc-300">
                  <span className="text-zinc-500">{`// 1. Import\n`}</span>
                  <span>{`import `}</span>
                  <span className="text-[#3ECF8E]">{`"dotenv/config"`}</span>
                  <span>{`;\n`}</span>
                  <span>{`import { `}</span>
                  <span className="text-[#4EEEA0]">{`createAuthHero`}</span>
                  <span>{` } from `}</span>
                  <span className="text-[#3ECF8E]">
                    {`"@nandalalshukla/auth-hero"`}
                  </span>
                  <span>{`;\n\n`}</span>
                  <span className="text-zinc-500">
                    {`// 2. Create & Start\n`}
                  </span>
                  <span>{`const `}</span>
                  <span className="text-zinc-100">{`auth`}</span>
                  <span>{` = await `}</span>
                  <span className="text-[#4EEEA0]">{`createAuthHero`}</span>
                  <span>{`();\n`}</span>
                  <span>{`auth.app.`}</span>
                  <span className="text-zinc-100">{`listen`}</span>
                  <span>{`(`}</span>
                  <span className="text-amber-300">{`3000`}</span>
                  <span>{`);\n\n`}</span>
                  <span className="text-zinc-500">
                    {`// ✓ 14 endpoints ready\n`}
                  </span>
                  <span className="text-zinc-500">
                    {`// ✓ Email/password + OAuth + MFA\n`}
                  </span>
                  <span className="text-zinc-500">
                    {`// ✓ JWT sessions + rate limiting`}
                  </span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Stats ═══ */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "14+", label: "API Endpoints" },
              { value: "3", label: "OAuth Providers" },
              { value: "100%", label: "TypeScript" },
              { value: "<5min", label: "Setup Time" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA Section ═══ */}
      <section className="relative border-t border-white/[0.06] py-24 sm:py-32">
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Start building today
          </h2>
          <p className="text-lg text-zinc-400 mb-10">
            Add production-grade authentication to your Express app in minutes,
            not weeks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/docs/getting-started"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-md bg-[#3ECF8E] text-[#1C1C1C] px-6 py-2.5 text-sm font-medium hover:bg-[#4EEEA0] transition-all"
            >
              Read the Docs
              <FiArrowRight size={14} />
            </Link>
            <Link
              href="/docs/api-reference"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-md border border-zinc-700 bg-[#2A2A2A] text-white px-6 py-2.5 text-sm font-medium hover:bg-[#333] hover:border-zinc-600 transition-all"
            >
              API Reference
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-white/[0.06] py-12">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-zinc-500">
            © {new Date().getFullYear()} AuthHero. Open source under MIT
            License.
          </span>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/nandalalshukla/authhero"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors text-sm"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@nandalalshukla/auth-hero"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors text-sm"
            >
              npm
            </a>
            <Link
              href="/docs"
              className="text-zinc-500 hover:text-white transition-colors text-sm"
            >
              Docs
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
