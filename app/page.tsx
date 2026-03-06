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
  FiMail,
  FiKey,
  FiRefreshCw,
  FiUser,
  FiSmartphone,
  FiAlertTriangle,
} from "react-icons/fi";
import { AiFillGithub } from "react-icons/ai";
import {
  SiTypescript,
  SiExpress,
  SiPrisma,
  SiPostgresql,
  SiRedis,
  SiNextdotjs,
  SiDocker,
  SiJsonwebtokens,
} from "react-icons/si";

/* ── Data ── */

const features = [
  {
    icon: FiLock,
    title: "Email & Password",
    desc: "Register, login, email verification, password reset — production-ready.",
  },
  {
    icon: FiGlobe,
    title: "OAuth 2.0",
    desc: "Google, GitHub, Facebook via Strategy Pattern. Extensible by design.",
  },
  {
    icon: FiShield,
    title: "MFA / TOTP",
    desc: "One-time passwords with QR setup, backup codes, and challenge flow.",
  },
  {
    icon: FiDatabase,
    title: "Session Management",
    desc: "JWT access tokens + rotating refresh tokens with reuse detection.",
  },
  {
    icon: FiZap,
    title: "Rate Limiting",
    desc: "9 Redis-backed rate limiters prevent brute-force and abuse.",
  },
  {
    icon: FiCode,
    title: "TypeScript Native",
    desc: "Strict mode. Full type safety from validation to response.",
  },
];

const techStack = [
  {
    name: "TypeScript",
    icon: SiTypescript,
    desc: "Strict-mode type safety across the entire codebase",
  },
  {
    name: "Express 5",
    icon: SiExpress,
    desc: "Web framework with async middleware pipeline",
  },
  {
    name: "Prisma",
    icon: SiPrisma,
    desc: "Type-safe ORM for all database operations",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    desc: "Primary store for users, sessions, and MFA secrets",
  },
  {
    name: "Redis",
    icon: SiRedis,
    desc: "In-memory rate limiting and OAuth state management",
  },
  {
    name: "JWT",
    icon: SiJsonwebtokens,
    desc: "Stateless access tokens with refresh rotation",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    desc: "React meta-framework powering the frontend",
  },
  {
    name: "Docker",
    icon: SiDocker,
    desc: "Containerized deployment for any environment",
  },
];

