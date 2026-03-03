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
  title: "OAuth Setup — AuthHero Docs",
};

export default function OAuthPage() {
  return (
    <>
      <Heading id="oauth" level={1}>
        OAuth Setup
      </Heading>
      <p>
        AuthHero supports <Badge color="blue">Google</Badge>{" "}
        <Badge color="zinc">GitHub</Badge> <Badge color="blue">Facebook</Badge>{" "}
        OAuth providers out of the box. Each follows the same architecture: a
        Strategy Pattern with a common interface, so adding new providers is
        trivial.
      </p>

      <hr />

      <Heading id="how-oauth-works" level={2}>
        How OAuth Works in AuthHero
      </Heading>
      <p>AuthHero implements a secure OAuth flow with these key properties:</p>
      <ul>
        <li>
          <strong>CSRF protection</strong> — Random state parameter stored in an
          httpOnly cookie and validated on callback
        </li>
        <li>
          <strong>No tokens in URLs</strong> — Session tokens are stored in
          Redis behind a one-time code; only the opaque code appears in the
          redirect URL
        </li>
        <li>
          <strong>Automatic account linking</strong> — If a user with the same
          email already exists, the OAuth account is linked (in a transaction)
        </li>
        <li>
          <strong>MFA-compatible</strong> — If the OAuth user has MFA enabled,
          they&apos;re redirected through the MFA challenge before getting
          tokens
        </li>
      </ul>

      <hr />

      {/* ============ GOOGLE ============ */}
      <Heading id="google" level={2}>
        Google OAuth Setup
      </Heading>

      <Step number={1} title="Create a Google Cloud project">
        <p>
          Go to{" "}
          <a
            href="https://console.cloud.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            console.cloud.google.com
          </a>{" "}
          and create a new project (or use an existing one).
        </p>
      </Step>

      <Step number={2} title="Enable the Google+ API">
        <p>
          Navigate to <strong>APIs &amp; Services → Library</strong> and enable
          the <strong>Google+ API</strong> (or the Google People API).
        </p>
      </Step>

      <Step number={3} title="Configure the OAuth consent screen">
        <p>
          Go to <strong>APIs &amp; Services → OAuth consent screen</strong>. Set
          the user type to <em>External</em>. Fill in the app name and support
          email. Add the scopes: <code>openid</code>, <code>email</code>,{" "}
          <code>profile</code>.
        </p>
      </Step>

      <Step number={4} title="Create OAuth credentials">
        <p>
          Go to{" "}
          <strong>
            APIs &amp; Services → Credentials → Create Credentials → OAuth
            client ID
          </strong>
          . Select <em>Web application</em>.
        </p>
        <p>Add the authorized redirect URI:</p>
      </Step>

      <CodeBlock language="text">
        {`http://localhost:5000/auth/oauth/callback/google`}
      </CodeBlock>

      <Step number={5} title="Copy credentials to .env">
        <p>Copy the Client ID and Client Secret:</p>
      </Step>

      <CodeBlock language="bash" filename=".env">
        {`GOOGLE_CLIENT_ID=123456789-abc.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxx
GOOGLE_REDIRECT_URI=http://localhost:5000/auth/oauth/callback/google`}
      </CodeBlock>

      <hr />

      {/* ============ GITHUB ============ */}
      <Heading id="github" level={2}>
        GitHub OAuth Setup
      </Heading>

      <Step number={1} title="Create a GitHub OAuth App">
        <p>
          Go to{" "}
          <a
            href="https://github.com/settings/developers"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/settings/developers
          </a>{" "}
          → <strong>OAuth Apps</strong> → <strong>New OAuth App</strong>.
        </p>
      </Step>

      <Step number={2} title="Fill in the app details">
        <p>
          Set the <strong>Homepage URL</strong> to your app URL and the{" "}
          <strong>Authorization callback URL</strong> to:
        </p>
      </Step>

      <CodeBlock language="text">
        {`http://localhost:5000/auth/oauth/callback/github`}
      </CodeBlock>

      <Step number={3} title="Generate a client secret">
        <p>
          After creating the app, click{" "}
          <strong>Generate a new client secret</strong>.
        </p>
      </Step>

      <Step number={4} title="Copy credentials to .env">
        <p></p>
      </Step>

      <CodeBlock language="bash" filename=".env">
        {`GITHUB_CLIENT_ID=Ov23li...
GITHUB_CLIENT_SECRET=abc123...
GITHUB_REDIRECT_URI=http://localhost:5000/auth/oauth/callback/github`}
      </CodeBlock>

      <Callout type="info" title="GitHub email scope">
        <p>
          AuthHero requests the <code>user:email</code> scope and makes a
          separate API call to <code>/user/emails</code> because GitHub
          doesn&apos;t always include the email in the profile response (it can
          be private). AuthHero picks the primary verified email.
        </p>
      </Callout>

      <hr />

      {/* ============ FACEBOOK ============ */}
      <Heading id="facebook" level={2}>
        Facebook OAuth Setup
      </Heading>

      <Step number={1} title="Create a Facebook App">
        <p>
          Go to{" "}
          <a
            href="https://developers.facebook.com/apps/"
            target="_blank"
            rel="noopener noreferrer"
          >
            developers.facebook.com/apps
          </a>{" "}
          → <strong>Create App</strong> → select <em>Consumer</em> type.
        </p>
      </Step>

      <Step number={2} title="Add Facebook Login product">
        <p>
          In the app dashboard, click <strong>Add Product</strong> and select{" "}
          <strong>Facebook Login</strong>. Set the{" "}
          <strong>Valid OAuth Redirect URIs</strong>:
        </p>
      </Step>

      <CodeBlock language="text">
        {`http://localhost:5000/auth/oauth/callback/facebook`}
      </CodeBlock>

      <Step number={3} title="Copy credentials to .env">
        <p>
          Find the App ID and App Secret in <strong>Settings → Basic</strong>:
        </p>
      </Step>

      <CodeBlock language="bash" filename=".env">
        {`FACEBOOK_CLIENT_ID=123456789012345
FACEBOOK_CLIENT_SECRET=abc123def456...
FACEBOOK_REDIRECT_URI=http://localhost:5000/auth/oauth/callback/facebook`}
      </CodeBlock>

      <Callout type="warning" title="Facebook requires HTTPS in production">
        <p>
          Facebook Login requires HTTPS redirect URIs in production. Localhost
          is only allowed during development.
        </p>
      </Callout>

      <hr />

      {/* ============ USING OAUTH ============ */}
      <Heading id="using-oauth" level={2}>
        Using OAuth in the Frontend
      </Heading>
      <p>Trigger the OAuth flow by redirecting the user to the backend:</p>
      <CodeBlock language="typescript" filename="Frontend">
        {`// Open the OAuth consent screen
window.location.href = "http://localhost:5000/auth/oauth/google";

// Or dynamically:
const handleOAuth = (provider: "google" | "github" | "facebook") => {
  window.location.href = \`\${API_URL}/auth/oauth/\${provider}\`;
};`}
      </CodeBlock>
      <p>
        After the OAuth provider redirects back, the user lands at{" "}
        <code>/auth/callback?code=...</code> in the frontend. The callback page
        extracts the one-time code and exchanges it:
      </p>
      <CodeBlock language="typescript" filename="app/auth/callback/page.tsx">
        {`const code = searchParams.get("code");

const { data } = await api.post("/auth/oauth/exchange", { code });

if (data.data.mfaRequired) {
  // Store temp token and redirect to MFA challenge
  setMfaTempToken(data.data.tempToken);
  router.push("/mfa");
} else {
  // Store access token and redirect to app
  setAccessToken(data.data.accessToken);
  router.push("/");
}`}
      </CodeBlock>

      <hr />

      {/* ============ ADDING PROVIDERS ============ */}
      <Heading id="adding-providers" level={2}>
        Adding a New Provider
      </Heading>
      <p>
        AuthHero uses the Strategy Pattern, so adding a new provider only
        requires implementing the <code>OAuthProvider</code> interface:
      </p>
      <CodeBlock
        language="typescript"
        filename="src/modules/auth/oauth/oauth.types.ts"
      >
        {`interface OAuthProvider {
  getAuthUrl(state: string): string;
  getAccessToken(code: string): Promise<string>;
  getUserProfile(accessToken: string): Promise<OAuthUserProfile>;
}`}
      </CodeBlock>
      <p>Then register the provider in the service map:</p>
      <CodeBlock language="typescript" filename="Example: Adding Twitter">
        {`// 1. Create src/modules/auth/oauth/providers/twitter.provider.ts
export class TwitterProvider implements OAuthProvider {
  getAuthUrl(state: string) { /* ... */ }
  async getAccessToken(code: string) { /* ... */ }
  async getUserProfile(accessToken: string) { /* ... */ }
}

// 2. Add to the service map in oauth.service.ts
const providers = {
  google: new GoogleProvider(),
  github: new GithubProvider(),
  facebook: new FacebookProvider(),
  twitter: new TwitterProvider(), // ← new
};

// 3. Update SupportedProvider type
type SupportedProvider = "google" | "github" | "facebook" | "twitter";

// 4. Add env vars: TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET, TWITTER_REDIRECT_URI`}
      </CodeBlock>

      <hr />

      <Heading id="env-summary" level={2}>
        Environment Variables Summary
      </Heading>
      <Table
        headers={["Provider", "Variables Needed"]}
        rows={[
          [
            "Google",
            "GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI",
          ],
          [
            "GitHub",
            "GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_REDIRECT_URI",
          ],
          [
            "Facebook",
            "FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, FACEBOOK_REDIRECT_URI",
          ],
        ]}
      />
      <p>
        All OAuth variables are optional. If not set, the corresponding provider
        returns a clear error:
      </p>
      <CodeBlock language="json">
        {`{
  "success": false,
  "message": "OAuth provider \\"twitter\\" is not configured. Check your environment variables."
}`}
      </CodeBlock>
    </>
  );
}
