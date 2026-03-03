import React from "react";
import CodeBlock from "@/components/docs/CodeBlock";
import {
  Heading,
  Callout,
  Table,
  Step,
} from "@/components/docs/DocsComponents";

export const metadata = {
  title: "Sessions — AuthHero Docs",
};

export default function SessionsPage() {
  return (
    <>
      <Heading id="sessions" level={1}>
        Sessions & Token Management
      </Heading>
      <p>
        AuthHero implements a secure session system with short-lived JWT access
        tokens, long-lived refresh tokens, automatic rotation, and reuse
        detection.
      </p>

      <hr />

      <Heading id="token-types" level={2}>
        Token Types
      </Heading>
      <Table
        headers={["Token", "Format", "Lifetime", "Storage"]}
        rows={[
          [
            "Access Token",
            "JWT (signed with ACCESS_TOKEN_SECRET)",
            "15 minutes",
            "Client memory / Zustand",
          ],
          [
            "Refresh Token",
            "Random 80-hex-char string",
            "30 days",
            "httpOnly secure cookie",
          ],
          [
            "MFA Temp Token",
            "JWT (signed with MFA_TEMP_TOKEN_SECRET)",
            "5 minutes",
            "Client memory / Zustand",
          ],
        ]}
      />

      <Heading id="access-token" level={3}>
        Access Token (JWT)
      </Heading>
      <p>The access token is a compact JWT containing:</p>
      <CodeBlock language="json" filename="JWT Payload">
        {`{
  "userId": "cm...",
  "sessionId": "cm...",
  "iat": 1700000000,
  "exp": 1700000900
}`}
      </CodeBlock>
      <p>
        It is signed with <code>ACCESS_TOKEN_SECRET</code> using HS256. The
        token is never stored in cookies — it stays in memory (Zustand store) to
        prevent CSRF attacks.
      </p>

      <Heading id="refresh-token" level={3}>
        Refresh Token
      </Heading>
      <p>
        The refresh token is a cryptographically random 80-hex-character string
        (40 bytes). Only its <strong>SHA-256 hash</strong> is stored in the
        database — the server never persists the plaintext token.
      </p>
      <p>The refresh token is set as a cookie with these properties:</p>
      <Table
        headers={["Property", "Value", "Why"]}
        rows={[
          ["httpOnly", "true", "Prevents JavaScript access (XSS protection)"],
          ["secure", "true (production)", "Only sent over HTTPS"],
          [
            "sameSite",
            "strict",
            "Prevents CSRF — cookie not sent in cross-origin requests",
          ],
          [
            "path",
            "/auth",
            "Only sent to auth endpoints, not to every request",
          ],
          ["maxAge", "30 days", "Cookie expiry matches session expiry"],
        ]}
      />

      <hr />

      {/* ============ SESSION CREATION ============ */}
      <Heading id="session-creation" level={2}>
        Session Creation
      </Heading>
      <p>
        Sessions are created through a centralized <code>createSession()</code>
        function used by all login paths (email/password, OAuth, MFA challenge):
      </p>
      <CodeBlock language="typescript" filename="src/lib/session.ts">
        {`export async function createSession(
  userId: string,
  userAgent?: string,
  ipAddress?: string,
) {
  // 1. Generate random refresh token
  const refreshToken = crypto.randomBytes(TOKEN_LENGTH.REFRESH).toString("hex");
  const refreshTokenHash = hashToken(refreshToken);

  // 2. Sign JWT access token
  const session = await prisma.session.create({
    data: {
      userId,
      refreshTokenHash,
      expiresAt: new Date(Date.now() + TOKEN_EXPIRY.REFRESH_TOKEN_DAYS * 86400000),
      userAgent,
      ipAddress,
    },
  });

  const accessToken = signAccessToken({ userId, sessionId: session.id });

  return { accessToken, refreshToken };
}`}
      </CodeBlock>

      <hr />

      {/* ============ REFRESH FLOW ============ */}
      <Heading id="refresh-rotation" level={2}>
        Refresh Token Rotation
      </Heading>
      <p>
        Every time the access token expires and the client refreshes it, the
        refresh token is <strong>rotated</strong>: the old one is consumed and a
        new one is issued.
      </p>

      <Step number={1} title="Client sends POST /auth/refresh-token">
        <p>
          The httpOnly cookie is automatically included. No request body needed.
        </p>
      </Step>

      <Step number={2} title="Server looks up the session">
        <p>
          The refresh token is hashed (SHA-256) and used to look up the session
          in the database. The server checks:
        </p>
        <ul>
          <li>Session exists</li>
          <li>
            Session is not revoked (<code>revokedAt</code> is null)
          </li>
          <li>Session is not expired</li>
        </ul>
      </Step>

      <Step number={3} title="New tokens are generated">
        <p>
          A new random refresh token is generated. The session&apos;s{" "}
          <code>refreshTokenHash</code> is updated with the new hash.{" "}
          <code>lastRotatedAt</code> is set to now. A new access token JWT is
          signed.
        </p>
      </Step>

      <Step number={4} title="Response">
        <p>
          New access token in the JSON body. New refresh token in the cookie
          (same cookie name, replaces the old one).
        </p>
      </Step>

      <hr />

      {/* ============ REUSE DETECTION ============ */}
      <Heading id="reuse-detection" level={2}>
        Reuse Detection
      </Heading>
      <Callout type="danger" title="Nuclear response to token theft">
        <p>
          If a refresh token that has already been rotated is used again,
          AuthHero assumes the token was stolen. It immediately revokes{" "}
          <strong>all sessions</strong> for that user — forcing both the
          attacker and the real user to re-authenticate.
        </p>
      </Callout>
      <p>How it works:</p>
      <ul>
        <li>
          When a refresh request comes in, the server hashes the token and looks
          for a matching session
        </li>
        <li>
          If no session has that hash, but the token was previously valid
          (meaning it was rotated), this is reuse
        </li>
        <li>
          The server calls <code>logoutAllSessions(userId)</code> which sets{" "}
          <code>revokedAt</code> on every session for that user
        </li>
        <li>
          The response includes error code <code>SESSION_REVOKED</code>
        </li>
      </ul>

      <hr />

      {/* ============ LOGOUT ============ */}
      <Heading id="logout" level={2}>
        Logout
      </Heading>

      <Heading id="single-logout" level={3}>
        Single Session Logout
      </Heading>
      <p>
        <code>POST /auth/logout</code> (requires auth) — Revokes the current
        session by setting <code>revokedAt</code>. Clears the refresh token
        cookie.
      </p>

      <Heading id="logout-all" level={3}>
        Logout All Sessions
      </Heading>
      <p>
        <code>POST /auth/logout-all</code> (requires auth) — Revokes{" "}
        <strong>all</strong> sessions for the user across all devices. Triggered
        automatically on password change for security.
      </p>

      <hr />

      {/* ============ SESSION LIFECYCLE ============ */}
      <Heading id="lifecycle" level={2}>
        Session Lifecycle Summary
      </Heading>
      <CodeBlock language="text" filename="Session States">
        {`CREATED ──────→ ACTIVE ──────→ EXPIRED
   │                │                │
   │                ├── rotate ──→ ACTIVE (new token hash)
   │                │
   │                ├── logout ──→ REVOKED
   │                │
   │                └── reuse detected ──→ ALL SESSIONS REVOKED

Events that revoke all sessions:
  • Refresh token reuse detected
  • Password changed
  • POST /auth/logout-all`}
      </CodeBlock>

      <hr />

      <Heading id="auth-middleware" level={2}>
        Authentication Middleware
      </Heading>
      <p>
        The <code>authenticate</code> middleware runs on protected routes and
        performs two checks:
      </p>
      <ul>
        <li>
          <strong>JWT verification</strong> — Validates the signature and
          extracts <code>userId</code> + <code>sessionId</code>
        </li>
        <li>
          <strong>Session check</strong> — Queries the database to confirm the
          session hasn&apos;t been revoked (this catches cases where a user
          logged out but the JWT hasn&apos;t expired yet)
        </li>
      </ul>
      <CodeBlock language="typescript" filename="Middleware flow">
        {`// 1. Extract token from Authorization header
const token = req.headers.authorization?.split(" ")[1];

// 2. Verify JWT and extract payload
const { userId, sessionId } = verifyAccessToken(token);

// 3. Check session is still valid in DB
const session = await prisma.session.findUnique({ where: { id: sessionId } });
if (!session || session.revokedAt) throw new AppError(401, "Session revoked");

// 4. Attach user context to request
req.user = { userId, sessionId };`}
      </CodeBlock>
    </>
  );
}
