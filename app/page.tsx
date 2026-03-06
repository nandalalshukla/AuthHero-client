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
  FiServer,
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
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiNextdotjs,
  SiDocker,
  SiJsonwebtokens,
  SiZod,
  SiVitest,
} from "react-icons/si";

/* ───────────── Data ───────────── */

const features = [
  {
    icon: FiLock,
    title: "Email & Password",
    desc: "Register, login, email verification, password reset & change — all production-ready out of the box.",
  },
  {
    icon: FiGlobe,
    title: "OAuth 2.0",
    desc: "Google, GitHub, Facebook via the Strategy Pattern. Add more providers in minutes with zero boilerplate.",
  },
  {
    icon: FiShield,
    title: "MFA (TOTP)",
    desc: "Time-based one-time passwords with QR setup, backup codes, and a complete challenge flow.",
  },
  {
    icon: FiDatabase,
    title: "Session Management",
    desc: "JWT access tokens + rotating refresh tokens with automatic reuse detection and revocation.",
  },
  {
    icon: FiZap,
    title: "Rate Limiting",
    desc: "Per-route Redis-backed rate limiters prevent brute-force and DDoS attacks out of the box.",
  },
  {
    icon: FiCode,
    title: "TypeScript Native",
    desc: "Built with TypeScript in strict mode. Full type safety from request validation to response payloads.",
  },
];

const techStack = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express 5", icon: SiExpress, color: "#FFFFFF" },
  { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "JWT", icon: SiJsonwebtokens, color: "#FB015B" },
  { name: "Zod", icon: SiZod, color: "#3E67B1" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Vitest", icon: SiVitest, color: "#6E9F18" },
];

const authFlowSteps = [
  {
    step: "1",
    icon: FiUser,
    title: "Register",
    desc: "User signs up with email & password. Password hashed with Argon2. Verification email queued via BullMQ.",
    color: "#3ECF8E",
  },
  {
    step: "2",
    icon: FiMail,
    title: "Verify Email",
    desc: "User clicks the email link. Token is SHA-256 hashed and verified. Account marked as verified.",
    color: "#3ECF8E",
  },
  {
    step: "3",
    icon: FiKey,
    title: "Login",
    desc: "Credentials verified with Argon2. JWT access token (15m) + rotating refresh token (30d) issued.",
    color: "#3ECF8E",
  },
  {
    step: "4",
    icon: FiSmartphone,
    title: "MFA Challenge",
    desc: "If MFA enabled: temp token issued, user enters TOTP code or backup code to complete login.",
    color: "#3ECF8E",
  },
  {
    step: "5",
    icon: FiRefreshCw,
    title: "Token Rotation",
    desc: "On refresh, old token atomically rotated. Reuse of revoked token triggers all-session revocation.",
    color: "#3ECF8E",
  },
  {
    step: "6",
    icon: FiShield,
    title: "Protected Access",
    desc: "JWT verified on each request. Session checked in DB. User status validated (active, not deleted).",
    color: "#3ECF8E",
  },
];

const endpoints = [
  { method: "POST", path: "/auth/register", label: "Register" },
  { method: "POST", path: "/auth/login", label: "Login" },
  { method: "POST", path: "/auth/verify-email", label: "Verify Email" },
  { method: "POST", path: "/auth/forgot-password", label: "Forgot Password" },
  { method: "POST", path: "/auth/reset-password", label: "Reset Password" },
  { method: "POST", path: "/auth/refresh-token", label: "Refresh Token" },
  { method: "POST", path: "/auth/logout", label: "Logout" },
  { method: "POST", path: "/auth/logout-all", label: "Logout All" },
  { method: "POST", path: "/auth/change-password", label: "Change Password" },
  { method: "GET", path: "/auth/me", label: "Get Profile" },
  { method: "GET", path: "/auth/oauth/:provider", label: "OAuth Redirect" },
  { method: "POST", path: "/auth/oauth/exchange", label: "OAuth Exchange" },
  { method: "POST", path: "/auth/mfa/setup", label: "MFA Setup" },
  { method: "POST", path: "/auth/mfa/challenge", label: "MFA Challenge" },
];

