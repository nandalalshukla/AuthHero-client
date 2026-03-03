import React from "react";
import CodeBlock from "@/components/docs/CodeBlock";
import {
  Heading,
  Callout,
  Step,
  Badge,
} from "@/components/docs/DocsComponents";

export const metadata = {
  title: "Authentication Flows — AuthHero Docs",
};

export default function AuthenticationFlowsPage() {
  return (
    <>
      <Heading id="authentication-flows" level={1}>
        Authentication Flows
      </Heading>
      <p>
        This page walks through every authentication flow in AuthHero step by
        step, showing the sequence of API calls, what happens on the server, and
        what the frontend does at each stage.
      </p>

      <hr />

      {/* =========== REGISTRATION =========== */}
      <Heading id="registration-flow" level={2}>
        Registration Flow
      </Heading>
      <Step number={1} title="User submits the registration form">
        <p>
          Frontend sends <code>POST /auth/register</code> with{" "}
          <code>fullname</code>, <code>email</code>, and <code>password</code>.
        </p>
      </Step>
      <Step number={2} title="Server validates and creates the user">
        <p>
          The Zod schema validates the input. If the email already exists, an
          error with code <code>EMAIL_ALREADY_EXISTS</code> is returned.
          Otherwise, the password is hashed with argon2 and a new User record is
          created.
        </p>
      </Step>
      <Step number={3} title="Verification email is queued">
        <p>
          A random 72-hex-character token is generated. Its SHA-256 hash is
          stored in the <code>EmailVerification</code> table. The plaintext
          token is passed to BullMQ, which sends the email asynchronously
          (non-blocking).
        </p>
      </Step>
      <Step number={4} title="User clicks the email link">
        <p>
          The link points to{" "}
          <code>{`{FRONTEND_URL}/verify-email?token={token}`}</code>. The
          frontend extracts the token and sends{" "}
          <code>POST /auth/verify-email</code>.
        </p>
      </Step>
      <Step number={5} title="Server verifies the token">
        <p>
          The server hashes the received token, looks it up in the database,
          checks it hasn&apos;t expired or been used, then flips{" "}
          <code>emailVerified</code> to <code>true</code>.
        </p>
      </Step>

      <Callout type="info" title="Tokens expire in 10 minutes">
        <p>
          If the token expires, the user must request a new one (re-register or
          trigger a verification resend).
        </p>
      </Callout>

      <hr />

      {/* =========== EMAIL/PASSWORD LOGIN =========== */}
      <Heading id="login-flow" level={2}>
        Email/Password Login Flow
      </Heading>

      <Heading id="login-no-mfa" level={3}>
        Without MFA
      </Heading>
      <Step number={1} title="User submits login form">
        <p>
          Frontend sends <code>POST /auth/login</code> with <code>email</code>{" "}
          and <code>password</code>.
        </p>
      </Step>
      <Step number={2} title="Server verifies credentials">
        <p>
          Looks up user by email. Checks <code>emailVerified</code> (returns{" "}
          <code>EMAIL_NOT_VERIFIED</code> if false). Verifies password against
          stored argon2 hash using constant-time comparison.
        </p>
      </Step>
      <Step number={3} title="Session created">
        <p>
          A random 80-hex-char refresh token is generated. Its SHA-256 hash is
          stored in the Session table. A 15-minute JWT access token is signed
          with <code>ACCESS_TOKEN_SECRET</code> containing{" "}
          <code>{`{ userId, sessionId }`}</code>.
        </p>
      </Step>
      <Step number={4} title="Tokens returned">
        <p>
          The access token is in the JSON response body. The refresh token is
          set as an httpOnly, secure, SameSite=strict cookie (never exposed to
          JavaScript).
        </p>
      </Step>

      <Heading id="login-with-mfa" level={3}>
        With MFA Enabled
      </Heading>
      <Step number={1} title="User submits login form">
        <p>Same as above.</p>
      </Step>
      <Step number={2} title="Server detects MFA is enabled">
        <p>
          After password verification succeeds, the server checks{" "}
          <code>user.mfaEnabled</code>. Instead of creating a session, it
          generates a <strong>5-minute MFA temp token</strong> signed with{" "}
          <code>MFA_TEMP_TOKEN_SECRET</code>.
        </p>
      </Step>
      <Step number={3} title="Frontend receives MFA challenge">
        <p>
          Response: <code>{`{ mfaRequired: true, tempToken: "..." }`}</code>.
          The frontend stores the <code>tempToken</code> in Zustand state and
          redirects to the <code>/mfa</code> challenge page.
        </p>
      </Step>
      <Step number={4} title="User enters TOTP code">
        <p>
          Frontend sends <code>POST /auth/mfa/challenge</code> with{" "}
          <code>tempToken</code> and the 6-digit <code>code</code> (or 8-char
          backup code).
        </p>
      </Step>
      <Step number={5} title="Server verifies and creates session">
        <p>
          The temp token is decoded to extract <code>userId</code>. The TOTP
          code is verified against the decrypted secret. If using a backup code,
          the matching hash is compared with argon2 and deleted. On success, a
          full session is created and tokens are returned.
        </p>
      </Step>

      <hr />

      {/* =========== OAUTH FLOW =========== */}
      <Heading id="oauth-flow" level={2}>
        OAuth Login Flow
      </Heading>
      <Step number={1} title="User clicks a social login button">
        <p>
          Frontend opens <code>GET /auth/oauth/:provider</code> (e.g.,{" "}
          <code>/auth/oauth/google</code>). The server generates a random CSRF
          state, stores it in an httpOnly cookie, and redirects the user to the
          provider&apos;s consent screen.
        </p>
      </Step>
      <Step number={2} title="User grants permission">
        <p>
          The OAuth provider redirects back to{" "}
          <code>{`GET /auth/oauth/callback/:provider?code=...&state=...`}</code>
          .
        </p>
      </Step>
      <Step number={3} title="Server validates the callback">
        <p>
          The CSRF state from the cookie is compared with the query parameter.
          The authorization code is exchanged for an access token with the
          provider, then the user&apos;s profile (email, name, provider ID) is
          fetched.
        </p>
      </Step>
      <Step number={4} title="User is synced with the database">
        <p>
          In a Prisma transaction: if an OAuthAccount exists, the linked user is
          returned. If a user with that email exists, the OAuth account is
          linked. Otherwise, a new User + OAuthAccount are created.
        </p>
      </Step>
      <Step number={5} title="One-time code redirect">
        <p>
          The server does NOT put tokens in the redirect URL (they would leak
          via browser history and Referer headers). Instead, tokens are stored
          in Redis behind a random one-time code. The user is redirected to{" "}
          <code>{`{FRONTEND_URL}/auth/callback?code={oneTimeCode}`}</code>.
        </p>
      </Step>
      <Step number={6} title="Frontend exchanges the code">
        <p>
          The callback page sends <code>POST /auth/oauth/exchange</code> with
          the one-time code. The server looks it up in Redis, deletes it
          (one-time use), and returns the access token + sets the refresh
          cookie.
        </p>
      </Step>

      <Callout type="warning" title="MFA + OAuth">
        <p>
          If the OAuth user has MFA enabled, the one-time code resolves to a
          temp token instead. The frontend then shows the MFA challenge page
          (same flow as email/password MFA).
        </p>
      </Callout>

      <hr />

      {/* =========== TOKEN REFRESH =========== */}
      <Heading id="refresh-flow" level={2}>
        Token Refresh Flow
      </Heading>
      <Step number={1} title="Access token expires">
        <p>
          The Axios interceptor in the frontend detects a <code>401</code>{" "}
          response (access token expired or invalid).
        </p>
      </Step>
      <Step number={2} title="Automatic refresh">
        <p>
          The interceptor sends <code>POST /auth/refresh-token</code> with{" "}
          <code>withCredentials: true</code> (sends the httpOnly refresh cookie
          automatically).
        </p>
      </Step>
      <Step number={3} title="Token rotation">
        <p>
          The server hashes the received refresh token, looks up the session,
          verifies it&apos;s not revoked or expired. Then it generates a{" "}
          <strong>new</strong> refresh token, updates the session with the new
          hash, and returns a new access token.
        </p>
      </Step>
      <Step number={4} title="Reuse detection">
        <p>
          If the old refresh token is reused after rotation (meaning someone
          stole it), the hash won&apos;t match. The server immediately revokes{" "}
          <strong>all sessions</strong> for that user and returns{" "}
          <code>SESSION_REVOKED</code>.
        </p>
      </Step>

      <Callout type="danger" title="Reuse = Compromise">
        <p>
          If AuthHero detects refresh token reuse, it assumes the token was
          stolen. The nuclear option (revoking all sessions) forces the attacker
          and the real user to re-authenticate, which is the safest response.
        </p>
      </Callout>

      <hr />

      {/* =========== PASSWORD RESET =========== */}
      <Heading id="password-reset-flow" level={2}>
        Password Reset Flow
      </Heading>
      <Step number={1} title="User clicks 'Forgot password'">
        <p>
          Frontend sends <code>POST /auth/forgot-password</code> with{" "}
          <code>email</code>. The response always says{" "}
          <em>&quot;If an account exists, a reset link has been sent.&quot;</em>{" "}
          to prevent email enumeration.
        </p>
      </Step>
      <Step number={2} title="Reset email is sent (if user exists)">
        <p>
          A 72-hex-character token is generated. Its SHA-256 hash is stored in
          PasswordReset. The plaintext token is sent via BullMQ email worker.
          Link format:{" "}
          <code>{`{FRONTEND_URL}/reset-password?token={token}`}</code>.
        </p>
      </Step>
      <Step number={3} title="User clicks the link and sets a new password">
        <p>
          Frontend sends <code>POST /auth/reset-password</code> with{" "}
          <code>token</code> and <code>newPassword</code>.
        </p>
      </Step>
      <Step number={4} title="Server resets the password">
        <p>
          Validates the token (not expired, not used), hashes the new password
          with argon2, updates the user, marks the token as used, and revokes
          all existing sessions for security.
        </p>
      </Step>

      <hr />

      {/* =========== VISUAL SUMMARY =========== */}
      <Heading id="token-lifecycle" level={2}>
        Token Lifecycle Summary
      </Heading>
      <CodeBlock language="text" filename="Token Flow Diagram">
        {`┌─────────────────────────────────────────────────────────────┐
│                    LOGIN (no MFA)                            │
│                                                             │
│  Client                    Server                           │
│    │                         │                              │
│    ├─ POST /auth/login ──────►  Verify credentials          │
│    │                         │  Create Session in DB        │
│    │                         │  Sign access token (JWT)     │
│    ◄─ { accessToken } ──────┤  Set refreshToken cookie     │
│    │                         │                              │
│    │    ... 15 min later ... │                              │
│    │                         │                              │
│    ├─ GET /auth/me ──────────►  401 (token expired)         │
│    │                         │                              │
│    ├─ POST /refresh-token ───►  Rotate refresh token        │
│    │  (cookie sent auto)     │  Sign new access token       │
│    ◄─ { accessToken } ──────┤  Update session hash         │
│    │                         │                              │
│    ├─ GET /auth/me ──────────►  200 (works!)                │
│    │  (retry original req)   │                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    LOGIN (with MFA)                          │
│                                                             │
│  Client                    Server                           │
│    │                         │                              │
│    ├─ POST /auth/login ──────►  Verify credentials          │
│    │                         │  Detect mfaEnabled           │
│    ◄─ { mfaRequired,        │  Sign MFA temp token         │
│    │    tempToken } ─────────┤  (5-min lifetime)            │
│    │                         │                              │
│    │  Redirect to /mfa page  │                              │
│    │                         │                              │
│    ├─ POST /mfa/challenge ───►  Verify tempToken            │
│    │  { tempToken, code }    │  Decrypt TOTP secret         │
│    │                         │  Verify the 6-digit code     │
│    │                         │  Create Session in DB        │
│    ◄─ { accessToken } ──────┤  Set refreshToken cookie     │
└─────────────────────────────────────────────────────────────┘`}
      </CodeBlock>
    </>
  );
}
