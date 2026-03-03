import React from "react";
import CodeBlock from "@/components/docs/CodeBlock";
import { Heading, Callout, Table } from "@/components/docs/DocsComponents";

export const metadata = {
  title: "Security — AuthHero Docs",
};

export default function SecurityPage() {
  return (
    <>
      <Heading id="security" level={1}>
        Security
      </Heading>
      <p>
        AuthHero is built with security as a first-class concern. This page
        documents every security measure, the rationale behind each decision,
        and how they protect against common attack vectors.
      </p>

      <hr />

      {/* ============ PASSWORD HASHING ============ */}
      <Heading id="password-hashing" level={2}>
        Password Hashing — Argon2
      </Heading>
      <p>
        Passwords are hashed using <strong>Argon2id</strong>, the winner of the
        Password Hashing Competition and the current OWASP recommendation.
        Argon2id combines Argon2i (side-channel resistant) and Argon2d
        (GPU-resistant) for the best overall security.
      </p>
      <Table
        headers={["Setting", "Value", "Purpose"]}
        rows={[
          [
            "Algorithm",
            "Argon2id",
            "Balanced resistance against side-channel and GPU attacks",
          ],
          ["Used for", "Passwords + MFA backup codes", "All user secrets"],
          [
            "Verification",
            "Constant-time comparison",
            "Prevents timing attacks",
          ],
        ]}
      />
      <Callout type="info" title="Why not bcrypt?">
        <p>
          Argon2 is memory-hard (configurable memory cost), making it
          significantly more expensive to brute-force with GPUs/ASICs compared
          to bcrypt, which is only CPU-bound.
        </p>
      </Callout>

      <hr />

      {/* ============ TOKEN SECURITY ============ */}
      <Heading id="token-security" level={2}>
        Token Security
      </Heading>

      <Heading id="token-storage" level={3}>
        Never Store Secrets in Plaintext
      </Heading>
      <Table
        headers={["Secret", "Storage Method", "Why"]}
        rows={[
          ["Passwords", "Argon2 hash", "One-way — cannot be reversed"],
          ["Refresh tokens", "SHA-256 hash", "Fast lookup with index; one-way"],
          [
            "Verification tokens",
            "SHA-256 hash",
            "Same pattern as refresh tokens",
          ],
          ["Password reset tokens", "SHA-256 hash", "Same pattern"],
          [
            "MFA TOTP secrets",
            "AES-256-GCM encryption",
            "Must be decryptable for verification",
          ],
          [
            "MFA backup codes",
            "Argon2 hash",
            "One-way — same security as passwords",
          ],
        ]}
      />

      <Heading id="token-generation" level={3}>
        Cryptographically Random Tokens
      </Heading>
      <p>
        All tokens are generated using <code>crypto.randomBytes()</code> from
        Node.js&apos;s built-in crypto module, which uses the OS entropy pool
        (CSPRNG).
      </p>
      <Table
        headers={["Token", "Length", "Entropy"]}
        rows={[
          ["Refresh token", "40 bytes (80 hex chars)", "320 bits"],
          ["Verification token", "36 bytes (72 hex chars)", "288 bits"],
          ["Password reset token", "36 bytes (72 hex chars)", "288 bits"],
          ["OAuth one-time code", "32 bytes (64 hex chars)", "256 bits"],
          ["OAuth state (CSRF)", "32 bytes (64 hex chars)", "256 bits"],
          [
            "MFA backup code",
            "4 bytes (8 hex chars)",
            "32 bits (but argon2-hashed + rate-limited)",
          ],
        ]}
      />

      <hr />

      {/* ============ MFA ENCRYPTION ============ */}
      <Heading id="mfa-encryption" level={2}>
        MFA Secret Encryption — AES-256-GCM
      </Heading>
      <p>
        TOTP secrets must be decrypted at runtime to verify codes, so they
        can&apos;t use one-way hashing. AuthHero encrypts them with AES-256-GCM:
      </p>
      <Table
        headers={["Property", "Value"]}
        rows={[
          ["Algorithm", "AES-256-GCM (authenticated encryption)"],
          ["Key", "MFA_ENCRYPTION_KEY (64-char hex = 32 bytes)"],
          ["IV", "12 random bytes (generated per encryption)"],
          ["Output format", "iv:authTag:ciphertext (all hex)"],
          ["Integrity", "GCM auth tag detects tampering"],
        ]}
      />
      <Callout type="warning" title="Key management is critical">
        <p>
          If the <code>MFA_ENCRYPTION_KEY</code> is compromised, all TOTP
          secrets can be decrypted. If the key is lost, existing TOTP secrets
          become unrecoverable. Store this key in a secrets manager in
          production.
        </p>
      </Callout>

      <hr />

      {/* ============ CSRF ============ */}
      <Heading id="csrf" level={2}>
        CSRF Protection
      </Heading>
      <p>AuthHero protects against CSRF through multiple mechanisms:</p>
      <ul>
        <li>
          <strong>SameSite=strict cookies</strong> — Refresh token cookies are
          never sent in cross-origin requests
        </li>
        <li>
          <strong>Access token in memory</strong> — The access token is stored
          in JavaScript memory (Zustand), not in cookies, so it can&apos;t be
          leaked via CSRF
        </li>
        <li>
          <strong>OAuth state parameter</strong> — Random state is stored in an
          httpOnly cookie and compared with the callback query parameter
        </li>
      </ul>

      <hr />

      {/* ============ XSS PROTECTION ============ */}
      <Heading id="xss" level={2}>
        XSS Protection
      </Heading>
      <ul>
        <li>
          <strong>httpOnly cookies</strong> — Refresh tokens are in httpOnly
          cookies, invisible to JavaScript (immune to XSS)
        </li>
        <li>
          <strong>Helmet middleware</strong> — Sets security headers including
          Content-Security-Policy, X-Content-Type-Options, X-Frame-Options
        </li>
        <li>
          <strong>No tokens in URLs</strong> — OAuth tokens are stored in Redis
          behind one-time codes, never exposed in redirect URLs
        </li>
      </ul>

      <hr />

      {/* ============ RATE LIMITING ============ */}
      <Heading id="rate-limiting" level={2}>
        Rate Limiting
      </Heading>
      <p>
        All authentication endpoints are rate-limited using Redis-backed rate
        limiters (<code>express-rate-limit</code> +{" "}
        <code>rate-limit-redis</code>):
      </p>
      <Table
        headers={["Endpoint", "Limit", "Window"]}
        rows={[
          ["Register", "5 requests", "10 minutes"],
          ["Login", "10 requests", "15 minutes"],
          ["Verify email", "5 requests", "10 minutes"],
          ["Forgot password", "3 requests", "15 minutes"],
          ["Reset password", "5 requests", "15 minutes"],
          ["Refresh token", "10 requests", "15 minutes"],
          ["Change password", "3 requests", "15 minutes"],
          ["MFA challenge", "5 requests", "5 minutes"],
        ]}
      />
      <p>
        Rate limiters are per-IP in development and can be customized per-user
        in production. The Redis backing enables rate limiting across multiple
        server instances.
      </p>

      <hr />

      {/* ============ CORS ============ */}
      <Heading id="cors" level={2}>
        CORS Policy
      </Heading>
      <p>CORS is configured with a strict origin whitelist:</p>
      <CodeBlock language="typescript" filename="src/config/cors.ts">
        {`const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [env.FRONTEND_URL, env.APP_URL]
      .filter(Boolean);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};`}
      </CodeBlock>
      <p>
        Only <code>FRONTEND_URL</code> and <code>APP_URL</code> origins are
        allowed. All other origins are rejected. <code>credentials: true</code>{" "}
        is required for cookies.
      </p>

      <hr />

      {/* ============ HELMET ============ */}
      <Heading id="helmet" level={2}>
        Security Headers (Helmet)
      </Heading>
      <p>
        Helmet sets a comprehensive suite of security headers on every response:
      </p>
      <Table
        headers={["Header", "Value", "Protection"]}
        rows={[
          [
            "Content-Security-Policy",
            "default-src 'self'",
            "Prevents XSS, code injection",
          ],
          ["X-Content-Type-Options", "nosniff", "Prevents MIME-type sniffing"],
          ["X-Frame-Options", "DENY", "Prevents clickjacking"],
          ["X-XSS-Protection", "0", "Disabled (CSP is preferred over this)"],
          [
            "Strict-Transport-Security",
            "max-age=15552000; includeSubDomains",
            "Forces HTTPS",
          ],
          [
            "Referrer-Policy",
            "no-referrer",
            "Prevents token leakage via Referer",
          ],
        ]}
      />

      <hr />

      {/* ============ EMAIL ENUMERATION ============ */}
      <Heading id="email-enumeration" level={2}>
        Email Enumeration Prevention
      </Heading>
      <p>
        The forgot-password endpoint always returns the same response regardless
        of whether the email exists:
      </p>
      <CodeBlock language="json">
        {`{
  "success": true,
  "message": "If an account exists, a reset link has been sent."
}`}
      </CodeBlock>
      <p>
        This prevents attackers from probing which emails are registered. The
        registration endpoint does return <code>EMAIL_ALREADY_EXISTS</code>{" "}
        since this is typically necessary for user experience (telling the user
        to log in instead).
      </p>

      <hr />

      {/* ============ TIMING ATTACKS ============ */}
      <Heading id="timing-attacks" level={2}>
        Timing Attack Prevention
      </Heading>
      <p>
        When a login attempt fails, AuthHero still runs a dummy argon2 hash
        operation even if the user doesn&apos;t exist:
      </p>
      <CodeBlock language="typescript">
        {`// If user not found, still hash to prevent timing-based email enumeration
if (!user) {
  await hashPassword("dummy-password");
  throw new AppError(401, "Invalid credentials", AppErrorCode.InvalidCredentials);
}`}
      </CodeBlock>
      <p>
        This ensures the response time is the same whether the email exists or
        not, preventing timing-based enumeration.
      </p>

      <hr />

      {/* ============ SECURITY CHECKLIST ============ */}
      <Heading id="security-checklist" level={2}>
        Production Security Checklist
      </Heading>
      <Table
        headers={["Item", "Status"]}
        rows={[
          ["Passwords hashed with Argon2id", "✅ Built-in"],
          ["Tokens stored as hashes (never plaintext)", "✅ Built-in"],
          ["MFA secrets encrypted with AES-256-GCM", "✅ Built-in"],
          ["Refresh token rotation with reuse detection", "✅ Built-in"],
          ["Rate limiting on all auth endpoints", "✅ Built-in"],
          ["CORS with strict origin whitelist", "✅ Built-in"],
          ["Helmet security headers", "✅ Built-in"],
          ["httpOnly, secure, SameSite=strict cookies", "✅ Built-in"],
          ["CSRF state for OAuth", "✅ Built-in"],
          ["Email enumeration prevention", "✅ Built-in"],
          ["Timing attack prevention", "✅ Built-in"],
          ["No tokens in URLs (OAuth one-time code pattern)", "✅ Built-in"],
          ["TLS/HTTPS in production", "⚠️ Configure via reverse proxy"],
          [
            "Secrets in environment variables / secrets manager",
            "⚠️ Your responsibility",
          ],
          ["Regular dependency audits (npm audit)", "⚠️ Your responsibility"],
        ]}
      />
    </>
  );
}