/* ── Page ── */

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1C1C1C] overflow-hidden">
      {/* ── HERO ── */}
      <section className="section-grid relative w-full flex flex-col items-center px-6 pt-32 pb-20 sm:pt-44 sm:pb-28">
        {/* Matrix rain */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[8, 18, 32, 50, 68, 82, 92].map((left, i) => (
            <div
              key={i}
              className="matrix-line"
              style={{
                left: `${left}%`,
                animationDelay: `${i * 1.1}s`,
                animationDuration: `${7 + i * 0.4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-[860px] mx-auto text-center">
          <h1 className="text-[44px] sm:text-[60px] md:text-[76px] font-[300] tracking-[-0.035em] leading-[1.05] text-white">
            Secure in minutes
            <br />
            <span className="text-[#3ECF8E]">Scale to millions</span>
          </h1>

          <p className="mt-6 text-[15px] sm:text-[17px] text-[#888] max-w-[520px] mx-auto leading-[1.7] font-[300]">
            The authentication platform for Express&nbsp;apps.
            Email/Password, OAuth, MFA, Sessions, Rate&nbsp;Limiting
            &mdash; built with TypeScript.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/docs/getting-started"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-[4px] bg-[#3ECF8E] text-[#1C1C1C] px-5 py-[10px] text-[14px] font-medium hover:bg-[#4EEEA0] transition-colors"
            >
              Start your project
            </Link>
            <a
              href="https://github.com/nandalalshukla/authhero"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-[4px] border border-[#2E2E2E] text-white px-5 py-[10px] text-[14px] font-medium hover:border-[#444] hover:bg-white/[0.02] transition-colors"
            >
              <AiFillGithub size={16} />
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── SHIELD LOGO ── */}
      <section className="relative py-20 sm:py-28 flex justify-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="logo-container relative z-10 cursor-pointer p-8 rounded-3xl">
          <div className="relative">
            <div className="absolute -inset-8 rounded-2xl border border-[#222]/40" />
            <div className="absolute -inset-4 rounded-xl border border-[#222]/30" />
            <svg
              className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] opacity-[0.06]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="0.3" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="white" strokeWidth="0.3" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.3" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.3" />
            </svg>
            <svg
              width="180"
              height="180"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="logo-shield"
                d="M60 10L18 32v28c0 27.75 19.2 53.7 42 58 22.8-4.3 42-30.25 42-58V32L60 10z"
                fill="none"
                stroke="#444"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                className="logo-shield"
                d="M60 18L24 37v23c0 24 16.5 46.5 36 50.5 19.5-4 36-26.5 36-50.5V37L60 18z"
                fill="none"
                stroke="#333"
                strokeWidth="1"
                strokeLinejoin="round"
                strokeDasharray="4 4"
              />
              <rect className="logo-lock" x="42" y="52" width="36" height="28" rx="4" fill="none" stroke="#555" strokeWidth="2.5" />
              <path className="logo-accent" d="M48 52V42a12 12 0 0124 0v10" fill="none" stroke="#3ECF8E" strokeWidth="2.5" strokeLinecap="round" />
              <circle className="logo-lock" cx="60" cy="66" r="4" fill="none" stroke="#555" strokeWidth="2" />
              <line className="logo-lock" x1="60" y1="70" x2="60" y2="74" stroke="#555" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── FEATURES (bento grid) ── */}
      <section className="section-grid relative py-24 sm:py-32">
        <div className="relative z-10 max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[32px] sm:text-[40px] font-[300] tracking-[-0.02em] text-white leading-tight">
              Everything you need for auth
            </h2>
            <p className="mt-4 text-[15px] text-[#666] max-w-xl mx-auto">
              Production-ready security primitives. Focus on your product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#222] rounded-lg overflow-hidden">
            {features.map((f) => (
              <div
                key={f.title}
                className="group bg-[#1C1C1C] p-6 hover:bg-[#1E1E1E] transition-colors"
              >
                <f.icon className="w-[18px] h-[18px] text-[#555] group-hover:text-[#3ECF8E] transition-colors mb-4" />
                <h3 className="text-[14px] font-medium text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-[13px] text-[#666] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW AUTHHERO WORKS (with OAuth) ── */}
      <section className="section-grid relative py-24 sm:py-32">
        <div className="relative z-10 max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[32px] sm:text-[40px] font-[300] tracking-[-0.02em] text-white leading-tight">
              How AuthHero works
            </h2>
            <p className="mt-4 text-[15px] text-[#666] max-w-xl mx-auto">
              Two authentication paths converge into a single secure session.
            </p>
          </div>

          {/* Two parallel paths */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Email / Password path */}
            <div className="rounded-lg border border-[#222] p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-md bg-[#3ECF8E]/10 flex items-center justify-center">
                  <FiMail className="w-4 h-4 text-[#3ECF8E]" />
                </div>
                <span className="text-[14px] font-medium text-white">
                  Email / Password
                </span>
              </div>
              <div className="space-y-4">
                {[
                  {
                    n: "01",
                    t: "Register",
                    d: "Password hashed with Argon2. Verification email queued via BullMQ.",
                  },
                  {
                    n: "02",
                    t: "Verify Email",
                    d: "SHA-256 hashed token verified. Account marked as active.",
                  },
                  {
                    n: "03",
                    t: "Login",
                    d: "Credentials verified against Argon2 hash. Session initiated.",
                  },
                ].map((s) => (
                  <div key={s.n} className="flex gap-3">
                    <span className="text-[11px] font-mono text-[#3ECF8E]/50 mt-0.5 shrink-0">
                      {s.n}
                    </span>
                    <div>
                      <p className="text-[13px] font-medium text-[#ccc]">
                        {s.t}
                      </p>
                      <p className="text-[12px] text-[#555] mt-0.5">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* OAuth 2.0 path */}
            <div className="rounded-lg border border-[#222] p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-md bg-[#3ECF8E]/10 flex items-center justify-center">
                  <FiGlobe className="w-4 h-4 text-[#3ECF8E]" />
                </div>
                <span className="text-[14px] font-medium text-white">
                  OAuth 2.0
                </span>
              </div>
              <div className="space-y-4">
                {[
                  {
                    n: "01",
                    t: "Choose Provider",
                    d: "Redirect to Google, GitHub, or Facebook authorization.",
                  },
                  {
                    n: "02",
                    t: "Authorize",
                    d: "User grants consent. Provider returns authorization code.",
                  },
                  {
                    n: "03",
                    t: "Exchange Code",
                    d: "One-time code stored in Redis. Tokens issued on exchange.",
                  },
                ].map((s) => (
                  <div key={s.n} className="flex gap-3">
                    <span className="text-[11px] font-mono text-[#3ECF8E]/50 mt-0.5 shrink-0">
                      {s.n}
                    </span>
                    <div>
                      <p className="text-[13px] font-medium text-[#ccc]">
                        {s.t}
                      </p>
                      <p className="text-[12px] text-[#555] mt-0.5">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Convergence */}
          <div className="flex justify-center py-1">
            <div className="flex flex-col items-center gap-0">
              <div className="w-px h-6 bg-gradient-to-b from-[#333] to-[#222]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#333]" />
            </div>
          </div>

          {/* Merged flow */}
          <div className="max-w-xl mx-auto space-y-3 mt-1">
            {/* MFA */}
            <div className="rounded-lg border border-[#222] p-5 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-md bg-[#3ECF8E]/10 flex items-center justify-center shrink-0 mt-0.5">
                <FiSmartphone className="w-4 h-4 text-[#3ECF8E]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-[14px] font-medium text-white">
                    MFA Challenge
                  </h4>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#222] text-[#555] font-mono border border-[#2a2a2a]">
                    optional
                  </span>
                </div>
                <p className="text-[12px] text-[#555] mt-1">
                  If enabled, user enters TOTP code or backup code to complete
                  authentication.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-px h-3 bg-[#222]" />
            </div>

            {/* Session */}
            <div className="rounded-lg border border-[#222] p-5 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-md bg-[#3ECF8E]/10 flex items-center justify-center shrink-0 mt-0.5">
                <FiKey className="w-4 h-4 text-[#3ECF8E]" />
              </div>
              <div>
                <h4 className="text-[14px] font-medium text-white">
                  Session Created
                </h4>
                <p className="text-[12px] text-[#555] mt-1">
                  JWT access token (15 min) + httpOnly refresh cookie (30 days)
                  with atomic token rotation.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-px h-3 bg-[#222]" />
            </div>

            {/* Protected access */}
            <div className="rounded-lg border border-[#3ECF8E]/20 p-5 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-md bg-[#3ECF8E]/10 flex items-center justify-center shrink-0 mt-0.5">
                <FiShield className="w-4 h-4 text-[#3ECF8E]" />
              </div>
              <div>
                <h4 className="text-[14px] font-medium text-white">
                  Protected Access
                </h4>
                <p className="text-[12px] text-[#555] mt-1">
                  JWT verified per request. Refresh tokens rotated atomically.
                  Reuse of revoked token triggers full session revocation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE ── */}
      <section className="section-grid relative py-24 sm:py-32">
        <div className="relative z-10 max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[32px] sm:text-[40px] font-[300] tracking-[-0.02em] text-white leading-tight">
              Built for performance
            </h2>
            <p className="mt-4 text-[15px] text-[#666] max-w-xl mx-auto">
              Express 5, PostgreSQL, Redis, and BullMQ handling millions of
              requests.
            </p>
          </div>

          <div className="relative rounded-lg border border-[#222] p-8 md:p-12 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              {/* Client */}
              <div className="md:col-span-1">
                <div className="rounded-lg border border-[#222] p-4 text-center">
                  <FiGlobe className="w-5 h-5 text-blue-400/70 mx-auto mb-3" />
                  <p className="text-[13px] font-medium text-white">
                    Client App
                  </p>
                  <p className="text-[10px] text-[#555] font-mono mt-1">
                    React / Next.js
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[9px] text-[#444] font-mono">
                    HTTPS
                  </span>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#333] to-transparent min-w-[50px]" />
                </div>
              </div>

              {/* AuthHero */}
              <div className="md:col-span-1">
                <div className="rounded-lg border border-[#3ECF8E]/20 p-4 text-center">
                  <FiShield className="w-5 h-5 text-[#3ECF8E] mx-auto mb-3" />
                  <p className="text-[13px] font-bold text-white">AuthHero</p>
                  <p className="text-[10px] text-[#555] font-mono mt-1">
                    Express 5 + TS
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center gap-1">
                    {["Helmet", "CORS", "Rate Limit", "Zod", "JWT"].map(
                      (m) => (
                        <span
                          key={m}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-[#1C1C1C] text-[#666] font-mono border border-[#222]"
                        >
                          {m}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#333] to-transparent min-w-[50px]" />
              </div>

              {/* Infrastructure */}
              <div className="md:col-span-1 flex flex-col gap-2">
                <div className="rounded-lg border border-[#222] p-3 flex items-center gap-3">
                  <SiPostgresql className="text-blue-400/70 w-4 h-4 shrink-0" />
                  <div>
                    <p className="text-[12px] font-medium text-white">
                      PostgreSQL
                    </p>
                    <p className="text-[9px] text-[#555]">Users / Sessions</p>
                  </div>
                </div>
                <div className="rounded-lg border border-[#222] p-3 flex items-center gap-3">
                  <SiRedis className="text-red-400/70 w-4 h-4 shrink-0" />
                  <div>
                    <p className="text-[12px] font-medium text-white">Redis</p>
                    <p className="text-[9px] text-[#555]">
                      Rate Limits / OAuth
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-[#222] p-3 flex items-center gap-3">
                  <FiMail className="text-amber-400/70 w-4 h-4 shrink-0" />
                  <div>
                    <p className="text-[12px] font-medium text-white">BullMQ</p>
                    <p className="text-[9px] text-[#555]">Email Workers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security bar */}
            <div className="relative z-10 mt-8 pt-6 border-t border-[#222]">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {[
                  { icon: FiLock, label: "Argon2 Hashing" },
                  { icon: FiShield, label: "AES-256-GCM" },
                  { icon: FiRefreshCw, label: "Token Rotation" },
                  { icon: FiAlertTriangle, label: "Reuse Detection" },
                  { icon: FiKey, label: "CSRF Protection" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <s.icon className="w-3 h-3 text-[#444]" />
                    <span className="text-[11px] text-[#444] font-medium">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK (with hover tooltips) ── */}
      <section className="section-grid relative py-24 sm:py-32">
        <div className="relative z-10 max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[32px] sm:text-[40px] font-[300] tracking-[-0.02em] text-white leading-tight">
              Built with
            </h2>
            <p className="mt-4 text-[15px] text-[#666] max-w-xl mx-auto">
              Every tool chosen for reliability, performance, and developer
              experience.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="group relative flex flex-col items-center gap-3 rounded-lg border border-[#222] p-5 hover:border-[#333] transition-all"
              >
                <tech.icon className="w-7 h-7 text-[#555] group-hover:text-[#999] transition-colors duration-300" />
                <span className="text-[13px] font-medium text-[#888] group-hover:text-white transition-colors duration-300">
                  {tech.name}
                </span>

                {/* Hover tooltip */}
                <div className="tech-tooltip">
                  <div className="bg-[#1C1C1C] border border-[#333] rounded-md px-3 py-2 shadow-xl">
                    <p className="text-[11px] text-[#999] whitespace-nowrap">
                      {tech.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CODE SHOWCASE ── */}
      <section className="section-grid relative py-24 sm:py-32">
        <div className="relative z-10 max-w-[1000px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-[32px] sm:text-[40px] font-[300] tracking-[-0.02em] text-white leading-tight mb-6">
                Up and running
                <br />
                in under 5 minutes
              </h2>
              <p className="text-[15px] text-[#666] leading-relaxed mb-8">
                Install the package, create your auth server, and you instantly
                get 14&nbsp;production-ready API endpoints &mdash; registration,
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
                    className="flex items-center gap-3 text-[13px] text-[#888]"
                  >
                    <FiCheckCircle className="w-3.5 h-3.5 text-[#3ECF8E] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-[#222] bg-[#111] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#222]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                </div>
                <span className="text-[11px] text-[#444] ml-2 font-mono">
                  index.ts
                </span>
              </div>
              <pre className="p-5 text-[13px] leading-[1.8] overflow-x-auto">
                <code className="text-[#888]">
                  <span className="text-[#444]">{`// 1. Import\n`}</span>
                  <span className="text-[#C586C0]">{`import `}</span>
                  <span className="text-[#3ECF8E]">{`"dotenv/config"`}</span>
                  <span>{`;\n`}</span>
                  <span className="text-[#C586C0]">{`import`}</span>
                  <span>{` { `}</span>
                  <span className="text-[#DCDCAA]">{`createAuthHero`}</span>
                  <span>{` } `}</span>
                  <span className="text-[#C586C0]">{`from `}</span>
                  <span className="text-[#3ECF8E]">{`"@nandalalshukla/auth-hero"`}</span>
                  <span>{`;\n\n`}</span>
                  <span className="text-[#444]">{`// 2. Create & Start\n`}</span>
                  <span className="text-[#569CD6]">{`const `}</span>
                  <span className="text-white">{`auth`}</span>
                  <span>{` = `}</span>
                  <span className="text-[#C586C0]">{`await `}</span>
                  <span className="text-[#DCDCAA]">{`createAuthHero`}</span>
                  <span>{`();\n`}</span>
                  <span className="text-white">{`auth`}</span>
                  <span>{`.app.`}</span>
                  <span className="text-[#DCDCAA]">{`listen`}</span>
                  <span>{`(`}</span>
                  <span className="text-[#B5CEA8]">{`3000`}</span>
                  <span>{`);\n\n`}</span>
                  <span className="text-[#444]">{`// -> 14 endpoints ready\n`}</span>
                  <span className="text-[#444]">{`// -> Email/password + OAuth + MFA\n`}</span>
                  <span className="text-[#444]">{`// -> JWT sessions + rate limiting`}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "14+", label: "API Endpoints" },
              { value: "3", label: "OAuth Providers" },
              { value: "100%", label: "TypeScript" },
              { value: "<5min", label: "Setup Time" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-[36px] font-[300] text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[12px] text-[#555] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-grid relative py-24 sm:py-32">
        <div className="relative z-10 max-w-[600px] mx-auto px-6 text-center">
          <h2 className="text-[32px] sm:text-[40px] font-[300] tracking-[-0.02em] text-white leading-tight mb-4">
            Start building today
          </h2>
          <p className="text-[15px] text-[#666] mb-10">
            Add production-grade authentication to your Express app in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/docs/getting-started"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-[4px] bg-[#3ECF8E] text-[#1C1C1C] px-5 py-[10px] text-[14px] font-medium hover:bg-[#4EEEA0] transition-colors"
            >
              Read the Docs
              <FiArrowRight size={14} />
            </Link>
            <Link
              href="/docs/api-reference"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-[4px] border border-[#2E2E2E] text-white px-5 py-[10px] text-[14px] font-medium hover:border-[#444] hover:bg-white/[0.02] transition-colors"
            >
              API Reference
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#222] py-12">
        <div className="max-w-[1000px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[12px] text-[#444]">
            &copy; {new Date().getFullYear()} AuthHero &middot; MIT License
          </span>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/nandalalshukla/authhero"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#444] hover:text-white transition-colors text-[12px]"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@nandalalshukla/auth-hero"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#444] hover:text-white transition-colors text-[12px]"
            >
              npm
            </a>
            <Link
              href="/docs"
              className="text-[#444] hover:text-white transition-colors text-[12px]"
            >
              Docs
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
