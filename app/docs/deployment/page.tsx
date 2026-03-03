import React from "react";
import CodeBlock from "@/components/docs/CodeBlock";
import {
  Heading,
  Callout,
  Table,
  Step,
} from "@/components/docs/DocsComponents";

export const metadata = {
  title: "Deployment — AuthHero Docs",
};

export default function DeploymentPage() {
  return (
    <>
      <Heading id="deployment" level={1}>
        Deployment Guide
      </Heading>
      <p>
        This guide covers building for production, Docker deployment, and a
        production readiness checklist.
      </p>

      <hr />

      {/* ============ BUILD ============ */}
      <Heading id="building" level={2}>
        Building for Production
      </Heading>
      <p>
        AuthHero uses <strong>tsup</strong> for production builds, outputting
        ESM modules with type declarations:
      </p>
      <CodeBlock language="bash" filename="Terminal">
        {`# Build the project
npm run build

# Output goes to dist/
#   dist/index.mjs        (library entry)
#   dist/server.mjs       (standalone server entry)
#   dist/index.d.mts      (type declarations)
#   dist/server.d.mts     (type declarations)`}
      </CodeBlock>

      <Heading id="build-config" level={3}>
        Build Configuration
      </Heading>
      <CodeBlock language="typescript" filename="tsup.config.ts">
        {`import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    server: "src/server.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  target: "node18",
  outDir: "dist",
  clean: true,
  splitting: false,
  external: ["express"],
});`}
      </CodeBlock>

      <hr />

      {/* ============ STANDALONE ============ */}
      <Heading id="standalone" level={2}>
        Standalone Deployment
      </Heading>
      <p>The simplest deployment — run AuthHero as its own Node.js process:</p>
      <CodeBlock language="bash" filename="Terminal">
        {`# 1. Install dependencies
npm ci --production

# 2. Generate Prisma client
npx prisma generate

# 3. Run migrations
npx prisma migrate deploy

# 4. Build
npm run build

# 5. Start
node dist/server.mjs`}
      </CodeBlock>

      <Heading id="standalone-pm2" level={3}>
        With PM2 (Process Manager)
      </Heading>
      <CodeBlock language="bash" filename="Terminal">
        {`# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start dist/server.mjs --name authhero

# View logs
pm2 logs authhero

# Auto-restart on crash + startup on boot
pm2 startup
pm2 save`}
      </CodeBlock>

      <hr />

      {/* ============ DOCKER ============ */}
      <Heading id="docker" level={2}>
        Docker Deployment
      </Heading>
      <CodeBlock language="dockerfile" filename="Dockerfile">
        {`FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npx prisma generate

COPY tsconfig.json tsup.config.ts ./
COPY src ./src
RUN npm run build

# ---- Production ----
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./
COPY --from=builder /app/src/generated ./src/generated

EXPOSE 5000

CMD ["node", "dist/server.mjs"]`}
      </CodeBlock>

      <Heading id="docker-compose" level={3}>
        Docker Compose (Full Stack)
      </Heading>
      <CodeBlock language="yaml" filename="docker-compose.yml">
        {`services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/authhero
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      # ... add all other env vars
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started

  db:
    image: postgres:17-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: authhero
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:`}
      </CodeBlock>

      <CodeBlock language="bash" filename="Terminal">
        {`# Build and start all services
docker compose up -d --build

# Run migrations inside the app container
docker compose exec app npx prisma migrate deploy

# View logs
docker compose logs -f app`}
      </CodeBlock>

      <hr />

      {/* ============ LIBRARY MODE ============ */}
      <Heading id="library-mode" level={2}>
        Library Mode Deployment
      </Heading>
      <p>
        When using AuthHero as an npm package embedded in your existing Express
        app:
      </p>
      <CodeBlock language="typescript" filename="your-app/server.ts">
        {`import express from "express";
import { createAuthHero } from "@nandalalshukla/auth-hero";

const app = express();

async function main() {
  // Create the auth-hero router (connects to DB, Redis, etc.)
  const authRouter = await createAuthHero({
    // All config comes from YOUR .env — auth-hero reads process.env
  });

  // Mount at /auth (or any path you want)
  app.use("/auth", authRouter);

  // Your other routes
  app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from your app!" });
  });

  app.listen(3000, () => console.log("Running on :3000"));
}

main();`}
      </CodeBlock>
      <Callout type="info" title="Same environment variables">
        <p>
          In library mode, AuthHero reads from <code>process.env</code> just
          like standalone mode. Make sure all required environment variables are
          set before calling <code>createAuthHero()</code>.
        </p>
      </Callout>

      <hr />

      {/* ============ REVERSE PROXY ============ */}
      <Heading id="reverse-proxy" level={2}>
        Reverse Proxy (NGINX)
      </Heading>
      <p>
        In production, run AuthHero behind a reverse proxy for TLS termination,
        load balancing, and static file serving:
      </p>
      <CodeBlock language="nginx" filename="nginx.conf">
        {`server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate     /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`}
      </CodeBlock>
      <Callout type="warning" title="Trust proxy">
        <p>
          When behind a reverse proxy, Express needs to trust the proxy headers
          for correct IP-based rate limiting. AuthHero&apos;s Express app has
          this configured, but ensure your proxy sets the{" "}
          <code>X-Forwarded-For</code> header correctly.
        </p>
      </Callout>

      <hr />

      {/* ============ ENVIRONMENT ============ */}
      <Heading id="production-env" level={2}>
        Production Environment Setup
      </Heading>
      <Table
        headers={["Setting", "Development", "Production"]}
        rows={[
          ["NODE_ENV", "development", "production"],
          ["Cookie secure", "false", "true (HTTPS only)"],
          ["Cookie sameSite", "lax", "strict"],
          ["CORS origin", "http://localhost:*", "https://yourdomain.com"],
          ["FRONTEND_URL", "http://localhost:3000", "https://yourdomain.com"],
          ["APP_URL", "http://localhost:5000", "https://api.yourdomain.com"],
        ]}
      />

      <hr />

      {/* ============ CHECKLIST ============ */}
      <Heading id="checklist" level={2}>
        Production Readiness Checklist
      </Heading>
      <Table
        headers={["Item", "Action"]}
        rows={[
          [
            "TLS/HTTPS",
            "Set up via reverse proxy (NGINX, Caddy) or cloud load balancer",
          ],
          ["Secrets", "Use secrets manager (AWS Secrets Manager, Vault, etc.)"],
          ["Database", "Use managed PostgreSQL (RDS, Supabase, Neon)"],
          ["Redis", "Use managed Redis (ElastiCache, Upstash, Redis Cloud)"],
          ["Migrations", "Run prisma migrate deploy in CI/CD pipeline"],
          [
            "Monitoring",
            "AuthHero logs with pino — pipe to your log aggregator",
          ],
          ["Backups", "Enable automated PostgreSQL + Redis backups"],
          [
            "Rate limiting",
            "Review limits — may need adjustment for production traffic",
          ],
          ["CORS", "Set FRONTEND_URL to your exact production frontend domain"],
          ["Cookie domain", "Ensure cookies work across your domain setup"],
          ["MFA key backup", "Securely store MFA_ENCRYPTION_KEY backup"],
          ["npm audit", "Run npm audit regularly and fix vulnerabilities"],
        ]}
      />

      <hr />

      {/* ============ AVAILABLE SCRIPTS ============ */}
      <Heading id="scripts" level={2}>
        Available npm Scripts
      </Heading>
      <Table
        headers={["Script", "Description"]}
        rows={[
          [
            "npm run dev",
            "Start development server with hot-reload (tsx watch)",
          ],
          ["npm run build", "Production build with tsup"],
          ["npm start", "Run the built server (node dist/server.mjs)"],
          ["npm test", "Run all tests with vitest"],
          ["npm run test:watch", "Run tests in watch mode"],
          ["npm run test:coverage", "Run tests with coverage report"],
          ["npm run lint", "Run ESLint"],
          ["npm run lint:fix", "Run ESLint with auto-fix"],
          ["npm run format", "Format with Prettier"],
          ["npm run format:check", "Check formatting"],
          ["npm run db:generate", "Generate Prisma client"],
          ["npm run db:migrate", "Run database migrations (dev)"],
          ["npm run db:studio", "Open Prisma Studio (visual DB browser)"],
        ]}
      />
    </>
  );
}
