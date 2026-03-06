import React from "react";
import Link from "next/link";
import CodeBlock from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/DocsComponents";
import {
  FiKey,
  FiGlobe,
  FiShield,
  FiRefreshCw,
  FiZap,
  FiBox,
  FiArrowRight,
} from "react-icons/fi";

export const metadata = {
  title: "AuthHero Documentation",
  description:
    "Complete, secure, production-ready authentication for Express apps.",
};

const features = [
  {
    icon: FiKey,
    title: "Email / Password",
    desc: "Register, login, email verification, password reset & change — all production-ready.",
  },
  {
    icon: FiGlobe,
    title: "OAuth 2.0",
    desc: "Google, GitHub, Facebook with the Strategy Pattern. Add more providers in minutes.",
  },
  {
    icon: FiShield,
    title: "MFA (TOTP)",
    desc: "Time-based one-time passwords with QR codes, backup codes, and challenge flow.",
  },
  {
    icon: FiRefreshCw,
    title: "Session Management",
    desc: "JWT access tokens + rotating refresh tokens with reuse detection.",
  },
  {
    icon: FiZap,
    title: "Rate Limiting",
    desc: "Per-route Redis-backed rate limiters prevent brute-force attacks.",
  },
  {
    icon: FiBox,
    title: "Two Usage Modes",
    desc: "Standalone server or mount on your existing Express app as a library.",
  },
];

export default function DocsPage() {
  return (
    <>
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#3ECF8E]/20 bg-[#3ECF8E]/[0.07] px-3 py-1 text-[12px] font-medium text-[#3ECF8E] mb-4">
          <span className="flex h-1.5 w-1.5 rounded-full bg-[#3ECF8E] animate-pulse" />
          Documentation
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          AuthHero Documentation
        </h1>
        <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
          Drop-in authentication for Express apps. Email/password, OAuth, MFA —
          all production-ready, fully typed, and secured out of the box.
        </p>
      </div>

      {/* Quick install */}
      <CodeBlock language="bash" filename="Terminal">
        {`npm install @nandalalshukla/auth-hero express`}
      </CodeBlock>

      <CodeBlock language="typescript" filename="index.ts">
        {`import "dotenv/config";
import { createAuthHero } from "@nandalalshukla/auth-hero";

const auth = await createAuthHero();
auth.app.listen(3000);`}
      </CodeBlock>

      <p className="text-zinc-600 dark:text-zinc-400">
        That&apos;s it. You now have register, login, email verification,
        password reset, OAuth (Google/GitHub/Facebook), MFA (TOTP), session
        management, and rate limiting — all running on port 3000.
      </p>

      {/* Feature grid */}
      <h2 className="mt-12 mb-6 text-2xl font-bold text-white">Features</h2>
      <div className="grid gap-4 sm:grid-cols-2 not-prose">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:border-[#3ECF8E]/20 hover:bg-[#3ECF8E]/[0.03] group"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#3ECF8E]/10 border border-[#3ECF8E]/20 mb-3">
                <Icon className="w-4 h-4 text-[#3ECF8E]" />
              </div>
              <h3 className="mb-1 font-semibold text-white text-sm">
                {f.title}
              </h3>
              <p className="text-[13px] text-zinc-400 leading-relaxed">
                {f.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick links */}
      <h2 className="mt-12 mb-6 text-2xl font-bold text-white">Quick Links</h2>
      <div className="grid gap-3 sm:grid-cols-2 not-prose">
        {[
          {
            href: "/docs/getting-started",
            title: "Quick Start",
            desc: "Get AuthHero running in under 5 minutes",
          },
          {
            href: "/docs/api-reference",
            title: "API Reference",
            desc: "Every endpoint with request/response examples",
          },
          {
            href: "/docs/architecture",
            title: "Architecture",
            desc: "Project structure and design patterns",
          },
          {
            href: "/docs/configuration",
            title: "Configuration",
            desc: "Every environment variable explained",
          },
          {
            href: "/docs/oauth",
            title: "OAuth Setup",
            desc: "Configure Google, GitHub, Facebook",
          },
          {
            href: "/docs/mfa",
            title: "MFA Guide",
            desc: "TOTP setup, challenge flow, backup codes",
          },
          {
            href: "/docs/security",
            title: "Security",
            desc: "Every security measure explained in detail",
          },
          {
            href: "/docs/deployment",
            title: "Deployment",
            desc: "Production checklist and Docker setup",
          },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-[#3ECF8E]/20 hover:bg-[#3ECF8E]/[0.03] no-underline"
          >
            <div>
              <h3 className="font-semibold text-white text-sm group-hover:text-[#3ECF8E] transition-colors">
                {link.title}
              </h3>
              <p className="mt-1 text-[13px] text-zinc-400">{link.desc}</p>
            </div>
            <FiArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#3ECF8E] transition-all group-hover:translate-x-0.5 shrink-0 ml-4" />
          </Link>
        ))}
      </div>

      {/* Tech stack */}
      <h2 className="mt-12 mb-6 text-2xl font-bold text-white">Tech Stack</h2>
      <div className="overflow-x-auto rounded-xl border border-white/[0.06] not-prose">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/[0.06] bg-white/[0.02]">
            <tr>
              <th className="px-4 py-3 font-semibold text-zinc-300 text-xs uppercase tracking-wider">
                Technology
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-300 text-xs uppercase tracking-wider">
                Layer
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-300 text-xs uppercase tracking-wider">
                Purpose
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {[
              ["Node.js ≥ 18", "Runtime", "Server runtime"],
              ["Express 5", "Framework", "HTTP framework"],
              ["TypeScript", "Language", "Strict mode type safety"],
              ["PostgreSQL + Prisma 7", "Database", "Primary data store"],
              [
                "Redis + BullMQ",
                "Cache / Queue",
                "Rate limiting, jobs, OAuth codes",
              ],
              ["JWT + Argon2", "Auth", "Tokens + password hashing"],
              ["otplib + QRCode", "MFA", "TOTP one-time passwords"],
              ["AES-256-GCM", "Encryption", "TOTP secret encryption at rest"],
              ["Zod 4", "Validation", "Request body validation"],
              ["Nodemailer", "Email", "Transactional email delivery"],
              ["Pino", "Logging", "Structured JSON logging"],
              ["Helmet", "Security", "HTTP security headers"],
            ].map(([tech, layer, purpose]) => (
              <tr
                key={tech}
                className="hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-4 py-3 font-medium text-[#3ECF8E] text-[13px]">
                  {tech}
                </td>
                <td className="px-4 py-3 text-zinc-400 text-[13px]">{layer}</td>
                <td className="px-4 py-3 text-zinc-400 text-[13px]">
                  {purpose}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="tip" title="CLI Scaffolder">
        <p>
          Want to start even faster? Run{" "}
          <code className="rounded-md bg-[#3ECF8E]/10 px-1.5 py-0.5 text-xs font-medium text-[#3ECF8E] border border-[#3ECF8E]/20">
            npx create-authhero my-app
          </code>{" "}
          to scaffold a complete project with auto-generated secrets.
        </p>
      </Callout>
    </>
  );
}
