import React from "react";
import CodeBlock from "@/components/docs/CodeBlock";
import {
  Heading,
  Callout,
  Table,
  Badge,
} from "@/components/docs/DocsComponents";

export const metadata = {
  title: "Database Schema — AuthHero Docs",
};

export default function DatabasePage() {
  return (
    <>
      <Heading id="database-schema" level={1}>
        Database Schema
      </Heading>
      <p>
        AuthHero uses <strong>PostgreSQL</strong> as its primary database,
        managed through <strong>Prisma 7</strong> (with the new PrismaPg driver
        adapter). The schema contains 6 models that cover users, sessions, email
        verification, password resets, OAuth accounts, and MFA secrets.
      </p>

      <hr />

      <Heading id="erd" level={2}>
        Entity Relationship Overview
      </Heading>
      <CodeBlock language="text" filename="Relationships">
        {`User (1) ─── (many) Session
User (1) ─── (many) EmailVerification
User (1) ─── (many) PasswordReset
User (1) ─── (many) OAuthAccount
User (1) ─── (0..1) MFASecret`}
      </CodeBlock>
      <p>
        All relations use <code>onDelete: Cascade</code> — when a user is
        deleted, all their related records are automatically removed.
      </p>

      <hr />

      {/* ==================== USER ==================== */}
      <Heading id="user" level={2}>
        User
      </Heading>
      <p>
        The core user model. Supports both email/password and OAuth-only users.
      </p>
      <Table
        headers={["Column", "Type", "Constraints", "Description"]}
        rows={[
          ["id", "UUID", "PK, auto-generated", "gen_random_uuid()"],
          ["fullname", "String", "Required", "User's display name"],
          ["email", "String", "Unique", "Login identifier; always lowercase"],
          [
            "passwordHash",
            "String?",
            "Nullable",
            "Null for OAuth-only users. Argon2 hash.",
          ],
          [
            "emailVerified",
            "Boolean",
            "Default: false",
            "Flipped after email verification",
          ],
          [
            "mfaEnabled",
            "Boolean",
            "Default: false",
            "Flipped after first successful TOTP verify",
          ],
          ["createdAt", "Timestamp(6)", "Auto", "Record creation time"],
          ["updatedAt", "Timestamp(6)", "Auto", "Last update time"],
        ]}
      />
      <Callout type="info" title="OAuth-only users">
        <p>
          When a user signs up exclusively via OAuth (Google, GitHub, etc.),
          <code>passwordHash</code> is <code>null</code>. These users cannot use
          the password login flow until they set a password (if such
          functionality is added).
        </p>
      </Callout>

      <hr />

      {/* ==================== SESSION ==================== */}
      <Heading id="session" level={2}>
        Session
      </Heading>
      <p>
        Represents an active or revoked user session. Each session maps to one
        refresh token.
      </p>
      <Table
        headers={["Column", "Type", "Constraints", "Description"]}
        rows={[
          ["id", "UUID", "PK, auto-generated", "Session identifier"],
          ["userId", "UUID", "FK → User", "Owner of the session"],
          [
            "refreshTokenHash",
            "String",
            "Unique, Indexed",
            "SHA-256 hash of the refresh token",
          ],
          [
            "expiresAt",
            "DateTime",
            "Required",
            "When the session expires (30 days)",
          ],
          [
            "revokedAt",
            "DateTime?",
            "Nullable",
            "Set when session is revoked (logout / reuse detection)",
          ],
          [
            "lastRotatedAt",
            "DateTime?",
            "Nullable",
            "Updated on each token refresh",
          ],
          ["userAgent", "String?", "Nullable", "Browser / client user-agent"],
          ["ipAddress", "String?", "Nullable", "Client IP address"],
          ["createdAt", "Timestamp(6)", "Auto", "Session creation time"],
        ]}
      />
      <p>
        <strong>Indexes:</strong>
      </p>
      <ul>
        <li>
          <code>@@index([refreshTokenHash, userId])</code> — fast lookup during
          refresh
        </li>
      </ul>

      <Callout type="warning" title="Refresh token rotation">
        <p>
          The refresh token is never stored in plaintext — only its SHA-256 hash
          is persisted. When a token is rotated, the old hash is replaced with
          the new one. If the old token is reused (detected by hash mismatch +
          valid session), all sessions for that user are revoked immediately.
        </p>
      </Callout>

      <hr />

      {/* ==================== EMAIL VERIFICATION ==================== */}
      <Heading id="email-verification" level={2}>
        EmailVerification
      </Heading>
      <p>Tracks email verification tokens sent to users during registration.</p>
      <Table
        headers={["Column", "Type", "Constraints", "Description"]}
        rows={[
          ["id", "UUID", "PK, auto-generated", "Record ID"],
          ["userId", "UUID", "FK → User", "User this token belongs to"],
          [
            "tokenHash",
            "String",
            "Indexed",
            "SHA-256 hash of verification token",
          ],
          [
            "expiresAt",
            "DateTime",
            "Required",
            "Token expires after 10 minutes",
          ],
          ["usedAt", "DateTime?", "Nullable", "Set when token is consumed"],
          ["createdAt", "Timestamp(6)", "Auto", "Record creation time"],
        ]}
      />
      <p>
        <strong>Indexes:</strong>
      </p>
      <ul>
        <li>
          <code>@@index([tokenHash])</code> — fast token lookup
        </li>
        <li>
          <code>@@index([userId, tokenHash])</code> — compound lookup for user +
          token
        </li>
      </ul>

      <hr />

      {/* ==================== PASSWORD RESET ==================== */}
      <Heading id="password-reset" level={2}>
        PasswordReset
      </Heading>
      <p>Tracks password reset tokens sent via the forgot-password flow.</p>
      <Table
        headers={["Column", "Type", "Constraints", "Description"]}
        rows={[
          ["id", "UUID", "PK, auto-generated", "Record ID"],
          ["userId", "UUID", "FK → User", "User this token belongs to"],
          ["tokenHash", "String", "Indexed", "SHA-256 hash of reset token"],
          [
            "expiresAt",
            "DateTime",
            "Required",
            "Token expires after 15 minutes",
          ],
          ["usedAt", "DateTime?", "Nullable", "Set when token is consumed"],
          ["createdAt", "Timestamp(6)", "Auto", "Record creation time"],
        ]}
      />
      <p>
        <strong>Indexes:</strong>
      </p>
      <ul>
        <li>
          <code>@@index([tokenHash])</code> — fast token lookup
        </li>
        <li>
          <code>@@index([userId, tokenHash])</code> — compound lookup
        </li>
      </ul>

      <hr />

      {/* ==================== OAUTH ACCOUNT ==================== */}
      <Heading id="oauth-account" level={2}>
        OAuthAccount
      </Heading>
      <p>
        Links external OAuth providers to a user account. A user can have
        multiple OAuth accounts (e.g., Google + GitHub).
      </p>
      <Table
        headers={["Column", "Type", "Constraints", "Description"]}
        rows={[
          ["id", "UUID", "PK, auto-generated", "Record ID"],
          ["userId", "UUID", "FK → User, Indexed", "Owner of this OAuth link"],
          [
            "provider",
            "String",
            "Part of unique compound",
            "Provider name: google, github, facebook",
          ],
          [
            "providerUserId",
            "String",
            "Part of unique compound",
            "User ID from the OAuth provider",
          ],
          ["createdAt", "Timestamp(6)", "Auto", "When the link was created"],
        ]}
      />
      <p>
        <strong>Constraints:</strong>
      </p>
      <ul>
        <li>
          <code>@@unique([provider, providerUserId])</code> — ensures the same
          provider account can&apos;t be linked to multiple AuthHero users
        </li>
        <li>
          <code>@@index([userId])</code> — fast lookup by user
        </li>
      </ul>

      <Callout type="info" title="Account linking">
        <p>
          If a user registers with email/password and later logs in via Google
          with the same email, the OAuth account is linked to the existing user.
          This happens inside a Prisma transaction.
        </p>
      </Callout>

      <hr />

      {/* ==================== MFA SECRET ==================== */}
      <Heading id="mfa-secret" level={2}>
        MFASecret
      </Heading>
      <p>
        Stores the encrypted TOTP secret and hashed backup codes. One-to-one
        relationship with User.
      </p>
      <Table
        headers={["Column", "Type", "Constraints", "Description"]}
        rows={[
          ["id", "UUID", "PK, auto-generated", "Record ID"],
          ["userId", "UUID", "Unique, FK → User", "One MFA secret per user"],
          [
            "secretHash",
            "String",
            "Required",
            "AES-256-GCM encrypted TOTP secret (not a hash — encrypted so it can be decrypted for verification)",
          ],
          [
            "backupCodes",
            "String[]",
            "Required",
            "Argon2 hashes of the 8 backup codes",
          ],
          [
            "verified",
            "Boolean",
            "Default: false",
            "True after user confirms setup with a valid TOTP code",
          ],
          [
            "enabledAt",
            "DateTime?",
            "Nullable",
            "Timestamp when MFA was fully enabled",
          ],
          ["createdAt", "Timestamp(6)", "Auto", "Record creation time"],
        ]}
      />
      <Callout type="warning" title="secretHash naming">
        <p>
          Despite the name <code>secretHash</code>, this field contains an
          AES-256-GCM encrypted value (not a one-way hash). This is necessary
          because the TOTP secret must be decrypted at runtime to verify codes.
          The encryption key is <code>MFA_ENCRYPTION_KEY</code>.
        </p>
      </Callout>

      <hr />

      {/* ==================== MIGRATIONS ==================== */}
      <Heading id="migrations" level={2}>
        Running Migrations
      </Heading>
      <p>Prisma manages database migrations. Common commands:</p>
      <CodeBlock language="bash" filename="Terminal">
        {`# Apply all pending migrations (use in development)
npx prisma migrate dev

# Apply migrations in production (non-interactive)
npx prisma migrate deploy

# Create a new migration after changing schema.prisma
npx prisma migrate dev --name your_migration_name

# Reset the database (drops all data + re-applies migrations)
npx prisma migrate reset

# Open Prisma Studio (visual database browser)
npx prisma studio`}
      </CodeBlock>

      <Heading id="schema-file" level={3}>
        Full Schema
      </Heading>
      <p>
        The complete Prisma schema is located at{" "}
        <code>prisma/schema.prisma</code>:
      </p>
      <CodeBlock language="prisma" filename="prisma/schema.prisma">
        {`generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model User {
  id            String  @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  fullname      String
  email         String  @unique
  passwordHash  String? // null for OAuth-only users
  emailVerified Boolean @default(false)
  mfaEnabled    Boolean @default(false)

  createdAt DateTime @default(now()) @db.Timestamp(6)
  updatedAt DateTime @updatedAt @db.Timestamp(6)

  sessions           Session[]
  emailVerifications EmailVerification[]
  passwordResets     PasswordReset[]
  oauthAccounts      OAuthAccount[]
  mfaSecrets         MFASecret?
}

model Session {
  id               String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId           String    @db.Uuid
  refreshTokenHash String    @unique
  expiresAt        DateTime
  revokedAt        DateTime?
  lastRotatedAt    DateTime?
  userAgent        String?
  ipAddress        String?
  createdAt        DateTime  @default(now()) @db.Timestamp(6)
  user             User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([refreshTokenHash, userId])
}

model EmailVerification {
  id        String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId    String    @db.Uuid
  tokenHash String
  expiresAt DateTime
  usedAt    DateTime?
  createdAt DateTime  @default(now()) @db.Timestamp(6)
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([tokenHash])
  @@index([userId, tokenHash])
}

model PasswordReset {
  id        String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId    String    @db.Uuid
  tokenHash String
  expiresAt DateTime
  usedAt    DateTime?
  createdAt DateTime  @default(now()) @db.Timestamp(6)
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([tokenHash])
  @@index([userId, tokenHash])
}

model OAuthAccount {
  id             String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId         String   @db.Uuid
  provider       String
  providerUserId String
  createdAt      DateTime @default(now()) @db.Timestamp(6)
  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerUserId])
  @@index([userId])
}

model MFASecret {
  id          String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId      String    @unique @db.Uuid
  secretHash  String
  backupCodes String[]
  verified    Boolean   @default(false)
  enabledAt   DateTime?
  createdAt   DateTime  @default(now()) @db.Timestamp(6)
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}`}
      </CodeBlock>

      <hr />

      <Heading id="prisma-config" level={2}>
        Prisma Configuration
      </Heading>
      <p>
        AuthHero uses the <strong>PrismaPg driver adapter</strong> for optimal
        PostgreSQL performance. The Prisma client is initialized in{" "}
        <code>src/config/prisma.ts</code>:
      </p>
      <CodeBlock language="typescript" filename="src/config/prisma.ts">
        {`import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });`}
      </CodeBlock>
      <p>
        The driver adapter approach means Prisma communicates directly through
        the <code>pg</code> driver rather than its default engine binary, which
        can reduce overhead in production containers.
      </p>
    </>
  );
}
