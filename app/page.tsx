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
  FiSmartphone,
  FiAlertTriangle,
  FiCpu,
  FiActivity,
  FiUser,
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
    tag: "Core",
  },
  {
    icon: FiGlobe,
    title: "OAuth 2.0",
    desc: "Google, GitHub, Facebook via Strategy Pattern. Extensible by design.",
    tag: "Social",
  },
  {
    icon: FiShield,
    title: "MFA / TOTP",
    desc: "One-time passwords with QR setup, backup codes, and challenge flow.",
    tag: "Security",
  },
  {
    icon: FiDatabase,
    title: "Session Management",
    desc: "JWT access tokens + rotating refresh tokens with reuse detection.",
    tag: "Auth",
  },
  {
    icon: FiZap,
    title: "Rate Limiting",
    desc: "Per-route Redis-backed limiters prevent brute-force and abuse.",
    tag: "Protection",
  },
  {
    icon: FiCode,
    title: "TypeScript Native",
    desc: "Strict mode. Full type safety from validation to response.",
    tag: "DX",
  },
];

const techStack = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Express 5", icon: SiExpress, color: "#888" },
  { name: "Prisma", icon: SiPrisma, color: "#5A67D8" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "JWT", icon: SiJsonwebtokens, color: "#F0B429" },
  { name: "Next.js", icon: SiNextdotjs, color: "#888" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
];

const securityLayers = [
  { label: "Argon2 Password Hashing", pct: 100 },
  { label: "AES-256-GCM (MFA secrets)", pct: 100 },
  { label: "JWT + Rotating Refresh Tokens", pct: 100 },
  { label: "CSRF State Protection (OAuth)", pct: 100 },
  { label: "Timing-Attack Safe Comparisons", pct: 100 },
  { label: "Token Reuse Detection", pct: 100 },
  { label: "Redis Rate Limiting (9 limiters)", pct: 100 },
];

