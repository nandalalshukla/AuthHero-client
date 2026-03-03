import React from "react";
import Link from "next/link";
import CodeBlock from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/DocsComponents";

export const metadata = {
  title: "AuthHero Documentation",
  description:
    "Complete, secure, production-ready authentication for Express apps.",
};

const features = [
  {
    icon: "🔑",
    title: "Email / Password",
    desc: "Register, login, email verification, password reset & change — all production-ready.",
  },
  {
    icon: "🌐",
    title: "OAuth 2.0",
    desc: "Google, GitHub, Facebook with the Strategy Pattern. Add more providers in minutes.",
  },
  {
    icon: "🛡️",
    title: "MFA (TOTP)",
    desc: "Time-based one-time passwords with QR codes, backup codes, and challenge flow.",
  },
  {
    icon: "🔄",
    title: "Session Management",
    desc: "JWT access tokens + rotating refresh tokens with reuse detection.",
  },
  {
    icon: "⚡",
    title: "Rate Limiting",
    desc: "Per-route Redis-backed rate limiters prevent brute-force attacks.",
  },
  {
    icon: "🏗️",
    title: "Two Usage Modes",
    desc: "Standalone server or mount on your existing Express app as a library.",
  },
];

export default function DocsPage() {
  return (
    <>
      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
          AuthHero Documentation
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
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
      <h2 className="mt-12 mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
        Features
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-lg border border-zinc-200 p-5 transition-colors hover:border-blue-300 hover:bg-blue-50/50 dark:border-zinc-800 dark:hover:border-blue-700 dark:hover:bg-blue-950/20"
          >
            <div className="mb-2 text-2xl">{f.icon}</div>
            <h3 className="mb-1 font-semibold text-zinc-900 dark:text-white">
              {f.title}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <h2 className="mt-12 mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
        Quick Links
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          {
            href: "/docs/getting-started",
            title: "Quick Start →",
            desc: "Get AuthHero running in under 5 minutes",
          },
          {
            href: "/docs/api-reference",
            title: "API Reference →",
            desc: "Every endpoint with request/response examples",
          },
          {
            href: "/docs/architecture",
            title: "Architecture →",
            desc: "Project structure and design patterns",
          },
          {
            href: "/docs/configuration",
            title: "Configuration →",
            desc: "Every environment variable explained",
          },
          {
            href: "/docs/oauth",
            title: "OAuth Setup →",
            desc: "Configure Google, GitHub, Facebook",
          },
          {
            href: "/docs/mfa",
            title: "MFA Guide →",
            desc: "TOTP setup, challenge flow, backup codes",
          },
          {
            href: "/docs/security",
            title: "Security →",
            desc: "Every security measure explained in detail",
          },
          {
            href: "/docs/deployment",
            title: "Deployment →",
            desc: "Production checklist and Docker setup",
          },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-lg border border-zinc-200 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50/50 dark:border-zinc-800 dark:hover:border-blue-700 dark:hover:bg-blue-950/20 no-underline"
          >
            <h3 className="font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
              {link.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {link.desc}
            </p>
          </Link>
        ))}
      </div>

      {/* Tech stack */}
      <h2 className="mt-12 mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
        Tech Stack
      </h2>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
            <tr>
              <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">
                Layer
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">
                Technology
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">
                Purpose
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {[
              ["Node.js ≥ 18", "Runtime", "Server runtime"],
              ["Express 5", "Framework", "HTTP framework"],
              ["TypeScript", "Language", "Strict mode type safety"],
              ["PostgreSQL + Prisma 7", "Database", "Primary data store"],
              ["Redis + BullMQ", "Cache / Queue", "Rate limiting, jobs, OAuth codes"],
              ["JWT + Argon2", "Auth", "Tokens + password hashing"],
              ["otplib + QRCode", "MFA", "TOTP one-time passwords"],
              ["AES-256-GCM", "Encryption", "TOTP secret encryption at rest"],
              ["Zod 4", "Validation", "Request body validation"],
              ["Nodemailer", "Email", "Transactional email delivery"],
              ["Pino", "Logging", "Structured JSON logging"],
              ["Helmet", "Security", "HTTP security headers"],
            ].map(([tech, layer, purpose]) => (
              <tr key={tech} className="bg-white dark:bg-zinc-950">
                <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                  {tech}
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  {layer}
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
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
          <code className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200">
            npx create-authhero my-app
          </code>{" "}
          to scaffold a complete project with auto-generated secrets.
        </p>
      </Callout>
    </>
  );
}
