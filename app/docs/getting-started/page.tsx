import React from "react";
import CodeBlock from "@/components/docs/CodeBlock";
import {
  Heading,
  Step,
  Callout,
  Table,
} from "@/components/docs/DocsComponents";

export const metadata = {
  title: "Getting Started — AuthHero Docs",
};

export default function GettingStartedPage() {
  return (
    <>
      <Heading id="getting-started" level={1}>
        Getting Started
      </Heading>
      <p>
        Get AuthHero running in under 5 minutes. This guide covers three
        installation methods, database setup, Redis, email configuration, and
        your first API request.
      </p>

      <hr />

      {/* Prerequisites */}
      <Heading id="prerequisites" level={2}>
        Prerequisites
      </Heading>
      <Table
        headers={["Requirement", "Version", "Check Command"]}
        rows={[
          ["Node.js", ">= 18.0.0", "node --version"],
          ["PostgreSQL", "Any recent version", "psql --version"],
          ["Redis", "Any recent version", "redis-cli ping"],
          ["npm or bun", "Latest", "npm --version"],
        ]}
      />

      <hr />

      {/* Option 1: CLI */}
      <Heading id="cli-scaffolder" level={2}>
        Option 1: CLI Scaffolder (Recommended)
      </Heading>
      <p>
        The fastest way to get started. Creates a complete project with
        auto-generated secrets.
      </p>
      <CodeBlock language="bash" filename="Terminal">
        {`npx create-authhero my-auth-server
cd my-auth-server`}
      </CodeBlock>

      <Heading id="cli-what-it-does" level={3}>
        What the CLI does
      </Heading>
      <ul>
        <li>
          <strong>Clones</strong> the AuthHero template into your project
          directory
        </li>
        <li>
          <strong>Generates</strong> cryptographic secrets automatically (JWT
          keys, MFA encryption key)
        </li>
        <li>
          <strong>Creates</strong> a <code>.env</code> file from{" "}
          <code>.env.example</code> with secrets pre-filled
        </li>
        <li>
          <strong>Installs</strong> all npm dependencies
        </li>
        <li>
          <strong>Initializes</strong> a fresh git repository
        </li>
      </ul>

      <Heading id="after-scaffolding" level={3}>
        After scaffolding
      </Heading>
      <CodeBlock language="bash" filename="Terminal">
        {`# 1. Edit .env — set your DATABASE_URL, EMAIL_USER, EMAIL_PASS
#    (secrets are already generated for you)

# 2. Run database migrations
npx prisma migrate dev --name init

# 3. Start the server
npm run dev

# 4. In a separate terminal, start the email worker
npm run worker`}
      </CodeBlock>

      <hr />

      {/* Option 2: npm */}
      <Heading id="npm-package" level={2}>
        Option 2: npm Package
      </Heading>

      <Step number={1} title="Install">
        <CodeBlock language="bash" filename="Terminal">
          {`npm install @nandalalshukla/auth-hero express`}
        </CodeBlock>
      </Step>

      <Step number={2} title="Copy the Prisma schema">
        <p>
          AuthHero ships its Prisma schema inside the package. Copy it to your
          project:
        </p>
        <CodeBlock language="bash" filename="Terminal">
          {`mkdir -p prisma
cp node_modules/@nandalalshukla/auth-hero/prisma/schema.prisma prisma/schema.prisma`}
        </CodeBlock>
      </Step>

      <Step number={3} title="Create your .env file">
        <CodeBlock language="bash" filename="Terminal">
          {`cp node_modules/@nandalalshukla/auth-hero/.env.example .env`}
        </CodeBlock>
      </Step>

      <Step number={4} title="Generate secrets">
        <p>
          Each secret should be a 64-character hex string. Run this command once
          for each secret:
        </p>
        <CodeBlock language="bash" filename="Terminal">
          {`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`}
        </CodeBlock>
        <p>
          Fill in <code>ACCESS_TOKEN_SECRET</code>,{" "}
          <code>REFRESH_TOKEN_SECRET</code>, <code>MFA_ENCRYPTION_KEY</code>,
          and <code>MFA_TEMP_TOKEN_SECRET</code> in your <code>.env</code>.
        </p>
      </Step>

      <Step number={5} title="Run migrations">
        <CodeBlock language="bash" filename="Terminal">
          {`npx prisma migrate dev --name init`}
        </CodeBlock>
      </Step>

      <Step number={6} title="Create your entry file">
        <CodeBlock language="typescript" filename="src/index.ts">
          {`import "dotenv/config";
import { createAuthHero } from "@nandalalshukla/auth-hero";

async function main() {
  const auth = await createAuthHero();

  auth.app.listen(3000, () => {
    console.log("🔐 AuthHero running on http://localhost:3000");
  });

  // Graceful shutdown
  process.on("SIGTERM", async () => {
    await auth.shutdown();
    process.exit(0);
  });
}

main();`}
        </CodeBlock>
      </Step>

      <Step number={7} title="Run">
        <CodeBlock language="bash" filename="Terminal">
          {`npx tsx src/index.ts`}
        </CodeBlock>
      </Step>

      <hr />

      {/* Option 3: Clone */}
      <Heading id="clone-repo" level={2}>
        Option 3: Clone the Repository
      </Heading>
      <p>For full source code access and customization.</p>
      <CodeBlock language="bash" filename="Terminal">
        {`git clone https://github.com/nandalalshukla/authhero.git my-auth-server
cd my-auth-server
npm install
cp .env.example .env
# Fill in your .env values
npx prisma migrate dev --name init
npm run dev        # Start the server (with hot reload)
npm run worker     # Start the email worker (separate terminal)`}
      </CodeBlock>

      <hr />

      {/* Database Setup */}
      <Heading id="database-setup" level={2}>
        Database Setup
      </Heading>
      <p>AuthHero uses PostgreSQL. You need a running PostgreSQL instance.</p>

      <Heading id="local-postgres" level={3}>
        Local PostgreSQL
      </Heading>
      <CodeBlock language="bash" filename="Terminal">
        {`# macOS (Homebrew)
brew install postgresql@16
brew services start postgresql@16

# Ubuntu/Debian
sudo apt install postgresql
sudo systemctl start postgresql

# Windows / Docker
docker run -d --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 postgres:16`}
      </CodeBlock>

      <Heading id="create-database" level={3}>
        Create the database
      </Heading>
      <CodeBlock language="sql" filename="psql">
        {`CREATE DATABASE authhero;`}
      </CodeBlock>

      <Heading id="connection-string" level={3}>
        Connection string
      </Heading>
      <p>
        Set in your <code>.env</code>:
      </p>
      <CodeBlock language="bash" filename=".env">
        {`DATABASE_URL=postgresql://postgres:password@localhost:5432/authhero`}
      </CodeBlock>
      <p>
        <strong>Format:</strong>{" "}
        <code>postgresql://USER:PASSWORD@HOST:PORT/DATABASE</code>
      </p>

      <Heading id="run-migrations" level={3}>
        Run migrations
      </Heading>
      <CodeBlock language="bash" filename="Terminal">
        {`npx prisma migrate dev --name init`}
      </CodeBlock>
      <p>
        This creates all the required tables: <code>User</code>,{" "}
        <code>Session</code>, <code>EmailVerification</code>,{" "}
        <code>PasswordReset</code>, <code>OAuthAccount</code>,{" "}
        <code>MFASecret</code>.
      </p>

      <Callout type="tip" title="Prisma Studio">
        <p>
          Run <code>npx prisma studio</code> to open a visual database browser
          at <code>http://localhost:5555</code>.
        </p>
      </Callout>

      <hr />

      {/* Redis */}
      <Heading id="redis-setup" level={2}>
        Redis Setup
      </Heading>
      <p>
        Redis is used for rate limiting, job queues (BullMQ email worker), and
        OAuth one-time codes.
      </p>
      <CodeBlock language="bash" filename="Terminal">
        {`# macOS
brew install redis && brew services start redis

# Ubuntu/Debian
sudo apt install redis-server && sudo systemctl start redis

# Windows / Docker
docker run -d --name redis -p 6379:6379 redis:7`}
      </CodeBlock>
      <p>
        Verify: <code>redis-cli ping</code> → should return <code>PONG</code>
      </p>
      <CodeBlock language="bash" filename=".env">
        {`REDIS_HOST=localhost
REDIS_PORT=6379`}
      </CodeBlock>

      <hr />

      {/* Email */}
      <Heading id="email-config" level={2}>
        Email Configuration
      </Heading>
      <p>AuthHero sends transactional emails for:</p>
      <ul>
        <li>
          <strong>Email verification</strong> — after registration
        </li>
        <li>
          <strong>Password reset</strong> — when user requests it
        </li>
        <li>
          <strong>Resend verification</strong> — when an unverified user tries
          to log in
        </li>
      </ul>

      <Heading id="gmail" level={3}>
        Gmail (easiest for development)
      </Heading>
      <ol>
        <li>
          Go to{" "}
          <a
            href="https://myaccount.google.com/apppasswords"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google App Passwords
          </a>
        </li>
        <li>Generate an app password for &quot;Mail&quot;</li>
        <li>
          Set in your <code>.env</code>:
        </li>
      </ol>
      <CodeBlock language="bash" filename=".env">
        {`EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password`}
      </CodeBlock>

      <Callout type="warning" title="2FA Required">
        <p>
          You need 2-Step Verification enabled on your Google account to create
          app passwords.
        </p>
      </Callout>

      <Heading id="email-worker" level={3}>
        Start the email worker
      </Heading>
      <p>
        Emails are processed asynchronously via BullMQ. Run the worker in a
        separate terminal:
      </p>
      <CodeBlock language="bash" filename="Terminal">
        {`npm run worker`}
      </CodeBlock>
      <p>
        <strong>Why a separate worker?</strong> This prevents email sending from
        blocking HTTP responses. If the SMTP server is slow, your API responses
        remain fast. It also enables retry logic for failed emails.
      </p>

      <hr />

      {/* Verify */}
      <Heading id="verify" level={2}>
        Verify It Works
      </Heading>

      <Heading id="health-check" level={3}>
        Health check
      </Heading>
      <CodeBlock language="bash" filename="Terminal">
        {`curl http://localhost:5000/health`}
      </CodeBlock>
      <CodeBlock language="json" filename="Response">
        {`{
  "status": "ok",
  "timestamp": "2026-02-27T12:00:00.000Z"
}`}
      </CodeBlock>

      <Heading id="register-user" level={3}>
        Register a user
      </Heading>
      <CodeBlock language="bash" filename="Terminal">
        {`curl -X POST http://localhost:5000/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "fullname": "John Doe",
    "email": "john@example.com",
    "password": "MySecure@Pass1"
  }'`}
      </CodeBlock>
      <CodeBlock language="json" filename="Response">
        {`{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "fullname": "John Doe",
    "email": "john@example.com",
    "emailVerified": false,
    "mfaEnabled": false,
    "createdAt": "2026-02-27T12:00:00.000Z"
  }
}`}
      </CodeBlock>

      <Heading id="login-user" level={3}>
        Login
      </Heading>
      <CodeBlock language="bash" filename="Terminal">
        {`curl -X POST http://localhost:5000/auth/login \\
  -H "Content-Type: application/json" \\
  -c cookies.txt \\
  -d '{
    "email": "john@example.com",
    "password": "MySecure@Pass1"
  }'`}
      </CodeBlock>

      <Callout type="info" title="Email verification required">
        <p>
          You&apos;ll get a <code>403</code> with{" "}
          <code>errorCode: &quot;EMAIL_NOT_VERIFIED&quot;</code> until the email
          is verified. A new verification link is automatically sent.
        </p>
      </Callout>

      <hr />

      {/* Scripts */}
      <Heading id="scripts" level={2}>
        Available Scripts
      </Heading>
      <Table
        headers={["Script", "Command", "Description"]}
        rows={[
          ["dev", "bun --watch src/server.ts", "Dev server with hot reload"],
          [
            "worker",
            "bun --watch src/workers/email.worker.ts",
            "Email worker with hot reload",
          ],
          ["build", "tsup", "Build for production (ESM + DTS)"],
          ["start", "node dist/server.js", "Run production build"],
          ["db:migrate", "npx prisma migrate dev", "Run database migrations"],
          ["db:generate", "npx prisma generate", "Regenerate Prisma client"],
          ["db:studio", "npx prisma studio", "Open Prisma visual browser"],
          ["test", "vitest run", "Run all tests"],
          ["test:watch", "vitest", "Run tests in watch mode"],
          [
            "test:coverage",
            "vitest run --coverage",
            "Run tests with coverage report",
          ],
          ["typecheck", "tsc --noEmit", "Check types without emitting"],
          ["lint", "eslint src/", "Lint source code"],
          ["format", 'prettier --write "src/**/*.ts"', "Format code"],
        ]}
      />
    </>
  );
}