/* ── Page ── */

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center px-6 pt-20 pb-0">

        {/* Ambient glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#3ECF8E]/[0.1] rounded-full blur-[120px]" />
        {/* Grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />
        {/* Matrix lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[6, 18, 33, 52, 70, 84, 94].map((left, i) => (
            <div key={i} className="matrix-line" style={{ left: `${left}%`, animationDelay: `${i * 1.2}s`, animationDuration: `${8 + i * 0.5}s` }} />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-[1020px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16 pt-4 pb-20">

          {/* Left — copy */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#3ECF8E]/20 bg-[#3ECF8E]/[0.06] px-3 py-1 text-[11px] font-medium text-[#3ECF8E] mb-6 tracking-wide uppercase">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#3ECF8E] animate-pulse" />
              Open Source · MIT License
            </div>

            <h1 className="font-display text-[46px] sm:text-[60px] font-[300] tracking-[-0.035em] leading-[1.05] text-white">
              Auth that ships
              <br />
              <span className="text-[#3ECF8E]">on day one.</span>
            </h1>

            <p className="mt-5 text-[15px] sm:text-[16px] text-[#777] max-w-[440px] mx-auto lg:mx-0 leading-[1.75] font-[300]">
              Drop-in authentication for Express&nbsp;apps. Email/password,
              OAuth&nbsp;2.0, MFA, rotating sessions, and Redis&nbsp;rate&nbsp;limiting —
              fully typed, zero&nbsp;config.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
              <Link
                href="/docs/getting-started"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-[4px] bg-[#3ECF8E] text-[#111] px-5 py-[10px] text-[13px] font-semibold hover:bg-[#4EEEA0] transition-colors"
              >
                Get started free
                <FiArrowRight size={13} />
              </Link>
              <a
                href="https://github.com/nandalalshukla/authhero"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-[4px] border border-[#2E2E2E] text-[#aaa] px-5 py-[10px] text-[13px] font-medium hover:border-[#444] hover:text-white hover:bg-white/[0.02] transition-colors"
              >
                <AiFillGithub size={15} />
                View source
              </a>
            </div>

            {/* Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2">
              {[
                "14 API endpoints",
                "3 OAuth providers",
                "100% TypeScript",
                "< 5 min setup",
              ].map((b) => (
                <span key={b} className="flex items-center gap-1.5 text-[11px] text-[#555]">
                  <FiCheckCircle className="text-[#3ECF8E] w-3 h-3" />
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right — terminal card */}
          <div className="w-full lg:w-[440px] shrink-0">
            <div className="rounded-xl border border-[#252525] bg-[#111]/90 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur">
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e1e1e]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <span className="text-[10px] text-[#444] font-mono">index.ts — AuthHero</span>
                <div className="w-12" />
              </div>

              {/* Code */}
              <pre className="p-5 text-[12.5px] leading-[1.85] overflow-x-auto font-mono">
                <code>
                  <span className="text-[#555]">{"// 1. Install\n"}</span>
                  <span className="text-[#3ECF8E]">{"$ "}</span>
                  <span className="text-[#ccc]">{"npm install @nandalalshukla/auth-hero\n\n"}</span>
                  <span className="text-[#555]">{"// 2. Start\n"}</span>
                  <span className="text-[#C586C0]">{"import "}</span>
                  <span className="text-[#9CDCFE]">{"{ createAuthHero }"}</span>
                  <span className="text-[#C586C0]">{" from "}</span>
                  <span className="text-[#CE9178]">{'"@nandalalshukla/auth-hero"'}</span>
                  <span className="text-[#ccc]">{";\n"}</span>
                  <span className="text-[#569CD6]">{"const "}</span>
                  <span className="text-[#9CDCFE]">{"auth"}</span>
                  <span className="text-[#ccc]">{" = "}</span>
                  <span className="text-[#569CD6]">{"await "}</span>
                  <span className="text-[#DCDCAA]">{"createAuthHero"}</span>
                  <span className="text-[#ccc]">{"();\n"}</span>
                  <span className="text-[#9CDCFE]">{"auth"}</span>
                  <span className="text-[#ccc]">{".app."}</span>
                  <span className="text-[#DCDCAA]">{"listen"}</span>
                  <span className="text-[#ccc]">{"("}</span>
                  <span className="text-[#B5CEA8]">{"3000"}</span>
                  <span className="text-[#ccc]">{");\n\n"}</span>
                  <span className="text-[#555]">{"// ✓ 14 endpoints ready\n"}</span>
                  <span className="text-[#555]">{"// ✓ Email  OAuth  MFA\n"}</span>
                  <span className="text-[#555]">{"// ✓ JWT sessions + rate limiting\n"}</span>
                  <span className="text-[#555]">{"// ✓ Zero config"}</span>
                </code>
              </pre>

              {/* Status bar */}
              <div className="border-t border-[#1a1a1a] px-4 py-2 flex items-center gap-3">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#3ECF8E] animate-pulse" />
                <span className="text-[10px] text-[#444] font-mono">Server running on :3000</span>
                <span className="ml-auto text-[10px] text-[#333] font-mono">TypeScript · Strict</span>
              </div>
            </div>

            {/* Floating stat chips */}
            <div className="flex justify-between mt-3 gap-2">
              {[
                { v: "14+", l: "Endpoints" },
                { v: "3", l: "Providers" },
                { v: "9", l: "Rate Limiters" },
                { v: "100%", l: "TypeScript" },
              ].map((s) => (
                <div key={s.l} className="flex-1 rounded-lg border border-[#222] bg-[#181818] py-2.5 flex flex-col items-center gap-0.5">
                  <span className="text-[18px] font-[300] text-white leading-none">{s.v}</span>
                  <span className="text-[9px] text-[#555] uppercase tracking-wider">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce-slow opacity-40">
          <div className="w-px h-8 bg-linear-to-b from-transparent via-[#444] to-transparent" />
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="border-y border-white/[0.08] bg-black/40 backdrop-blur-md z-10 relative">
        <div className="max-w-[960px] mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#3a3a3a]">Trusted primitives, battle-tested defaults</p>
          <div className="flex flex-wrap gap-2">
            {["Argon2", "AES-256-GCM", "CSRF Safe", "Rotating JWT", "Reuse Detection"].map((item) => (
              <span key={item} className="rounded-full border border-[#252525] bg-[#1C1C1C] px-3 py-1 text-[11px] text-[#555] font-mono">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES BENTO ── */}
      <section className="section-grid relative py-20 sm:py-24">
        <div className="relative z-10 max-w-[960px] mx-auto px-6">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#3ECF8E]/60 mb-2">What&apos;s included</p>
              <h2 className="font-display text-[30px] sm:text-[38px] font-[300] tracking-[-0.02em] text-white leading-tight">
                Every auth primitive you need
              </h2>
            </div>
            <Link href="/docs" className="inline-flex items-center gap-1.5 text-[12px] text-[#555] hover:text-[#3ECF8E] transition-colors shrink-0">
              Full docs <FiArrowRight size={11} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1e1e1e] rounded-xl overflow-hidden border border-[#1e1e1e]">
            {features.map((f, i) => (
              <div key={f.title} className={`group relative bg-[#161616] p-6 hover:bg-[#181818] transition-colors ${i === 0 ? "lg:col-span-1" : ""}`}>
                <div className="absolute top-4 right-4">
                  <span className="text-[9px] px-2 py-0.5 rounded-full border border-[#252525] text-[#444] font-mono tracking-wider">{f.tag}</span>
                </div>
                <f.icon className="w-5 h-5 text-[#333] group-hover:text-[#3ECF8E] transition-colors mb-4 mt-0.5" />
                <h3 className="text-[13px] font-semibold text-white mb-1.5">{f.title}</h3>
                <p className="text-[12px] text-[#555] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTH FLOW DIAGRAM ── */}
      <section className="section-grid relative py-20 sm:py-24">
        <div className="relative z-10 max-w-[960px] mx-auto px-6">
          <div className="mb-12 text-center">
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#3ECF8E]/60 mb-2">Auth flows</p>
            <h2 className="font-display text-[30px] sm:text-[38px] font-[300] tracking-[-0.02em] text-white leading-tight">
              Two paths, one secure session
            </h2>
            <p className="mt-3 text-[14px] text-[#555] max-w-lg mx-auto">
              Email/password and OAuth converge into the same JWT session pipeline with optional MFA at the gate.
            </p>
          </div>

          <div className="relative">
            {/* Top two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              {[
                {
                  icon: FiMail,
                  title: "Email / Password",
                  steps: [
                    { label: "Register", detail: "Argon2 hash · BullMQ email queue" },
                    { label: "Verify Email", detail: "SHA-256 token · 10 min TTL" },
                    { label: "Login", detail: "Timing-safe compare · session issued" },
                  ],
                },
                {
                  icon: FiGlobe,
                  title: "OAuth 2.0",
                  steps: [
                    { label: "Redirect to Provider", detail: "CSRF state cookie set" },
                    { label: "Callback + CSRF Check", detail: "State validated · code exchanged" },
                    { label: "One-Time Code → Tokens", detail: "Redis-stored · TTL 60s · single use" },
                  ],
                },
              ].map((path) => (
                <div key={path.title} className="rounded-xl border border-[#222] bg-[#161616] p-5">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-7 h-7 rounded-md bg-[#3ECF8E]/10 flex items-center justify-center">
                      <path.icon className="w-3.5 h-3.5 text-[#3ECF8E]" />
                    </div>
                    <span className="text-[13px] font-semibold text-white">{path.title}</span>
                  </div>
                  <div className="space-y-3">
                    {path.steps.map((s, idx) => (
                      <div key={s.label} className="flex gap-3 items-start">
                        <div className="flex flex-col items-center shrink-0 mt-1">
                          <div className="w-5 h-5 rounded-full border border-[#3ECF8E]/30 bg-[#3ECF8E]/5 flex items-center justify-center">
                            <span className="text-[9px] font-mono text-[#3ECF8E]/70">{idx + 1}</span>
                          </div>
                          {idx < path.steps.length - 1 && <div className="w-px flex-1 min-h-[14px] bg-[#222] mt-1" />}
                        </div>
                        <div className="pb-2">
                          <p className="text-[12px] font-medium text-[#ccc]">{s.label}</p>
                          <p className="text-[11px] text-[#444] mt-0.5 font-mono">{s.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Merge arrow */}
            <div className="flex justify-center items-center py-1 gap-2">
              <div className="h-px flex-1 max-w-[160px] bg-linear-to-r from-transparent to-[#2a2a2a]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#2a2a2a]" />
              <div className="h-px flex-1 max-w-[160px] bg-linear-to-l from-transparent to-[#2a2a2a]" />
            </div>

            {/* Bottom converged steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { icon: FiSmartphone, label: "MFA Challenge", badge: "Optional", detail: "TOTP code or backup code verified" },
                { icon: FiKey, label: "Session Created", badge: "Core", detail: "JWT 15 min + httpOnly refresh 30 days" },
                { icon: FiShield, label: "Protected Access", badge: "Core", detail: "Token rotate on every refresh · reuse revokes all sessions" },
              ].map((step) => (
                <div key={step.label} className={`rounded-xl border p-5 flex gap-3.5 items-start ${step.label === "Protected Access" ? "border-[#3ECF8E]/20 bg-[#3ECF8E]/[0.03]" : "border-[#222] bg-[#161616]"}`}>
                  <div className="w-8 h-8 rounded-lg bg-[#3ECF8E]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <step.icon className="w-3.5 h-3.5 text-[#3ECF8E]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[13px] font-semibold text-white">{step.label}</p>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${step.badge === "Optional" ? "border border-[#2a2a2a] text-[#444]" : "border border-[#3ECF8E]/20 text-[#3ECF8E]/60"}`}>{step.badge}</span>
                    </div>
                    <p className="text-[11px] text-[#444] leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECURITY SCORE ── */}
      <section className="section-grid relative py-20 sm:py-24 border-y border-[#1e1e1e]">
        <div className="relative z-10 max-w-[960px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#3ECF8E]/60 mb-2">Security posture</p>
              <h2 className="font-display text-[30px] sm:text-[36px] font-[300] tracking-[-0.02em] text-white leading-tight mb-4">
                Every layer secured
                <br />
                by default
              </h2>
              <p className="text-[14px] text-[#555] leading-relaxed">
                AuthHero applies defense-in-depth. From hashing to CSRF protection, every surface is hardened before your first request.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { icon: FiCpu, label: "OWASP Aligned" },
                  { icon: FiActivity, label: "Timing-Safe" },
                  { icon: FiRefreshCw, label: "Token Rotation" },
                  { icon: FiAlertTriangle, label: "Reuse Detection" },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-2.5 rounded-lg border border-[#1e1e1e] bg-[#161616] px-3 py-2.5">
                    <b.icon className="w-3.5 h-3.5 text-[#3ECF8E]/60 shrink-0" />
                    <span className="text-[11px] text-[#777]">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security bar chart */}
            <div className="rounded-xl border border-[#1e1e1e] bg-[#141414] p-6 space-y-4">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[12px] font-semibold text-white">Security Coverage</span>
                <span className="text-[11px] font-mono text-[#3ECF8E]">100%</span>
              </div>
              {securityLayers.map((layer, i) => (
                <div key={layer.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[11px] text-[#666]">{layer.label}</span>
                    <span className="text-[10px] font-mono text-[#3ECF8E]/60">✓</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#1e1e1e] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-[#3ECF8E]/70 to-[#3ECF8E]"
                      style={{ width: `${layer.pct}%`, animationDelay: `${i * 0.1}s` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE ── */}
      <section className="section-grid relative py-20 sm:py-24">
        <div className="relative z-10 max-w-[960px] mx-auto px-6">
          <div className="mb-12 text-center">
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#3ECF8E]/60 mb-2">Architecture</p>
            <h2 className="font-display text-[30px] sm:text-[38px] font-[300] tracking-[-0.02em] text-white leading-tight">
              Built for performance
            </h2>
            <p className="mt-3 text-[14px] text-[#555] max-w-md mx-auto">
              Express 5 + PostgreSQL + Redis + BullMQ — each layer purpose-built.
            </p>
          </div>

          <div className="relative rounded-xl border border-[#1e1e1e] bg-[#141414] p-6 md:p-10 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.025]" />

            {/* Layer diagram */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
              {/* Client */}
              <div className="rounded-xl border border-[#222] bg-[#1C1C1C] p-4 text-center w-full md:w-[130px]">
                <FiUser className="w-4 h-4 text-blue-400/60 mx-auto mb-2.5" />
                <p className="text-[12px] font-semibold text-white">Client App</p>
                <p className="text-[9px] text-[#444] font-mono mt-1">React / Next.js</p>
              </div>

              <div className="hidden md:flex flex-col items-center gap-0.5 flex-1 px-3">
                <span className="text-[8px] text-[#333] font-mono uppercase tracking-wider">HTTPS + JWT</span>
                <div className="flex items-center w-full gap-1">
                  <div className="flex-1 h-px bg-[#252525]" />
                  <FiArrowRight className="text-[#333] w-3 h-3 shrink-0" />
                </div>
              </div>

              {/* AuthHero */}
              <div className="rounded-xl border border-[#3ECF8E]/25 bg-[#0e1e16] p-5 text-center w-full md:w-[160px] shadow-[0_0_40px_rgba(62,207,142,0.07)]">
                <FiShield className="w-5 h-5 text-[#3ECF8E] mx-auto mb-2.5" />
                <p className="text-[13px] font-bold text-white">AuthHero</p>
                <p className="text-[9px] text-[#3ECF8E]/40 font-mono mt-1 mb-3">Express 5 + TypeScript</p>
                <div className="flex flex-wrap justify-center gap-1">
                  {["Helmet", "CORS", "Zod", "JWT", "Argon2"].map((m) => (
                    <span key={m} className="text-[8px] px-1.5 py-0.5 rounded bg-[#3ECF8E]/5 border border-[#3ECF8E]/15 text-[#3ECF8E]/60 font-mono">{m}</span>
                  ))}
                </div>
              </div>

              <div className="hidden md:flex flex-col items-center gap-0.5 flex-1 px-3">
                <span className="text-[8px] text-[#333] font-mono uppercase tracking-wider">Prisma ORM</span>
                <div className="flex items-center w-full gap-1">
                  <div className="flex-1 h-px bg-[#252525]" />
                  <FiArrowRight className="text-[#333] w-3 h-3 shrink-0" />
                </div>
              </div>

              {/* Data stores */}
              <div className="flex flex-col gap-2 w-full md:w-[140px]">
                {[
                  { icon: SiPostgresql, color: "text-blue-400/60", name: "PostgreSQL", sub: "Users / Sessions" },
                  { icon: SiRedis, color: "text-red-400/60", name: "Redis", sub: "Rate Limits / OAuth" },
                  { icon: FiMail, color: "text-amber-400/60", name: "BullMQ", sub: "Email Workers" },
                ].map((db) => (
                  <div key={db.name} className="rounded-lg border border-[#1e1e1e] bg-[#1C1C1C] p-3 flex items-center gap-2.5">
                    <db.icon className={`${db.color} w-3.5 h-3.5 shrink-0`} />
                    <div>
                      <p className="text-[11px] font-semibold text-white">{db.name}</p>
                      <p className="text-[9px] text-[#444]">{db.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security bar */}
            <div className="relative z-10 mt-8 pt-6 border-t border-[#1e1e1e] flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {[
                { icon: FiLock, label: "Argon2 Hashing" },
                { icon: FiShield, label: "AES-256-GCM" },
                { icon: FiRefreshCw, label: "Token Rotation" },
                { icon: FiAlertTriangle, label: "Reuse Detection" },
                { icon: FiKey, label: "CSRF Protection" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <s.icon className="w-2.5 h-2.5 text-[#3a3a3a]" />
                  <span className="text-[10px] text-[#3a3a3a] font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="section-grid relative py-20 sm:py-24 border-t border-[#1e1e1e]">
        <div className="relative z-10 max-w-[960px] mx-auto px-6">
          <div className="mb-10 text-center">
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#3ECF8E]/60 mb-2">Stack</p>
            <h2 className="font-display text-[30px] sm:text-[38px] font-[300] tracking-[-0.02em] text-white leading-tight">
              Built with the best tools
            </h2>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="group flex flex-col items-center gap-2.5 rounded-lg border border-[#1e1e1e] bg-[#161616] p-4 hover:border-[#2a2a2a] hover:bg-[#181818] transition-all"
              >
                <tech.icon className="w-6 h-6 text-[#444] group-hover:text-[#888] transition-colors duration-300" style={{ color: undefined }} />
                <span className="text-[10px] text-[#444] group-hover:text-[#777] transition-colors duration-300 text-center leading-tight">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CODE + CHECKLIST ── */}
      <section className="section-grid relative py-20 sm:py-24">
        <div className="relative z-10 max-w-[960px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-[#3ECF8E]/60 mb-2">Quick start</p>
              <h2 className="font-display text-[30px] sm:text-[38px] font-[300] tracking-[-0.02em] text-white leading-tight mb-4">
                Up and running
                <br />
                in under 5 minutes
              </h2>
              <p className="text-[14px] text-[#555] leading-relaxed mb-7">
                One package, one function call, and you have 14 production-ready
                auth endpoints with security defaults you&apos;d otherwise spend weeks implementing.
              </p>
              <ul className="space-y-2.5">
                {[
                  "14 secure API endpoints out of the box",
                  "JWT access + rotating refresh tokens",
                  "OAuth 2.0 — Google, GitHub, Facebook",
                  "TOTP MFA with QR codes & backup codes",
                  "Redis-backed rate limiting on every route",
                  "BullMQ async email queue",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[13px] text-[#777]">
                    <FiCheckCircle className="w-3.5 h-3.5 text-[#3ECF8E] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex gap-3">
                <Link
                  href="/docs/getting-started"
                  className="inline-flex items-center gap-2 rounded-[4px] bg-[#3ECF8E] text-[#111] px-4 py-2 text-[13px] font-semibold hover:bg-[#4EEEA0] transition-colors"
                >
                  Read the docs
                  <FiArrowRight size={12} />
                </Link>
                <Link
                  href="/docs/api-reference"
                  className="inline-flex items-center gap-2 rounded-[4px] border border-[#252525] text-[#888] px-4 py-2 text-[13px] font-medium hover:border-[#333] hover:text-white transition-colors"
                >
                  API Reference
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-[#222] bg-[#111] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a1a]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <span className="text-[10px] text-[#444] ml-2 font-mono">index.ts</span>
              </div>
              <pre className="p-5 text-[12.5px] leading-[1.9] overflow-x-auto">
                <code>
                  <span className="text-[#555]">{"// Standalone server\n"}</span>
                  <span className="text-[#C586C0]">{"import "}</span>
                  <span className="text-[#9CDCFE]">{"{ createAuthHero }"}</span>
                  <span className="text-[#C586C0]">{" from "}</span>
                  <span className="text-[#CE9178]">{'"@nandalalshukla/auth-hero"'}</span>
                  <span className="text-[#ccc]">{";\n\n"}</span>
                  <span className="text-[#569CD6]">{"const "}</span>
                  <span className="text-[#9CDCFE]">{"auth"}</span>
                  <span className="text-[#ccc]">{" = "}</span>
                  <span className="text-[#569CD6]">{"await "}</span>
                  <span className="text-[#DCDCAA]">{"createAuthHero"}</span>
                  <span className="text-[#ccc]">{"();\n"}</span>
                  <span className="text-[#9CDCFE]">{"auth"}</span>
                  <span className="text-[#ccc]">{".app."}</span>
                  <span className="text-[#DCDCAA]">{"listen"}</span>
                  <span className="text-[#ccc]">{"("}</span>
                  <span className="text-[#B5CEA8]">{"3000"}</span>
                  <span className="text-[#ccc]">{", () => \n  "}</span>
                  <span className="text-[#9CDCFE]">{"console"}</span>
                  <span className="text-[#ccc]">{"."}</span>
                  <span className="text-[#DCDCAA]">{"log"}</span>
                  <span className="text-[#ccc]">{"("}</span>
                  <span className="text-[#CE9178]">{'"AuthHero running"'}</span>
                  <span className="text-[#ccc]">{")\n\n"}</span>
                  <span className="text-[#555]">{"// Or mount on existing Express app:\n"}</span>
                  <span className="text-[#9CDCFE]">{"app"}</span>
                  <span className="text-[#ccc]">{"."}</span>
                  <span className="text-[#DCDCAA]">{"use"}</span>
                  <span className="text-[#ccc]">{"("}</span>
                  <span className="text-[#CE9178]">{`"/auth"`}</span>
                  <span className="text-[#ccc]">{", "}</span>
                  <span className="text-[#9CDCFE]">{"auth"}</span>
                  <span className="text-[#ccc]">{".router);"}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-[#3ECF8E]/3 to-transparent" />
        <div className="pointer-events-none absolute inset-0 hero-grid opacity-20" />
        <div className="relative z-10 max-w-[600px] mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3ECF8E]/20 bg-[#3ECF8E]/[0.06] px-3 py-1 text-[11px] font-medium text-[#3ECF8E] mb-6 tracking-wide uppercase">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#3ECF8E] animate-pulse" />
            Ready to ship
          </div>
          <h2 className="font-display text-[32px] sm:text-[44px] font-[300] tracking-[-0.03em] text-white leading-tight mb-4">
            Add auth in minutes,
            <br />
            <span className="text-[#3ECF8E]">not months.</span>
          </h2>
          <p className="text-[14px] text-[#555] mb-10 max-w-md mx-auto">
            Open source, self-hosted, zero vendor lock-in. One npm install away.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/docs/getting-started"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-[4px] bg-[#3ECF8E] text-[#111] px-6 py-[11px] text-[13px] font-semibold hover:bg-[#4EEEA0] transition-colors"
            >
              Start building for free
              <FiArrowRight size={13} />
            </Link>
            <a
              href="https://github.com/nandalalshukla/authhero"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-[4px] border border-[#252525] text-[#888] px-6 py-[11px] text-[13px] font-medium hover:border-[#3a3a3a] hover:text-white transition-colors"
            >
              <AiFillGithub size={14} />
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#1a1a1a] py-10">
        <div className="max-w-[960px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FiShield className="w-4 h-4 text-[#3ECF8E]/60" />
            <span className="text-[12px] text-[#3a3a3a]">AuthHero &copy; {new Date().getFullYear()} &middot; MIT License</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/nandalalshukla/authhero" target="_blank" rel="noopener noreferrer" className="text-[#3a3a3a] hover:text-white transition-colors text-[12px]">GitHub</a>
            <a href="https://www.npmjs.com/package/@nandalalshukla/auth-hero" target="_blank" rel="noopener noreferrer" className="text-[#3a3a3a] hover:text-white transition-colors text-[12px]">npm</a>
            <Link href="/docs" className="text-[#3a3a3a] hover:text-white transition-colors text-[12px]">Docs</Link>
            <Link href="/docs/api-reference" className="text-[#3a3a3a] hover:text-white transition-colors text-[12px]">API</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
