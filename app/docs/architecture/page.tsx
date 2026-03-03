import React from "react";
import CodeBlock from "@/components/docs/CodeBlock";
import { Heading, Callout } from "@/components/docs/DocsComponents";

export const metadata = {
  title: "Architecture — AuthHero Docs",
};

export default function ArchitecturePage() {
  return (
    <>
      <Heading id="architecture" level={1}>
        Architecture Overview
      </Heading>
      <p>
        AuthHero follows a modular, layered architecture designed for
        maintainability and extensibility. This page explains the project
        structure, design patterns, and data flow.
      </p>

      <hr />

      <Heading id="project-structure" level={2}>
        Project Structure
      </Heading>
      <CodeBlock language="text" filename="Directory Layout">
        {`src/
├── index.ts                  # Library entry point (public API surface)
├── createAuthHero.ts         # Factory function — initializes everything
├── server.ts                 # Standalone server with graceful shutdown
├── app.ts                    # Express app setup (middleware + routes)
│
├── config/                   # ⚙️ Configuration layer
│   ├── env.ts                # Zod-validated environment variables
│   ├── jwt.ts                # JWT generation & verification
│   ├── constants.ts          # Token lengths, expiry durations
│   ├── cookies.ts            # Cookie options (httpOnly, secure)
│   ├── cors.ts               # CORS with origin whitelist
│   ├── http.ts               # HTTP status code constants
│   ├── prisma.ts             # PrismaClient initialization
│   ├── redis.ts              # Redis client + BullMQ connection
│   └── email.ts              # Nodemailer transporter
│
├── lib/                      # 📚 Shared libraries
│   ├── AppError.ts           # Custom error class + error codes
│   ├── asyncHandler.ts       # Express async error wrapper
│   ├── logger.ts             # Pino structured logger
│   ├── session.ts            # Centralized session creation
│   └── queues/
│       └── email.queue.ts    # BullMQ email queue
│
├── middlewares/               # 🛡️ Express middlewares
│   ├── auth.middleware.ts     # JWT authentication
│   ├── mfa.middleware.ts      # MFA enforcement
│   ├── error.middleware.ts    # Global error handler
│   ├── validate.middleware.ts # Zod validation factory
│   └── rateLimiter.middleware.ts
│
├── modules/                   # 📦 Feature modules
│   └── auth/
│       ├── auth.service.ts    # Core auth business logic
│       ├── auth.controller.ts # Express route handlers
│       ├── auth.routes.ts     # Route definitions
│       ├── auth.validation.ts # Zod request schemas
│       ├── auth.types.ts      # TypeScript interfaces
│       ├── mfa/               # MFA sub-module
│       │   ├── mfa.crypto.ts
│       │   ├── mfa.service.ts
│       │   ├── mfa.controller.ts
│       │   ├── mfa.routes.ts
│       │   └── mfa.validation.ts
│       └── oauth/             # OAuth sub-module
│           ├── oauth.service.ts
│           ├── oauth.controller.ts
│           ├── oauth.routes.ts
│           ├── oauth.types.ts
│           └── providers/
│               ├── google.provider.ts
│               ├── github.provider.ts
│               └── facebook.provider.ts
│
├── utils/                     # 🔧 Utility functions
│   ├── hash.ts               # Argon2 password hashing
│   ├── email.ts              # Email sending with HTML template
│   ├── rateLimiter.ts        # Redis-backed rate limiter factory
│   └── requireAuth.ts        # TypeScript assertion helper
│
└── workers/
    └── email.worker.ts        # BullMQ email worker`}
      </CodeBlock>

      <hr />

      <Heading id="layered-architecture" level={2}>
        Layered Architecture
      </Heading>
      <p>
        Every feature module follows a consistent 5-layer pattern. This
        separation ensures each layer has a single responsibility:
      </p>

      <div className="my-6 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
        <div className="bg-zinc-50 px-5 py-4 dark:bg-zinc-900">
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Request Flow: Client → Route → Controller → Service → Database
          </p>
        </div>
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {[
            {
              layer: "Routes",
              file: "auth.routes.ts",
              desc: "Define HTTP methods, paths, and middleware chain (rate limiter → validation → auth → handler).",
            },
            {
              layer: "Validation",
              file: "auth.validation.ts",
              desc: "Zod schemas validate request bodies before they reach the controller. Invalid data never touches business logic.",
            },
            {
              layer: "Controller",
              file: "auth.controller.ts",
              desc: "Extract data from req, call the service, format the response. No business logic here.",
            },
            {
              layer: "Service",
              file: "auth.service.ts",
              desc: "All business logic lives here — database queries, token generation, email sending, error handling.",
            },
            {
              layer: "Types",
              file: "auth.types.ts",
              desc: "TypeScript interfaces for request payloads, response shapes, and Express type augmentation.",
            },
          ].map((item) => (
            <div
              key={item.layer}
              className="flex gap-4 bg-white px-5 py-4 dark:bg-zinc-950"
            >
              <div className="w-28 shrink-0">
                <span className="rounded bg-blue-100 px-2 py-1 text-xs font-bold text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {item.layer}
                </span>
              </div>
              <div>
                <code className="text-xs text-zinc-500">{item.file}</code>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr />

      <Heading id="design-patterns" level={2}>
        Design Patterns
      </Heading>

      <Heading id="factory-pattern" level={3}>
        Factory Pattern — <code>createAuthHero()</code>
      </Heading>
      <p>
        The main entry point is a factory function that initializes all
        dependencies (database, Redis, email worker) through dynamic imports and
        returns a clean public API:
      </p>
      <CodeBlock language="typescript" filename="createAuthHero.ts">
        {`export async function createAuthHero(): Promise<AuthHero> {
  // Dynamic imports — nothing runs until you call this function.
  const { default: app } = await import("./app");
  const { prisma } = await import("./config/prisma");
  const { redisClient } = await import("./config/redis");
  const { emailWorker } = await import("./workers/email.worker");
  const { authenticate } = await import("./middlewares/auth.middleware");
  const { requireMFA } = await import("./middlewares/mfa.middleware");
  // ...

  return {
    app,                    // Full Express app
    routes: { auth, oauth, mfa },  // Individual routers
    authenticate,           // JWT middleware
    requireMFA,             // MFA enforcement middleware
    errorMiddleware,        // Global error handler
    prisma,                 // Database client
    shutdown,               // Graceful cleanup
  };
}`}
      </CodeBlock>
      <p>
        <strong>Why dynamic imports?</strong> Nothing executes until you call{" "}
        <code>createAuthHero()</code>. This means environment validation,
        database connections, and Redis connections are lazy — they only happen
        when explicitly triggered.
      </p>

      <Heading id="strategy-pattern" level={3}>
        Strategy Pattern — OAuth Providers
      </Heading>
      <p>
        Each OAuth provider implements the same <code>OAuthProvider</code>{" "}
        interface. The service doesn&apos;t know provider-specific details — it
        calls <code>getProfile(code)</code> and gets a standardized user
        profile:
      </p>
      <CodeBlock language="typescript" filename="oauth.types.ts">
        {`interface OAuthProvider {
  getProfile(code: string): Promise<OAuthUserProfile>;
}

interface OAuthUserProfile {
  providerUserId: string;
  email: string;
  fullname: string;
  provider: string;
}`}
      </CodeBlock>
      <CodeBlock language="typescript" filename="oauth.service.ts">
        {`class OAuthService {
  private static providers: Record<string, OAuthProvider> = {
    google: new GoogleProvider(),
    github: new GitHubProvider(),
    facebook: new FacebookProvider(),
  };

  static async handleCallback(providerName: string, code: string) {
    const strategy = this.providers[providerName];
    const profile = await strategy.getProfile(code);
    // ... sync with database
  }
}`}
      </CodeBlock>
      <p>
        <strong>Adding a new provider</strong> is just three steps:
      </p>
      <ol>
        <li>
          Create a new class implementing <code>OAuthProvider</code>
        </li>
        <li>
          Register it in the <code>providers</code> map
        </li>
        <li>
          Add the provider&apos;s env vars to <code>env.ts</code>
        </li>
      </ol>

      <Heading id="centralized-session" level={3}>
        Single Source of Truth — Session Creation
      </Heading>
      <p>
        Sessions are created in exactly one place: <code>lib/session.ts</code>.
        This function is used by:
      </p>
      <ul>
        <li>Email/password login</li>
        <li>MFA challenge completion</li>
        <li>OAuth callback</li>
      </ul>
      <CodeBlock language="typescript" filename="lib/session.ts">
        {`export async function createSession(
  userId: string,
  userAgent?: string,
  ipAddress?: string,
): Promise<SessionTokens> {
  const refreshToken = generateRandomToken(TOKEN_LENGTH.REFRESH);
  const refreshTokenHash = hashRandomToken(refreshToken);
  const expiresAt = addDays(new Date(), TOKEN_EXPIRY.REFRESH_TOKEN_DAYS);

  const session = await prisma.session.create({
    data: { userId, refreshTokenHash, expiresAt, userAgent, ipAddress },
  });

  const accessToken = generateAccessToken(userId, session.id);
  return { accessToken, refreshToken };
}`}
      </CodeBlock>
      <p>
        Centralizing this prevents drift between flows and ensures every session
        gets the same security properties.
      </p>

      <hr />

      <Heading id="dual-mode" level={2}>
        Dual-Mode Architecture
      </Heading>
      <p>AuthHero can be used in two fundamentally different ways:</p>

      <Heading id="standalone-mode" level={3}>
        Mode 1: Standalone Server
      </Heading>
      <p>
        Use the built-in Express app with everything pre-configured — Helmet,
        CORS, cookie parsing, rate limiting, all auth routes, and a global error
        handler:
      </p>
      <CodeBlock language="typescript" filename="Standalone">
        {`import "dotenv/config";
import { createAuthHero } from "@nandalalshukla/auth-hero";

const auth = await createAuthHero();
auth.app.listen(3000);`}
      </CodeBlock>

      <Heading id="library-mode" level={3}>
        Mode 2: Library (Mount on Your App)
      </Heading>
      <p>Already have an Express app? Mount only the route modules you need:</p>
      <CodeBlock language="typescript" filename="Library Mode">
        {`import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { createAuthHero } from "@nandalalshukla/auth-hero";

const app = express();
app.use(express.json());
app.use(cookieParser());

const auth = await createAuthHero();

// Mount auth routes
app.use("/auth", auth.routes.auth);
app.use("/auth/oauth", auth.routes.oauth);
app.use("/auth/mfa", auth.routes.mfa);

// Your own routes
app.get("/dashboard", auth.authenticate, (req, res) => {
  res.json({ userId: req.user!.userId });
});

// Error handler MUST be last
app.use(auth.errorMiddleware);

app.listen(3000);`}
      </CodeBlock>

      <hr />

      <Heading id="middleware-pipeline" level={2}>
        Middleware Pipeline
      </Heading>
      <p>
        Every request flows through a carefully ordered middleware chain. The
        order matters:
      </p>

      <CodeBlock language="text" filename="Global Middleware Order">
        {`1. trust proxy 1     → Real client IP behind reverse proxy
2. helmet()          → Security headers (CSP, HSTS, X-Content-Type-Options)
3. express.json()    → Parse JSON bodies (16kb limit)
4. cookieParser()    → Parse cookies (refresh token, OAuth state)
5. cors()            → CORS with strict origin whitelist
6. Routes            → Auth, OAuth, MFA route handlers
7. errorMiddleware   → Catches all errors, returns structured JSON`}
      </CodeBlock>

      <p>
        <strong>Per-route middleware</strong> is applied in the route
        definitions:
      </p>
      <CodeBlock language="text" filename="Route Middleware Chain">
        {`POST /auth/login
  → loginRateLimiter      (5 requests/minute per IP+email)
  → validate(loginSchema) (Zod body validation)
  → asyncHandler(loginController)

POST /auth/mfa/challenge
  → mfaChallengeRateLimiter (5 requests/minute)
  → validate(challengeMFASchema)
  → asyncHandler(challengeMFA)

GET /auth/me
  → authenticate          (JWT verification + session DB check)
  → asyncHandler(meController)`}
      </CodeBlock>

      <hr />

      <Heading id="async-email" level={2}>
        Async Email Architecture
      </Heading>
      <p>
        Email sending is decoupled from the HTTP request-response cycle using
        BullMQ (Redis-backed job queue):
      </p>

      <CodeBlock language="text" filename="Email Flow">
        {`HTTP Request
  → Controller adds job to emailQueue (BullMQ)
  → Returns response immediately (fast)

Email Worker (separate process)
  → Picks up job from queue
  → Sends email via Nodemailer/SMTP
  → Retries on failure (BullMQ built-in)`}
      </CodeBlock>

      <p>
        <strong>Benefits:</strong>
      </p>
      <ul>
        <li>API responses are fast regardless of SMTP server speed</li>
        <li>
          Consistent response times prevent timing-based email enumeration
        </li>
        <li>Failed emails are automatically retried</li>
        <li>Email worker can be scaled independently</li>
      </ul>

      <Callout type="info" title="Three email job types">
        <p>
          The worker handles <code>sendVerificationEmail</code>,{" "}
          <code>resendVerificationEmail</code>, and{" "}
          <code>sendPasswordResetEmail</code>. Each uses the same HTML email
          template wrapper for consistent branding.
        </p>
      </Callout>

      <hr />

      <Heading id="token-architecture" level={2}>
        Token Architecture
      </Heading>

      <div className="my-6 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
            <tr>
              <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">
                Token
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">
                Type
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">
                Lifetime
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">
                Storage
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {[
              [
                "Access Token",
                "JWT (signed)",
                "15 minutes",
                "Client memory / Authorization header",
              ],
              [
                "Refresh Token",
                "Random (80 hex chars)",
                "30 days",
                "HTTP-only secure cookie + DB (SHA-256 hash)",
              ],
              [
                "Email Verification",
                "Random (72 hex chars)",
                "10 minutes",
                "DB (SHA-256 hash)",
              ],
              [
                "Password Reset",
                "Random (72 hex chars)",
                "15 minutes",
                "DB (SHA-256 hash)",
              ],
              [
                "MFA Temp Token",
                "JWT (signed)",
                "5 minutes",
                "Client (returned from login)",
              ],
              [
                "OAuth One-Time Code",
                "Random (64 hex chars)",
                "120 seconds",
                "Redis (auto-expires)",
              ],
            ].map(([token, type, lifetime, storage]) => (
              <tr key={token} className="bg-white dark:bg-zinc-950">
                <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                  {token}
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  {type}
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  {lifetime}
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  {storage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="warning" title="Refresh Token Rotation">
        <p>
          Every time a refresh token is used, a new one is issued and the old
          one becomes invalid. If a revoked token is reused (indicating theft),{" "}
          <strong>all sessions for that user are immediately revoked</strong>.
        </p>
      </Callout>
    </>
  );
}
