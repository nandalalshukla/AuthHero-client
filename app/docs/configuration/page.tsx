import React from "react";
import CodeBlock from "@/components/docs/CodeBlock";
import { Heading, Callout, Table } from "@/components/docs/DocsComponents";

export const metadata = {
  title: "Configuration — AuthHero Docs",
};

export default function ConfigurationPage() {
  return (
    <>
      <Heading id="configuration" level={1}>
        Configuration
      </Heading>
      <p>
        AuthHero uses environment variables for all configuration. Every
        variable is validated at startup using Zod — if anything is missing or
        invalid, the server will fail fast with a clear error message.
      </p>

      <hr />

      <Heading id="env-file" level={2}>
        The .env File
      </Heading>
      <p>Copy the example file and fill in your values:</p>
      <CodeBlock language="bash" filename="Terminal">
        {`cp .env.example .env`}
      </CodeBlock>

      <hr />

      <Heading id="required-vars" level={2}>
        Required Variables
      </Heading>
      <p>These must be set for AuthHero to start:</p>

      <Heading id="server" level={3}>
        Server
      </Heading>
      <Table
        headers={["Variable", "Default", "Description"]}
        rows={[
          ["PORT", "5000", "Server port"],
          ["NODE_ENV", "development", "development | production | test"],
        ]}
      />

      <Heading id="database" level={3}>
        Database
      </Heading>
      <Table
        headers={["Variable", "Default", "Description"]}
        rows={[
          [
            "DATABASE_URL",
            "—",
            "PostgreSQL connection string. Format: postgresql://USER:PASS@HOST:PORT/DB",
          ],
        ]}
      />
      <CodeBlock language="bash" filename=".env">
        {`DATABASE_URL=postgresql://postgres:password@localhost:5432/authhero`}
      </CodeBlock>

      <Heading id="redis" level={3}>
        Redis
      </Heading>
      <Table
        headers={["Variable", "Default", "Description"]}
        rows={[
          ["REDIS_HOST", "localhost", "Redis server hostname"],
          ["REDIS_PORT", "6379", "Redis server port"],
        ]}
      />

      <Heading id="jwt-secrets" level={3}>
        JWT Secrets
      </Heading>
      <Table
        headers={["Variable", "Min Length", "Description"]}
        rows={[
          [
            "ACCESS_TOKEN_SECRET",
            "10 chars",
            "Signs access tokens (15-minute JWTs)",
          ],
          [
            "REFRESH_TOKEN_SECRET",
            "10 chars",
            "Not used for JWT signing — used for session validation context",
          ],
        ]}
      />
      <p>Generate each with:</p>
      <CodeBlock language="bash" filename="Terminal">
        {`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`}
      </CodeBlock>
      <Callout type="danger" title="Keep secrets secret">
        <p>
          Never commit your <code>.env</code> file to version control. Add it to{" "}
          <code>.gitignore</code>. In production, use your hosting
          provider&apos;s secrets manager.
        </p>
      </Callout>

      <Heading id="mfa-secrets" level={3}>
        MFA Secrets
      </Heading>
      <Table
        headers={["Variable", "Format", "Description"]}
        rows={[
          [
            "MFA_ENCRYPTION_KEY",
            "64-char hex (32 bytes)",
            "AES-256-GCM key for encrypting TOTP secrets at rest",
          ],
          [
            "MFA_TEMP_TOKEN_SECRET",
            "Min 10 chars",
            "Signs the short-lived JWT issued after login when MFA is enabled",
          ],
        ]}
      />
      <p>
        The <code>MFA_ENCRYPTION_KEY</code> must be exactly 64 hex characters
        (32 bytes). Generate with:
      </p>
      <CodeBlock language="bash" filename="Terminal">
        {`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`}
      </CodeBlock>

      <Callout type="danger" title="Encryption key is irreplaceable">
        <p>
          If you lose the <code>MFA_ENCRYPTION_KEY</code>, all existing MFA TOTP
          secrets become unrecoverable. Users will need to re-setup MFA. Back up
          this key securely.
        </p>
      </Callout>

      <Heading id="email" level={3}>
        Email (SMTP)
      </Heading>
      <Table
        headers={["Variable", "Default", "Description"]}
        rows={[
          ["EMAIL_HOST", "smtp.gmail.com", "SMTP server hostname"],
          ["EMAIL_PORT", "465", "SMTP server port (465 = TLS, 587 = STARTTLS)"],
          ["EMAIL_USER", "—", "SMTP username / sender email address"],
          ["EMAIL_PASS", "—", "SMTP password or app-specific password"],
        ]}
      />

      <Heading id="urls" level={3}>
        URLs
      </Heading>
      <Table
        headers={["Variable", "Default", "Description"]}
        rows={[
          [
            "APP_URL",
            "http://localhost:5000",
            "Backend URL — used in OAuth redirect URIs",
          ],
          [
            "FRONTEND_URL",
            "—",
            "Frontend URL — used for CORS, email verification links, and password reset links",
          ],
        ]}
      />
      <Callout type="info" title="FRONTEND_URL is optional">
        <p>
          If not set, <code>APP_URL</code> is used as the fallback for email
          links and CORS. Set it when your frontend runs on a different domain
          or port.
        </p>
      </Callout>

      <hr />

      <Heading id="oauth-vars" level={2}>
        OAuth Variables (Optional)
      </Heading>
      <p>
        Only configure the providers you want to use. Unconfigured providers
        will return a clear error if someone tries to use them.
      </p>

      <Heading id="google-oauth" level={3}>
        Google
      </Heading>
      <Table
        headers={["Variable", "Description"]}
        rows={[
          ["GOOGLE_CLIENT_ID", "OAuth client ID from Google Cloud Console"],
          ["GOOGLE_CLIENT_SECRET", "OAuth client secret"],
          [
            "GOOGLE_REDIRECT_URI",
            "Callback URL (e.g. http://localhost:5000/auth/oauth/callback/google)",
          ],
        ]}
      />

      <Heading id="github-oauth" level={3}>
        GitHub
      </Heading>
      <Table
        headers={["Variable", "Description"]}
        rows={[
          [
            "GITHUB_CLIENT_ID",
            "OAuth App client ID from GitHub Developer Settings",
          ],
          ["GITHUB_CLIENT_SECRET", "OAuth App client secret"],
          [
            "GITHUB_REDIRECT_URI",
            "Callback URL (e.g. http://localhost:5000/auth/oauth/callback/github)",
          ],
        ]}
      />

      <Heading id="facebook-oauth" level={3}>
        Facebook
      </Heading>
      <Table
        headers={["Variable", "Description"]}
        rows={[
          ["FACEBOOK_CLIENT_ID", "App ID from Facebook Developers portal"],
          ["FACEBOOK_CLIENT_SECRET", "App secret"],
          [
            "FACEBOOK_REDIRECT_URI",
            "Callback URL (e.g. http://localhost:5000/auth/oauth/callback/facebook)",
          ],
        ]}
      />

      <hr />

      <Heading id="env-validation" level={2}>
        How Validation Works
      </Heading>
      <p>
        At startup, all environment variables are validated using a Zod schema
        in <code>src/config/env.ts</code>. If any required variable is missing
        or malformed, the server crashes immediately with a descriptive error:
      </p>
      <CodeBlock language="typescript" filename="src/config/env.ts">
        {`const envSchema = z.object({
  PORT: z.string().default("5000"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string().min(10),
  REFRESH_TOKEN_SECRET: z.string().min(10),
  MFA_ENCRYPTION_KEY: z.string().length(64, "Must be a 64-char hex string"),
  MFA_TEMP_TOKEN_SECRET: z.string().min(10),
  // ...
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const fields = parsedEnv.error.flatten().fieldErrors;
  const missing = Object.entries(fields)
    .map(([key, msgs]) => \`  \${key}: \${msgs?.join(", ")}\`)
    .join("\\n");
  throw new Error(\`AuthHero — invalid environment variables:\\n\${missing}\`);
}`}
      </CodeBlock>
      <p>
        This fail-fast approach means you&apos;ll never get a confusing runtime
        error because of a missing config — you&apos;ll see exactly what needs
        to be fixed immediately.
      </p>

      <hr />

      <Heading id="full-env-example" level={2}>
        Full .env.example
      </Heading>
      <CodeBlock language="bash" filename=".env.example">
        {`# ─── Server ──────────────────────────────────────────────
PORT=5000
NODE_ENV=development

# ─── Database (PostgreSQL) ────────────────────────────────
DATABASE_URL=postgresql://user:password@localhost:5432/authhero

# ─── Redis ────────────────────────────────────────────────
REDIS_HOST=localhost
REDIS_PORT=6379

# ─── JWT Secrets ──────────────────────────────────────────
# Generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

# ─── MFA ──────────────────────────────────────────────────
# 64-char hex string (32 bytes) for AES-256-GCM encryption
MFA_ENCRYPTION_KEY=
MFA_TEMP_TOKEN_SECRET=

# ─── Email (SMTP) ────────────────────────────────────────
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# ─── Frontend URLs ───────────────────────────────────────
APP_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000

# ─── OAuth Providers (optional) ──────────────────────────
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/oauth/callback/google

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_REDIRECT_URI=http://localhost:5000/auth/oauth/callback/github

FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
FACEBOOK_REDIRECT_URI=http://localhost:5000/auth/oauth/callback/facebook`}
      </CodeBlock>

      <hr />

      <Heading id="constants" level={2}>
        Built-in Constants
      </Heading>
      <p>
        Token lengths, expiry durations, and other magic numbers are centralized
        in <code>src/config/constants.ts</code>. These are not configurable via
        environment variables — change them in source code if needed:
      </p>

      <Table
        headers={["Constant", "Value", "Description"]}
        rows={[
          [
            "TOKEN_LENGTH.VERIFICATION",
            "36 bytes (72 hex chars)",
            "Email verification & password reset tokens",
          ],
          ["TOKEN_LENGTH.REFRESH", "40 bytes (80 hex chars)", "Refresh tokens"],
          [
            "TOKEN_LENGTH.OAUTH_CODE",
            "32 bytes (64 hex chars)",
            "OAuth one-time codes",
          ],
          [
            "TOKEN_LENGTH.OAUTH_STATE",
            "32 bytes (64 hex chars)",
            "CSRF state for OAuth",
          ],
          [
            "TOKEN_EXPIRY.ACCESS_TOKEN",
            "15 minutes",
            "JWT access token lifetime",
          ],
          [
            "TOKEN_EXPIRY.REFRESH_TOKEN_DAYS",
            "30 days",
            "Refresh token cookie max-age",
          ],
          [
            "TOKEN_EXPIRY.EMAIL_VERIFICATION_MINUTES",
            "10 minutes",
            "Verification link lifetime",
          ],
          [
            "TOKEN_EXPIRY.PASSWORD_RESET_MINUTES",
            "15 minutes",
            "Password reset link lifetime",
          ],
          ["TOKEN_EXPIRY.MFA_TEMP_TOKEN", "5 minutes", "MFA challenge window"],
          [
            "TOKEN_EXPIRY.OAUTH_CODE_TTL_SECONDS",
            "120 seconds",
            "OAuth code Redis TTL",
          ],
          ["MFA.BACKUP_CODE_COUNT", "8", "Number of backup codes generated"],
        ]}
      />
    </>
  );
}
