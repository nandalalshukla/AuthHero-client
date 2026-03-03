import React from "react";
import CodeBlock from "@/components/docs/CodeBlock";
import {
  Heading,
  Callout,
  Table,
  Step,
  Badge,
} from "@/components/docs/DocsComponents";

export const metadata = {
  title: "MFA Guide — AuthHero Docs",
};

export default function MFAPage() {
  return (
    <>
      <Heading id="mfa" level={1}>
        Multi-Factor Authentication (MFA)
      </Heading>
      <p>
        AuthHero supports <strong>TOTP-based MFA</strong> (Time-Based One-Time
        Password) compatible with Google Authenticator, Authy, 1Password, and
        any other TOTP app. It also generates <strong>8 backup codes</strong>{" "}
        for account recovery.
      </p>

      <hr />

      <Heading id="how-it-works" level={2}>
        How It Works
      </Heading>
      <Table
        headers={["Component", "Technology"]}
        rows={[
          ["TOTP Generation", "otplib v13 (RFC 6238)"],
          [
            "Secret Storage",
            "AES-256-GCM encryption (decryptable for verification)",
          ],
          [
            "Backup Codes",
            "8 random 8-char hex codes, stored as argon2 hashes",
          ],
          ["Temp Token", "5-minute JWT signed with MFA_TEMP_TOKEN_SECRET"],
        ]}
      />

      <hr />

      {/* ============ SETUP FLOW ============ */}
      <Heading id="setup-flow" level={2}>
        MFA Setup Flow
      </Heading>

      <Step number={1} title="Initiate setup — POST /auth/mfa/setup">
        <p>
          The authenticated user calls the setup endpoint. The server generates
          a TOTP secret, encrypts it with AES-256-GCM, stores it in the{" "}
          <code>MFASecret</code> table with <code>verified: false</code>, and
          returns the raw secret + otpauth URI + 8 backup codes.
        </p>
      </Step>

      <CodeBlock language="json" filename="Response">
        {`{
  "data": {
    "secret": "JBSWY3DPEHPK3PXP",
    "uri": "otpauth://totp/AuthHero:user@email.com?secret=...&issuer=AuthHero",
    "backupCodes": ["a1b2c3d4", "e5f6a7b8", ...]
  }
}`}
      </CodeBlock>

      <Step number={2} title="Display QR code and backup codes">
        <p>
          The frontend renders the <code>uri</code> as a QR code (using any QR
          library) and displays the backup codes with a &quot;Save these
          codes&quot; prompt. The raw <code>secret</code> is shown as a copyable
          text alternative for manual entry.
        </p>
      </Step>

      <Step number={3} title="Confirm with a TOTP code — POST /auth/mfa/verify">
        <p>
          The user enters the 6-digit code from their authenticator app. The
          server decrypts the stored TOTP secret, verifies the code, and if
          valid, sets <code>verified: true</code>, <code>enabledAt: now()</code>
          , and <code>user.mfaEnabled: true</code>.
        </p>
      </Step>

      <Callout type="warning" title="Setup is not complete until verification">
        <p>
          The MFA secret is stored unverified after Step 1. If the user abandons
          setup, MFA remains disabled. Only after Step 3 succeeds is MFA
          actually enabled on the account.
        </p>
      </Callout>

      <hr />

      {/* ============ LOGIN CHALLENGE ============ */}
      <Heading id="login-challenge" level={2}>
        MFA Login Challenge
      </Heading>
      <p>
        After email/password or OAuth login succeeds for a user with MFA
        enabled:
      </p>

      <Step number={1} title="Server returns tempToken instead of session">
        <p>
          The login response has <code>mfaRequired: true</code> and a
          <code>tempToken</code> (JWT, 5-minute lifetime). No session is created
          yet.
        </p>
      </Step>

      <Step number={2} title="Frontend redirects to MFA page">
        <p>
          The <code>tempToken</code> is stored in Zustand. The user is
          redirected to <code>/mfa</code> where they enter their 6-digit code.
        </p>
      </Step>

      <Step number={3} title="Challenge endpoint — POST /auth/mfa/challenge">
        <p>
          The server decodes the <code>tempToken</code> to extract{" "}
          <code>userId</code>, decrypts the TOTP secret, verifies the code,
          creates a real session with refresh token cookie, and returns the
          access token.
        </p>
      </Step>

      <CodeBlock language="typescript" filename="Frontend challenge code">
        {`const handleMFAChallenge = async (code: string) => {
  const { data } = await api.post("/auth/mfa/challenge", {
    tempToken: mfaTempToken,
    code,
  });
  setAccessToken(data.data.accessToken);
  setMfaTempToken(null);
  router.push("/");
};`}
      </CodeBlock>

      <hr />

      {/* ============ BACKUP CODES ============ */}
      <Heading id="backup-codes" level={2}>
        Backup Codes
      </Heading>
      <p>
        Each user gets <strong>8 backup codes</strong> when setting up MFA.
        These are hex strings (8 characters each). They serve as a recovery
        mechanism when the user loses access to their authenticator app.
      </p>

      <Table
        headers={["Property", "Value"]}
        rows={[
          ["Format", "8-character hexadecimal (4 bytes)"],
          ["Count", "8 codes per user"],
          ["Storage", "Argon2 hashes in the MFASecret.backupCodes array"],
          [
            "Usage",
            "Each code can only be used ONCE, then permanently deleted",
          ],
          [
            "Accepted where",
            "POST /auth/mfa/challenge and POST /auth/mfa/disable",
          ],
        ]}
      />

      <Callout type="danger" title="Backup codes are shown only once">
        <p>
          After MFA setup or backup code regeneration, the plaintext codes are
          returned exactly once. They are stored as argon2 hashes and cannot be
          retrieved. If the user loses all backup codes and their authenticator,
          they will be locked out.
        </p>
      </Callout>

      <Heading id="regenerate-backup-codes" level={3}>
        Regenerating Backup Codes
      </Heading>
      <p>
        Users can regenerate all backup codes at{" "}
        <code>POST /auth/mfa/regenerate-backup-codes</code>. This endpoint
        requires a valid 6-digit TOTP code (not a backup code) as confirmation.
        All existing backup codes are replaced with 8 new ones.
      </p>

      <hr />

      {/* ============ DISABLING MFA ============ */}
      <Heading id="disable-mfa" level={2}>
        Disabling MFA
      </Heading>
      <p>
        An authenticated user can disable MFA via{" "}
        <code>POST /auth/mfa/disable</code> by providing a valid TOTP code or
        backup code. This:
      </p>
      <ul>
        <li>
          Deletes the <code>MFASecret</code> record
        </li>
        <li>
          Sets <code>user.mfaEnabled = false</code>
        </li>
        <li>Removes all stored backup codes</li>
      </ul>

      <hr />

      {/* ============ SECURITY DETAILS ============ */}
      <Heading id="security-details" level={2}>
        Security Details
      </Heading>

      <Heading id="totp-verification" level={3}>
        TOTP Verification
      </Heading>
      <p>
        TOTP codes are verified using <code>otplib v13</code> with default
        settings (30-second window, SHA-1, 6 digits). The library accepts the
        current code and the codes from one window before and after (±30s) to
        account for clock drift.
      </p>

      <Heading id="encryption" level={3}>
        Secret Encryption
      </Heading>
      <p>The TOTP secret is encrypted at rest using AES-256-GCM:</p>
      <CodeBlock language="typescript" filename="Encryption scheme">
        {`// Encrypt
const iv = crypto.randomBytes(12);
const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
let encrypted = cipher.update(plaintext, "utf8", "hex");
encrypted += cipher.final("hex");
const authTag = cipher.getAuthTag().toString("hex");
return iv.toString("hex") + ":" + authTag + ":" + encrypted;

// Decrypt — reverse the process
const [ivHex, authTagHex, encryptedHex] = stored.split(":");
const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
decipher.setAuthTag(authTag);
let decrypted = decipher.update(encryptedHex, "hex", "utf8");
decrypted += decipher.final("utf8");`}
      </CodeBlock>

      <Callout type="info" title="Why encrypt instead of hash?">
        <p>
          Unlike passwords (which are hashed one-way), TOTP secrets must be
          decrypted at runtime to generate/verify codes. AES-256-GCM provides
          confidentiality + integrity (the auth tag detects tampering).
        </p>
      </Callout>

      <Heading id="rate-limiting" level={3}>
        Rate Limiting
      </Heading>
      <p>
        The MFA challenge endpoint is rate-limited to{" "}
        <strong>5 requests per 5 minutes per IP</strong>. Since TOTP codes are
        only 6 digits (1 million possibilities), rate limiting is critical to
        prevent brute-force attacks.
      </p>

      <Heading id="backup-code-security" level={3}>
        Backup Code Security
      </Heading>
      <p>
        Backup codes are verified using argon2 (same algorithm as passwords)
        with timing-safe comparison. Even if an attacker gains database access,
        they cannot reverse argon2 hashes to obtain the plaintext codes. Each
        code is consumed after use (the hash is removed from the array).
      </p>
    </>
  );
}
