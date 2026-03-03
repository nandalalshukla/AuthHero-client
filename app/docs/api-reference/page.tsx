import React from "react";
import CodeBlock from "@/components/docs/CodeBlock";
import {
  Heading,
  Callout,
  Table,
  EndpointCard,
  Badge,
} from "@/components/docs/DocsComponents";

export const metadata = {
  title: "API Reference — AuthHero Docs",
};

export default function APIReferencePage() {
  return (
    <>
      <Heading id="api-reference" level={1}>
        API Reference
      </Heading>
      <p>All endpoints return JSON with this standard shape:</p>
      <CodeBlock language="json">
        {`{
  "success": true | false,
  "message": "Human-readable message",
  "data": { ... } | null
}`}
      </CodeBlock>
      <p>
        On error, the response additionally includes a machine-readable{" "}
        <code>errorCode</code>:
      </p>
      <CodeBlock language="json">
        {`{
  "success": false,
  "message": "Invalid credentials",
  "errorCode": "INVALID_CREDENTIALS"
}`}
      </CodeBlock>

      <Callout type="info" title="Base path">
        <p>
          All auth routes are mounted at <code>/auth</code>. MFA routes are at{" "}
          <code>/auth/mfa</code>. OAuth routes are at <code>/auth/oauth</code>.
        </p>
      </Callout>

      <hr />

      {/* =========================================================
          AUTHENTICATION ENDPOINTS
          ========================================================= */}
      <Heading id="auth-endpoints" level={2}>
        Authentication Endpoints
      </Heading>

      {/* Register */}
      <EndpointCard method="POST" path="/auth/register" auth={false}>
        Create a new user account. Sends a verification email asynchronously.
      </EndpointCard>

      <Heading id="register-request" level={4}>
        Request Body
      </Heading>
      <Table
        headers={["Field", "Type", "Rules"]}
        rows={[
          ["fullname", "string", "Required, non-empty"],
          ["email", "string", "Required, valid email format"],
          [
            "password",
            "string",
            "8–128 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char",
          ],
        ]}
      />
      <CodeBlock language="bash" filename="Request">
        {`curl -X POST http://localhost:5000/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "fullname": "John Doe",
    "email": "john@example.com",
    "password": "MyP@ssw0rd!"
  }'`}
      </CodeBlock>
      <CodeBlock language="json" filename="Response 201">
        {`{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "data": {
    "id": "cm...",
    "fullname": "John Doe",
    "email": "john@example.com",
    "isVerified": false,
    "mfaEnabled": false,
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
}`}
      </CodeBlock>
      <Callout type="warning" title="Rate limited">
        <p>
          5 requests per 10 minutes per IP. Returns <code>429</code> with a
          retry-after header when exceeded.
        </p>
      </Callout>

      <hr />

      {/* Login */}
      <EndpointCard method="POST" path="/auth/login" auth={false}>
        Authenticate with email and password. Returns either session tokens or
        an MFA challenge.
      </EndpointCard>

      <Heading id="login-request" level={4}>
        Request Body
      </Heading>
      <Table
        headers={["Field", "Type", "Rules"]}
        rows={[
          ["email", "string", "Required, valid email"],
          ["password", "string", "Required, non-empty"],
        ]}
      />
      <CodeBlock language="json" filename="Response 200 — No MFA">
        {`{
  "success": true,
  "message": "Login successful",
  "data": {
    "mfaRequired": false,
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}`}
      </CodeBlock>
      <CodeBlock language="json" filename="Response 200 — MFA Required">
        {`{
  "success": true,
  "message": "MFA verification required",
  "data": {
    "mfaRequired": true,
    "tempToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}`}
      </CodeBlock>
      <p>
        On success without MFA, a <code>refreshToken</code> cookie is set
        automatically (httpOnly, secure, sameSite: strict, 30-day expiry).
      </p>
      <Callout type="info" title="Rate limited">
        <p>10 requests per 15 minutes per IP.</p>
      </Callout>

      <hr />

      {/* Me */}
      <EndpointCard method="GET" path="/auth/me" auth={true}>
        Get the currently authenticated user&apos;s profile.
      </EndpointCard>
      <CodeBlock language="json" filename="Response 200">
        {`{
  "success": true,
  "data": {
    "id": "cm...",
    "fullname": "John Doe",
    "email": "john@example.com",
    "isVerified": true,
    "mfaEnabled": false,
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}`}
      </CodeBlock>

      <hr />

      {/* Verify Email */}
      <EndpointCard method="POST" path="/auth/verify-email" auth={false}>
        Verify a user&apos;s email address with the token from the verification
        email.
      </EndpointCard>
      <Table
        headers={["Field", "Type", "Rules"]}
        rows={[["token", "string", "Required, the token from the email link"]]}
      />
      <CodeBlock language="json" filename="Response 200">
        {`{
  "success": true,
  "message": "Email verified successfully"
}`}
      </CodeBlock>
      <Callout type="info" title="Rate limited">
        <p>5 requests per 10 minutes per IP.</p>
      </Callout>

      <hr />

      {/* Forgot Password */}
      <EndpointCard method="POST" path="/auth/forgot-password" auth={false}>
        Request a password reset email. Always returns the same response
        regardless of whether the email exists (prevents enumeration).
      </EndpointCard>
      <Table
        headers={["Field", "Type", "Rules"]}
        rows={[["email", "string", "Required, valid email"]]}
      />
      <CodeBlock language="json" filename="Response 200">
        {`{
  "success": true,
  "message": "If an account exists, a reset link has been sent."
}`}
      </CodeBlock>
      <Callout type="info" title="Rate limited">
        <p>3 requests per 15 minutes per IP.</p>
      </Callout>

      <hr />

      {/* Reset Password */}
      <EndpointCard method="POST" path="/auth/reset-password" auth={false}>
        Set a new password using the token from the reset email.
      </EndpointCard>
      <Table
        headers={["Field", "Type", "Rules"]}
        rows={[
          ["token", "string", "Required, the token from the email link"],
          [
            "newPassword",
            "string",
            "8–128 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char",
          ],
        ]}
      />
      <CodeBlock language="json" filename="Response 200">
        {`{
  "success": true,
  "message": "Password reset successful"
}`}
      </CodeBlock>
      <Callout type="info" title="Rate limited">
        <p>5 requests per 15 minutes per IP.</p>
      </Callout>

      <hr />

      {/* Change Password */}
      <EndpointCard method="POST" path="/auth/change-password" auth={true}>
        Change the current user&apos;s password. Revokes all other sessions for
        security.
      </EndpointCard>
      <Table
        headers={["Field", "Type", "Rules"]}
        rows={[
          ["currentPassword", "string", "Required, current password"],
          [
            "newPassword",
            "string",
            "8–128 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char",
          ],
        ]}
      />
      <CodeBlock language="json" filename="Response 200">
        {`{
  "success": true,
  "message": "Password changed successfully"
}`}
      </CodeBlock>
      <Callout type="info" title="Rate limited">
        <p>3 requests per 15 minutes per IP.</p>
      </Callout>

      <hr />

      {/* Refresh Token */}
      <EndpointCard method="POST" path="/auth/refresh-token" auth={false}>
        Get a new access token using the refresh token stored in the httpOnly
        cookie. Implements refresh token rotation — the old token is consumed
        and a new one is issued.
      </EndpointCard>
      <p>
        No request body needed. The <code>refreshToken</code> cookie is read
        automatically.
      </p>
      <CodeBlock language="json" filename="Response 200">
        {`{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}`}
      </CodeBlock>
      <Callout type="warning" title="Token rotation">
        <p>
          Each refresh consumes the old refresh token and issues a new one. If
          the same refresh token is used twice, all sessions for that user are
          revoked (possible token theft detected).
        </p>
      </Callout>
      <Callout type="info" title="Rate limited">
        <p>10 requests per 15 minutes per IP.</p>
      </Callout>

      <hr />

      {/* Logout */}
      <EndpointCard method="POST" path="/auth/logout" auth={true}>
        End the current session. Clears the refresh token cookie.
      </EndpointCard>
      <CodeBlock language="json" filename="Response 200">
        {`{
  "success": true,
  "message": "Logged out successfully"
}`}
      </CodeBlock>

      <hr />

      {/* Logout All */}
      <EndpointCard method="POST" path="/auth/logout-all" auth={true}>
        Revoke all sessions for the current user across all devices.
      </EndpointCard>
      <CodeBlock language="json" filename="Response 200">
        {`{
  "success": true,
  "message": "All sessions revoked"
}`}
      </CodeBlock>

      <hr />

      {/* =========================================================
          OAUTH ENDPOINTS
          ========================================================= */}
      <Heading id="oauth-endpoints" level={2}>
        OAuth Endpoints
      </Heading>

      {/* Get Auth URL */}
      <EndpointCard method="GET" path="/auth/oauth/:provider" auth={false}>
        Redirects the user to the OAuth provider&apos;s consent screen. Sets a
        CSRF state cookie. Supported providers: <code>google</code>,{" "}
        <code>github</code>, <code>facebook</code>.
      </EndpointCard>
      <CodeBlock language="bash" filename="Example">
        {`# Opens Google's OAuth consent screen
GET http://localhost:5000/auth/oauth/google`}
      </CodeBlock>

      <hr />

      {/* OAuth Callback */}
      <EndpointCard
        method="GET"
        path="/auth/oauth/callback/:provider"
        auth={false}
      >
        Handles the callback from the OAuth provider. Validates the CSRF state,
        exchanges the code for a user profile, and redirects to the frontend
        with a one-time code.
      </EndpointCard>
      <p>
        This endpoint is called by the OAuth provider, not directly by your
        frontend. It redirects to{" "}
        <code>{`{FRONTEND_URL}/auth/callback?code={oneTimeCode}`}</code>.
      </p>

      <hr />

      {/* Exchange Code */}
      <EndpointCard method="POST" path="/auth/oauth/exchange" auth={false}>
        Exchanges the one-time OAuth code for real tokens. The code is consumed
        on first use.
      </EndpointCard>
      <Table
        headers={["Field", "Type", "Rules"]}
        rows={[
          ["code", "string", "Required, one-time code from the OAuth redirect"],
        ]}
      />
      <CodeBlock language="json" filename="Response 200 — No MFA">
        {`{
  "success": true,
  "message": "OAuth login successful",
  "data": {
    "mfaRequired": false,
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}`}
      </CodeBlock>
      <CodeBlock language="json" filename="Response 200 — MFA Required">
        {`{
  "success": true,
  "message": "MFA verification required",
  "data": {
    "mfaRequired": true,
    "tempToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}`}
      </CodeBlock>

      <hr />

      {/* =========================================================
          MFA ENDPOINTS
          ========================================================= */}
      <Heading id="mfa-endpoints" level={2}>
        MFA Endpoints
      </Heading>

      {/* MFA Setup */}
      <EndpointCard method="POST" path="/auth/mfa/setup" auth={true}>
        Initiate MFA setup. Returns a TOTP secret, otpauth URI for QR code
        generation, and plaintext backup codes.
      </EndpointCard>
      <CodeBlock language="json" filename="Response 200">
        {`{
  "success": true,
  "data": {
    "secret": "JBSWY3DPEHPK3PXP",
    "uri": "otpauth://totp/AuthHero:john@example.com?secret=JBSWY3DPEHPK3PXP&issuer=AuthHero",
    "backupCodes": [
      "a1b2c3d4",
      "e5f6a7b8",
      "c9d0e1f2",
      "a3b4c5d6",
      "e7f8a9b0",
      "c1d2e3f4",
      "a5b6c7d8",
      "e9f0a1b2"
    ]
  }
}`}
      </CodeBlock>
      <Callout type="warning" title="Show backup codes once">
        <p>
          The backup codes are only returned in plaintext here and during
          regeneration. After the user confirms setup, they are stored as argon2
          hashes and cannot be retrieved. Display them clearly and tell the user
          to save them.
        </p>
      </Callout>

      <hr />

      {/* MFA Verify (Confirm Setup) */}
      <EndpointCard method="POST" path="/auth/mfa/verify" auth={true}>
        Confirm MFA setup by providing a valid TOTP code from the authenticator
        app. This permanently enables MFA on the account.
      </EndpointCard>
      <Table
        headers={["Field", "Type", "Rules"]}
        rows={[["token", "string", "Exactly 6 digits from authenticator app"]]}
      />
      <CodeBlock language="json" filename="Response 200">
        {`{
  "success": true,
  "message": "MFA enabled successfully"
}`}
      </CodeBlock>

      <hr />

      {/* MFA Challenge */}
      <EndpointCard method="POST" path="/auth/mfa/challenge" auth={false}>
        Complete the MFA challenge during login. Accepts either a 6-digit TOTP
        code or an 8-character backup code.
      </EndpointCard>
      <Table
        headers={["Field", "Type", "Rules"]}
        rows={[
          [
            "tempToken",
            "string",
            "Required, the MFA temp token from login response",
          ],
          ["code", "string", "6-digit TOTP code or 8-char backup code"],
        ]}
      />
      <CodeBlock language="json" filename="Response 200">
        {`{
  "success": true,
  "message": "MFA challenge passed",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}`}
      </CodeBlock>
      <Callout type="info" title="Backup codes are one-time use">
        <p>
          Each backup code can only be used once. After use, it is permanently
          deleted from the database.
        </p>
      </Callout>
      <Callout type="info" title="Rate limited">
        <p>
          5 requests per 5 minutes per IP. TOTP codes are only 6 digits, so rate
          limiting is critical to prevent brute-force attacks.
        </p>
      </Callout>

      <hr />

      {/* MFA Disable */}
      <EndpointCard method="POST" path="/auth/mfa/disable" auth={true}>
        Disable MFA on the account. Requires current TOTP code or backup code
        for confirmation. Deletes the TOTP secret and all backup codes.
      </EndpointCard>
      <Table
        headers={["Field", "Type", "Rules"]}
        rows={[
          [
            "code",
            "string",
            "6-digit TOTP code or 8-char backup code (6–8 chars)",
          ],
        ]}
      />
      <CodeBlock language="json" filename="Response 200">
        {`{
  "success": true,
  "message": "MFA disabled successfully"
}`}
      </CodeBlock>

      <hr />

      {/* Regenerate Backup Codes */}
      <EndpointCard
        method="POST"
        path="/auth/mfa/regenerate-backup-codes"
        auth={true}
      >
        Generate new backup codes. Requires a valid TOTP code. Replaces all
        existing backup codes.
      </EndpointCard>
      <Table
        headers={["Field", "Type", "Rules"]}
        rows={[["code", "string", "Exactly 6 digits from authenticator app"]]}
      />
      <CodeBlock language="json" filename="Response 200">
        {`{
  "success": true,
  "data": {
    "backupCodes": [
      "f1e2d3c4",
      "b5a6f7e8",
      "d9c0b1a2",
      "f3e4d5c6",
      "b7a8f9e0",
      "d1c2b3a4",
      "f5e6d7c8",
      "b9a0f1e2"
    ]
  }
}`}
      </CodeBlock>

      <hr />

      {/* =========================================================
          AUTHENTICATION HEADER
          ========================================================= */}
      <Heading id="authentication" level={2}>
        Authentication
      </Heading>
      <p>
        Endpoints marked with <Badge color="green">Requires Auth</Badge> expect
        an <code>Authorization</code> header with a Bearer token:
      </p>
      <CodeBlock language="bash">
        {`Authorization: Bearer eyJhbGciOiJIUzI1NiIs...`}
      </CodeBlock>
      <p>
        The access token is a signed JWT with a 15-minute lifetime. When it
        expires, use <code>POST /auth/refresh-token</code> to get a new one.
      </p>
      <p>
        The authentication middleware validates the JWT signature, checks that
        the session still exists in the database, and attaches{" "}
        <code>req.user</code> with <code>userId</code> and{" "}
        <code>sessionId</code>.
      </p>

      <hr />

      {/* =========================================================
          PASSWORD POLICY
          ========================================================= */}
      <Heading id="password-policy" level={2}>
        Password Policy
      </Heading>
      <p>
        All password fields (registration, reset, change) use the same
        validation rules:
      </p>
      <Table
        headers={["Rule", "Requirement"]}
        rows={[
          ["Minimum length", "8 characters"],
          ["Maximum length", "128 characters"],
          ["Uppercase", "At least 1 uppercase letter (A-Z)"],
          ["Lowercase", "At least 1 lowercase letter (a-z)"],
          ["Digit", "At least 1 number (0-9)"],
          ["Special character", "At least 1 non-alphanumeric character"],
        ]}
      />

      <hr />

      {/* =========================================================
          RATE LIMIT SUMMARY
          ========================================================= */}
      <Heading id="rate-limits" level={2}>
        Rate Limits
      </Heading>
      <p>
        All rate limits are per-IP and backed by Redis for distributed
        deployments:
      </p>
      <Table
        headers={["Endpoint", "Max Requests", "Window"]}
        rows={[
          ["POST /auth/register", "5", "10 minutes"],
          ["POST /auth/login", "10", "15 minutes"],
          ["POST /auth/verify-email", "5", "10 minutes"],
          ["POST /auth/forgot-password", "3", "15 minutes"],
          ["POST /auth/reset-password", "5", "15 minutes"],
          ["POST /auth/refresh-token", "10", "15 minutes"],
          ["POST /auth/change-password", "3", "15 minutes"],
          ["POST /auth/mfa/challenge", "5", "5 minutes"],
        ]}
      />
      <p>When a rate limit is exceeded, the server returns:</p>
      <CodeBlock language="json" filename="Response 429">
        {`{
  "success": false,
  "message": "Too many requests",
  "retryAfter": 540
}`}
      </CodeBlock>
    </>
  );
}
