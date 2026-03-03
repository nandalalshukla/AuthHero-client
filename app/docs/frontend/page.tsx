import React from "react";
import CodeBlock from "@/components/docs/CodeBlock";
import { Heading, Callout, Table } from "@/components/docs/DocsComponents";

export const metadata = {
  title: "Frontend Integration — AuthHero Docs",
};

export default function FrontendPage() {
  return (
    <>
      <Heading id="frontend" level={1}>
        Frontend Integration
      </Heading>
      <p>
        The reference frontend (<code>authhero-client</code>) is built with{" "}
        <strong>Next.js 16</strong> (App Router), React 19, TypeScript, Zustand,
        TanStack Query, and Tailwind CSS. This guide explains the architecture
        and how to use or replicate it.
      </p>

      <hr />

      <Heading id="tech-stack" level={2}>
        Frontend Tech Stack
      </Heading>
      <Table
        headers={["Library", "Purpose"]}
        rows={[
          [
            "Next.js 16 (App Router)",
            "Framework with server/client components",
          ],
          ["React 19", "UI rendering"],
          ["TypeScript", "Type safety"],
          [
            "Zustand (persisted)",
            "Client-side auth state (accessToken, user, mfaTempToken)",
          ],
          [
            "TanStack Query",
            "Server state management (mutations for auth ops)",
          ],
          ["Axios", "HTTP client with 401 refresh interceptor"],
          ["react-hook-form + Zod", "Form state + client-side validation"],
          ["sonner", "Toast notifications"],
          ["react-icons", "Icon library"],
          ["Tailwind CSS v4", "Styling"],
        ]}
      />

      <hr />

      {/* ============ ZUSTAND STORE ============ */}
      <Heading id="auth-store" level={2}>
        Auth Store (Zustand)
      </Heading>
      <p>
        The auth store holds <strong>only client-side state</strong>. Server
        data flows through TanStack Query mutations — the store is updated as a
        side-effect of those mutations succeeding.
      </p>
      <CodeBlock language="typescript" filename="stores/auth.store.ts">
        {`interface AuthState {
  user: PublicUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  mfaTempToken: string | null;    // short-lived MFA challenge token
}

interface AuthActions {
  setUser: (user: PublicUser) => void;
  setToken: (token: string) => void;
  setMFATempToken: (token: string) => void;
  clearMFATempToken: () => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      mfaTempToken: null,

      setUser: (user) => set({ user, isAuthenticated: true }),
      setToken: (accessToken) => set({ accessToken }),
      setMFATempToken: (mfaTempToken) => set({ mfaTempToken }),
      clearMFATempToken: () => set({ mfaTempToken: null }),
      clearAuth: () => set({
        user: null, accessToken: null,
        isAuthenticated: false, mfaTempToken: null,
      }),
    }),
    { name: "auth-storage" },  // persisted to localStorage
  ),
);`}
      </CodeBlock>
      <Callout type="info" title="Why persist?">
        <p>
          The store is persisted to <code>localStorage</code> so the user stays
          logged in across page reloads. On refresh, the access token may have
          expired, but the Axios interceptor will automatically refresh it using
          the httpOnly cookie.
        </p>
      </Callout>

      <hr />

      {/* ============ AXIOS INTERCEPTOR ============ */}
      <Heading id="axios-interceptor" level={2}>
        Axios Interceptor (Auto-Refresh)
      </Heading>
      <p>The Axios instance has two interceptors:</p>
      <ul>
        <li>
          <strong>Request interceptor</strong> — Attaches the{" "}
          <code>Authorization: Bearer</code> header from the Zustand store
        </li>
        <li>
          <strong>Response interceptor</strong> — On 401, automatically
          refreshes the token and retries the original request
        </li>
      </ul>
      <CodeBlock language="typescript" filename="lib/axios.ts">
        {`// Request: attach token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

// Response: auto-refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401
        && !originalRequest._retry
        && !originalRequest.url?.includes("/auth/refresh-token")) {
      originalRequest._retry = true;

      // Deduplicate concurrent refresh calls
      if (!refreshPromise) {
        refreshPromise = refreshClient
          .post("/auth/refresh-token")
          .finally(() => { refreshPromise = null; });
      }

      const response = await refreshPromise;
      const newToken = response.data?.data?.accessToken;
      if (newToken) useAuthStore.getState().setToken(newToken);

      return api(originalRequest); // retry with new token
    }

    return Promise.reject(error);
  },
);`}
      </CodeBlock>
      <Callout type="warning" title="Separate refresh client">
        <p>
          The refresh request uses a separate Axios instance (
          <code>refreshClient</code>) with no interceptors. This prevents
          infinite loops when the refresh token itself is invalid.
        </p>
      </Callout>

      <hr />

      {/* ============ MUTATION HOOKS ============ */}
      <Heading id="mutation-hooks" level={2}>
        TanStack Query Mutation Hooks
      </Heading>
      <p>
        Every auth operation is wrapped in a custom hook. Pages just call{" "}
        <code>mutate(data)</code> — no manual try/catch needed:
      </p>
      <Table
        headers={["Hook", "API Call", "Side Effects"]}
        rows={[
          [
            "useRegister()",
            "POST /auth/register",
            "Toast success, redirect to /verify-email",
          ],
          [
            "useLogin()",
            "POST /auth/login",
            "Handle normal login or MFA challenge",
          ],
          ["useVerifyEmail()", "POST /auth/verify-email", "Toast success"],
          [
            "useForgotPassword()",
            "POST /auth/forgot-password",
            "Toast success",
          ],
          [
            "useResetPassword()",
            "POST /auth/reset-password",
            "Toast success, redirect to /login",
          ],
          [
            "useLogout()",
            "POST /auth/logout",
            "Clear auth, redirect to /login",
          ],
          [
            "useLogoutAll()",
            "POST /auth/logout-all",
            "Clear auth, redirect to /login",
          ],
          [
            "useChangePassword()",
            "POST /auth/change-password",
            "Toast success",
          ],
          ["useMFASetup()", "POST /auth/mfa/setup", "Return setup data"],
          [
            "useMFAVerify()",
            "POST /auth/mfa/verify",
            "Toast, refresh user profile",
          ],
          [
            "useMFADisable()",
            "POST /auth/mfa/disable",
            "Toast, refresh user profile",
          ],
          [
            "useMFAChallenge()",
            "POST /auth/mfa/challenge",
            "Login + redirect to /",
          ],
          [
            "useMFARegenerateBackupCodes()",
            "POST /auth/mfa/regenerate-backup-codes",
            "Toast success",
          ],
        ]}
      />

      <Heading id="login-hook-example" level={3}>
        Login Hook (MFA-Aware)
      </Heading>
      <CodeBlock language="typescript" filename="hooks/useAuth.ts">
        {`export function useLogin() {
  const router = useRouter();
  const { setUser, setToken, setMFATempToken } = useAuthStore();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data) => {
      if (data.mfaRequired) {
        // MFA flow: store temp token, redirect to challenge page
        setMFATempToken(data.tempToken);
        toast.info("MFA verification required.");
        router.push("/mfa");
        return;
      }

      // Normal flow: save token, fetch profile, redirect
      await handleLoginSuccess(data.accessToken, setToken, setUser);
      toast.success("Logged in successfully!");
      router.push("/");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}`}
      </CodeBlock>

      <hr />

      {/* ============ PAGE EXAMPLES ============ */}
      <Heading id="page-examples" level={2}>
        Page Examples
      </Heading>

      <Heading id="login-page" level={3}>
        Login Page
      </Heading>
      <CodeBlock language="tsx" filename="app/login/page.tsx">
        {`"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/lib/validators/auth.schema";
import { useLogin } from "@/hooks/useAuth";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const login = useLogin();

  return (
    <form onSubmit={handleSubmit((data) => login.mutate(data))}>
      <input {...register("email")} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register("password")} type="password" placeholder="Password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" disabled={login.isPending}>
        {login.isPending ? "Signing in..." : "Sign in"}
      </button>

      {/* OAuth buttons */}
      <button onClick={() => window.location.href = \`\${API_URL}/auth/oauth/google\`}>
        Sign in with Google
      </button>
    </form>
  );
}`}
      </CodeBlock>

      <Heading id="protected-page" level={3}>
        Protected Page Pattern
      </Heading>
      <CodeBlock language="tsx" filename="Protecting a page">
        {`"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SettingsPage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  return <div>Welcome, {user.fullname}!</div>;
}`}
      </CodeBlock>

      <hr />

      {/* ============ API CLIENT ============ */}
      <Heading id="api-client" level={2}>
        API Client Layer
      </Heading>
      <p>
        The <code>lib/auth.api.ts</code> file provides typed API methods that
        the mutation hooks call:
      </p>
      <CodeBlock language="typescript" filename="lib/auth.api.ts">
        {`export const authApi = {
  register: async (data: RegisterInput) => {
    const res = await api.post("/auth/register", data);
    return res.data;
  },

  login: async (data: LoginInput) => {
    const res = await api.post<{ data: LoginResponse }>("/auth/login", data);
    return res.data.data;
  },

  getMe: async (): Promise<PublicUser> => {
    const res = await api.get("/auth/me");
    return res.data.data;
  },

  exchangeOAuthCode: async (code: string) => {
    const res = await api.post("/auth/oauth/exchange", { code });
    return res.data.data;
  },

  mfaChallenge: async (data: { tempToken: string; code: string }) => {
    const res = await api.post("/auth/mfa/challenge", data);
    return res.data.data;
  },

  // ... logout, forgotPassword, resetPassword, changePassword,
  //     mfaSetup, mfaVerify, mfaDisable, mfaRegenerateBackupCodes
};`}
      </CodeBlock>

      <hr />

      {/* ============ ENVIRONMENT VARIABLES ============ */}
      <Heading id="frontend-env" level={2}>
        Frontend Environment Variables
      </Heading>
      <Table
        headers={["Variable", "Example", "Description"]}
        rows={[
          [
            "NEXT_PUBLIC_BACKEND_URL",
            "http://localhost:5000",
            "Backend API base URL (used by Axios)",
          ],
        ]}
      />
      <CodeBlock language="bash" filename=".env.local">
        {`NEXT_PUBLIC_BACKEND_URL=http://localhost:5000`}
      </CodeBlock>

      <hr />

      <Heading id="oauth-callback" level={2}>
        OAuth Callback Page
      </Heading>
      <p>
        The <code>/auth/callback</code> page handles the OAuth redirect:
      </p>
      <CodeBlock language="tsx" filename="app/auth/callback/page.tsx">
        {`"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useOAuthExchange } from "@/hooks/useAuth";
import { useEffect, useRef } from "react";

export default function AuthCallback() {
  const searchParams = useSearchParams();
  const exchange = useOAuthExchange();
  const called = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      toast.error(decodeURIComponent(error));
      router.push("/login");
      return;
    }

    if (code && !called.current) {
      called.current = true;
      exchange.mutate(code);
    }
  }, [searchParams]);

  return <div>Completing login...</div>;
}`}
      </CodeBlock>
      <Callout type="info" title="One-time exchange">
        <p>
          The <code>called</code> ref prevents double-execution in React Strict
          Mode. The one-time code from the URL is consumed by the backend on
          first use — a second call would fail.
        </p>
      </Callout>
    </>
  );
}