/* ───────────── Page ───────────── */

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1C1C1C] pt-16 overflow-hidden">

      {/* ═══════════════════════════════════════════════
          HERO — Supabase style: big heading, green line
          ═══════════════════════════════════════════════ */}
      <section className="relative w-full flex flex-col items-center px-6 pt-28 pb-20 sm:pt-40 sm:pb-28">
        <div className="relative z-10 max-w-[900px] mx-auto text-center">
          <h1 className="text-[42px] sm:text-[56px] md:text-[72px] font-[400] tracking-[-0.02em] leading-[1.1] text-white">
            Secure in minutes
            <br />
            <span className="text-[#3ECF8E]">Scale to millions</span>
          </h1>

          <p className="mt-6 text-[16px] sm:text-[18px] text-[#8F8F8F] max-w-[600px] mx-auto leading-[1.6]">
            AuthHero is the authentication platform for Express&nbsp;apps.
            <br className="hidden sm:block" />
            Start your project with Email/Password, OAuth, MFA, Sessions,
            <br className="hidden sm:block" />
            Rate&nbsp;Limiting, and full TypeScript support.
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
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-[4px] border border-[#2E2E2E] bg-[#1C1C1C] text-white px-5 py-[10px] text-[14px] font-medium hover:bg-[#2A2A2A] hover:border-[#444] transition-colors"
            >
              <AiFillGithub size={16} />
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TECH LOGO TICKER — scrolling marquee like Supabase
          ═══════════════════════════════════════════════ */}
      <section className="relative border-y border-white/[0.06] py-8 overflow-hidden">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.15em] text-[#8F8F8F] mb-6">
          Built with modern, battle-tested technologies
        </p>
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...techStack, ...techStack].map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="flex items-center gap-2.5 shrink-0 group"
              >
                <tech.icon className="w-5 h-5 text-[#555] group-hover:text-[#999] transition-colors duration-300" />
                <span className="text-[13px] text-[#555] group-hover:text-[#999] font-medium transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-12 animate-marquee whitespace-nowrap" aria-hidden>
            {[...techStack, ...techStack].map((tech, i) => (
              <div
                key={`dup-${tech.name}-${i}`}
                className="flex items-center gap-2.5 shrink-0 group"
              >
                <tech.icon className="w-5 h-5 text-[#555] group-hover:text-[#999] transition-colors duration-300" />
                <span className="text-[13px] text-[#555] group-hover:text-[#999] font-medium transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          WIREFRAME LOGO — shield that glows on hover
          ═══════════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 flex justify-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="logo-container relative z-10 cursor-pointer p-8 rounded-3xl">
          <div className="relative">
            <div className="absolute -inset-8 rounded-2xl border border-zinc-800/40" />
            <div className="absolute -inset-4 rounded-xl border border-zinc-800/30" />
            <svg className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] opacity-[0.08]" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="0.3" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="white" strokeWidth="0.3" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.3" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.3" />
            </svg>
            <svg width="180" height="180" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="logo-shield" d="M60 10L18 32v28c0 27.75 19.2 53.7 42 58 22.8-4.3 42-30.25 42-58V32L60 10z" fill="none" stroke="#444" strokeWidth="2" strokeLinejoin="round" />
              <path className="logo-shield" d="M60 18L24 37v23c0 24 16.5 46.5 36 50.5 19.5-4 36-26.5 36-50.5V37L60 18z" fill="none" stroke="#333" strokeWidth="1" strokeLinejoin="round" strokeDasharray="4 4" />
              <rect className="logo-lock" x="42" y="52" width="36" height="28" rx="4" fill="none" stroke="#555" strokeWidth="2.5" />
              <path className="logo-accent" d="M48 52V42a12 12 0 0124 0v10" fill="none" stroke="#3ECF8E" strokeWidth="2.5" strokeLinecap="round" />
              <circle className="logo-lock" cx="60" cy="66" r="4" fill="none" stroke="#555" strokeWidth="2" />
              <line className="logo-lock" x1="60" y1="70" x2="60" y2="74" stroke="#555" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURES — Supabase product cards
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[32px] sm:text-[40px] font-[400] tracking-[-0.02em] text-white leading-tight">
              Everything you need<br />for authentication
            </h2>
            <p className="mt-4 text-[16px] text-[#8F8F8F] max-w-xl mx-auto">
              Production-ready security primitives, so you can focus on building your product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-lg border border-[#2A2A2A] bg-[#1C1C1C] p-6 hover:border-[#3ECF8E]/30 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#3ECF8E]/10 border border-[#3ECF8E]/20 mb-4">
                  <f.icon className="w-5 h-5 text-[#3ECF8E]" />
                </div>
                <h3 className="text-[15px] font-medium text-white mb-2">{f.title}</h3>
                <p className="text-[13px] text-[#8F8F8F] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          AUTH FLOW DIAGRAM — visual step-by-step
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[32px] sm:text-[40px] font-[400] tracking-[-0.02em] text-white leading-tight">
              How AuthHero works
            </h2>
            <p className="mt-4 text-[16px] text-[#8F8F8F] max-w-2xl mx-auto">
              A complete authentication lifecycle — from registration to secure API access — with refresh token rotation and MFA built in.
            </p>
          </div>

          {/* Flow Steps — connected vertical line */}
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical connector line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#3ECF8E]/40 via-[#3ECF8E]/20 to-transparent hidden sm:block" />

            <div className="space-y-1">
              {authFlowSteps.map((s, i) => (
                <div key={s.step} className="relative flex gap-6 group">
                  {/* Step circle */}
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border border-[#2A2A2A] bg-[#1C1C1C] group-hover:border-[#3ECF8E]/40 transition-colors shrink-0">
                    <s.icon className="w-5 h-5 text-[#555] group-hover:text-[#3ECF8E] transition-colors" />
                  </div>

                  {/* Content card */}
                  <div className="flex-1 pb-8">
                    <div className="rounded-lg border border-[#2A2A2A] bg-[#1C1C1C] p-5 group-hover:border-[#3ECF8E]/20 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-mono font-bold text-[#3ECF8E] bg-[#3ECF8E]/10 px-2 py-0.5 rounded">
                          STEP {s.step}
                        </span>
                        <h3 className="text-[15px] font-medium text-white">{s.title}</h3>
                      </div>
                      <p className="text-[13px] text-[#8F8F8F] leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          ARCHITECTURE DIAGRAM — system overview
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[32px] sm:text-[40px] font-[400] tracking-[-0.02em] text-white leading-tight">
              Built for performance
            </h2>
            <p className="mt-4 text-[16px] text-[#8F8F8F] max-w-2xl mx-auto">
              A high-performance architecture with Express 5, PostgreSQL, Redis, and BullMQ handling millions of requests.
            </p>
          </div>

          <div className="relative rounded-xl border border-[#2A2A2A] bg-[#111] p-8 md:p-12 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />

            {/* ── Architecture Layout ── */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">

              {/* Client */}
              <div className="md:col-span-1 flex flex-col items-center gap-3">
                <div className="w-full rounded-lg border border-[#2A2A2A] bg-[#1C1C1C] p-4 text-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 mx-auto mb-3">
                    <FiGlobe className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-[13px] font-medium text-white">Client App</p>
                  <p className="text-[10px] text-[#555] font-mono mt-1">React / Next.js / Vue</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[9px] text-[#555] font-mono">HTTPS</span>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#3ECF8E]/50 to-transparent min-w-[60px]" />
                  <span className="text-[9px] text-[#555] font-mono">JSON</span>
                </div>
              </div>

              {/* AuthHero Core */}
              <div className="md:col-span-1 flex flex-col items-center gap-3">
                <div className="w-full rounded-lg border border-[#3ECF8E]/30 bg-[#1C1C1C] p-4 text-center shadow-[0_0_30px_-10px_rgba(62,207,142,0.2)]">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#3ECF8E]/10 border border-[#3ECF8E]/20 mx-auto mb-3">
                    <FiShield className="w-5 h-5 text-[#3ECF8E]" />
                  </div>
                  <p className="text-[13px] font-bold text-white">AuthHero</p>
                  <p className="text-[10px] text-[#555] font-mono mt-1">Express 5 · TypeScript</p>
                  <div className="mt-3 flex flex-wrap justify-center gap-1">
                    {["Helmet", "CORS", "Rate Limit", "Zod", "JWT"].map((m) => (
                      <span key={m} className="text-[9px] px-1.5 py-0.5 rounded bg-[#2A2A2A] text-[#8F8F8F] font-mono">{m}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#555] to-transparent min-w-[60px]" />
              </div>

              {/* Infrastructure */}
              <div className="md:col-span-1 flex flex-col gap-3">
                <div className="rounded-lg border border-[#2A2A2A] bg-[#1C1C1C] p-3 flex items-center gap-3">
                  <SiPostgresql className="text-blue-400 w-4 h-4 shrink-0" />
                  <div>
                    <p className="text-[12px] font-medium text-white">PostgreSQL</p>
                    <p className="text-[9px] text-[#555]">Users · Sessions · MFA</p>
                  </div>
                </div>
                <div className="rounded-lg border border-[#2A2A2A] bg-[#1C1C1C] p-3 flex items-center gap-3">
                  <SiRedis className="text-red-400 w-4 h-4 shrink-0" />
                  <div>
                    <p className="text-[12px] font-medium text-white">Redis</p>
                    <p className="text-[9px] text-[#555]">Rate Limits · OAuth Codes</p>
                  </div>
                </div>
                <div className="rounded-lg border border-[#2A2A2A] bg-[#1C1C1C] p-3 flex items-center gap-3">
                  <FiMail className="text-amber-400 w-4 h-4 shrink-0" />
                  <div>
                    <p className="text-[12px] font-medium text-white">BullMQ</p>
                    <p className="text-[9px] text-[#555]">Email Workers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security bar */}
            <div className="relative z-10 mt-8 pt-6 border-t border-[#2A2A2A]">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {[
                  { icon: FiLock, label: "Argon2 Hashing" },
                  { icon: FiShield, label: "AES-256-GCM Encryption" },
                  { icon: FiRefreshCw, label: "Token Rotation" },
                  { icon: FiAlertTriangle, label: "Reuse Detection" },
                  { icon: FiKey, label: "CSRF Protection" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <s.icon className="w-3.5 h-3.5 text-[#555]" />
                    <span className="text-[11px] text-[#555] font-medium">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          API ENDPOINTS — grid of all 14+
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[32px] sm:text-[40px] font-[400] tracking-[-0.02em] text-white leading-tight">
              14+ API endpoints,<br />ready to go
            </h2>
            <p className="mt-4 text-[16px] text-[#8F8F8F] max-w-xl mx-auto">
              Every endpoint is rate-limited, validated with Zod, and returns consistent error responses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {endpoints.map((e) => (
              <div
                key={e.path}
                className="flex items-center gap-3 rounded-lg border border-[#2A2A2A] bg-[#1C1C1C] px-4 py-3 hover:border-[#3ECF8E]/20 transition-colors group"
              >
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${
                  e.method === "GET"
                    ? "text-[#3ECF8E] bg-[#3ECF8E]/10"
                    : "text-blue-400 bg-blue-400/10"
                }`}>
                  {e.method}
                </span>
                <div className="min-w-0">
                  <p className="text-[12px] font-mono text-[#8F8F8F] group-hover:text-white transition-colors truncate">{e.path}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CODE SHOWCASE — quick start
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-[32px] sm:text-[40px] font-[400] tracking-[-0.02em] text-white leading-tight mb-6">
                Up and running<br />in under 5 minutes
              </h2>
              <p className="text-[16px] text-[#8F8F8F] leading-relaxed mb-8">
                Install the package, create your auth server, and you instantly get
                14&nbsp;production-ready API endpoints — including registration, login,
                OAuth, MFA, email verification, and session management.
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
                  <li key={item} className="flex items-center gap-3 text-[14px] text-[#AFAFAF]">
                    <FiCheckCircle className="w-4 h-4 text-[#3ECF8E] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-[#2A2A2A] bg-[#111] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2A2A2A] bg-[#161616]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#333]" />
                  <div className="w-3 h-3 rounded-full bg-[#333]" />
                  <div className="w-3 h-3 rounded-full bg-[#333]" />
                </div>
                <span className="text-[11px] text-[#555] ml-2 font-mono">index.ts</span>
              </div>
              <pre className="p-5 text-[13px] leading-[1.8] overflow-x-auto">
                <code className="text-[#AFAFAF]">
                  <span className="text-[#555]">{`// 1. Import\n`}</span>
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
                  <span className="text-[#555]">{`// 2. Create & Start\n`}</span>
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
                  <span className="text-[#555]">{`// ✓ 14 endpoints ready\n`}</span>
                  <span className="text-[#555]">{`// ✓ Email/password + OAuth + MFA\n`}</span>
                  <span className="text-[#555]">{`// ✓ JWT sessions + rate limiting`}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          STATS
          ═══════════════════════════════════════════════ */}
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
                <div className="text-[36px] font-[400] text-white">{stat.value}</div>
                <div className="text-[13px] text-[#555]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TECH STACK DETAILED — with real icons + colors
          ═══════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[32px] sm:text-[40px] font-[400] tracking-[-0.02em] text-white leading-tight">
              The technologies behind AuthHero
            </h2>
            <p className="mt-4 text-[16px] text-[#8F8F8F] max-w-xl mx-auto">
              Every tool chosen for reliability, performance, and developer experience.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-3 rounded-lg border border-[#2A2A2A] bg-[#1C1C1C] px-4 py-3.5 hover:border-[#444] transition-colors group"
              >
                <tech.icon
                  className="w-5 h-5 shrink-0 text-[#555] transition-colors duration-300"
                  style={{ ["--hover-color" as string]: tech.color }}
                />
                <span className="text-[13px] font-medium text-[#8F8F8F] group-hover:text-white transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BOTTOM CTA — Supabase style
          ═══════════════════════════════════════════════ */}
      <section className="relative border-t border-white/[0.06] py-24 sm:py-32">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <h2 className="text-[32px] sm:text-[40px] font-[400] tracking-[-0.02em] text-white leading-tight mb-4">
            Start building today
          </h2>
          <p className="text-[16px] text-[#8F8F8F] mb-10">
            Add production-grade authentication to your Express app in minutes, not weeks.
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
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-[4px] border border-[#2E2E2E] bg-[#1C1C1C] text-white px-5 py-[10px] text-[14px] font-medium hover:bg-[#2A2A2A] hover:border-[#444] transition-colors"
            >
              API Reference
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════ */}
      <footer className="border-t border-white/[0.06] py-12">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[13px] text-[#555]">
            © {new Date().getFullYear()} AuthHero. Open source under MIT License.
          </span>
          <div className="flex items-center gap-6">
            <a href="https://github.com/nandalalshukla/authhero" target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-white transition-colors text-[13px]">GitHub</a>
            <a href="https://www.npmjs.com/package/@nandalalshukla/auth-hero" target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-white transition-colors text-[13px]">npm</a>
            <Link href="/docs" className="text-[#555] hover:text-white transition-colors text-[13px]">Docs</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
