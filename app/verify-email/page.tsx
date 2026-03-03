"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useVerifyEmail } from "@/hooks/useAuth";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const verifyMutation = useVerifyEmail();

  // Prevent double-fire in React StrictMode
  const hasRun = useRef(false);

  useEffect(() => {
    if (token && !hasRun.current) {
      hasRun.current = true;
      verifyMutation.mutate({ token });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // ─── No token in URL ───
  if (!token) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="flex flex-col items-center rounded-3xl border border-white/20 backdrop-blur-3xl shadow-2xl max-w-sm w-[90vw] mx-auto px-6 py-10 text-white">
          <div className="text-5xl mb-4">📧</div>
          <h1 className="text-2xl font-semibold mb-3">Check your email</h1>
          <p className="text-gray-300 text-center text-sm mb-6">
            We&apos;ve sent a verification link to your email address. Click the
            link to verify your account.
          </p>
          <Link
            href="/login"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  // ─── Verifying ───
  if (verifyMutation.isPending) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="flex flex-col items-center rounded-3xl border border-white/20 backdrop-blur-3xl shadow-2xl max-w-sm w-[90vw] mx-auto px-6 py-10 text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Verifying...</h1>
          <p className="text-gray-300 text-sm">
            Please wait while we verify your email.
          </p>
        </div>
      </div>
    );
  }

  // ─── Error ───
  if (verifyMutation.isError) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="flex flex-col items-center rounded-3xl border border-white/20 backdrop-blur-3xl shadow-2xl max-w-sm w-[90vw] mx-auto px-6 py-10 text-white">
          <div className="text-5xl mb-4">❌</div>
          <h1 className="text-2xl font-semibold mb-3">Verification Failed</h1>
          <p className="text-gray-300 text-center text-sm mb-6">
            The link may have expired or is invalid. Please try registering
            again or request a new verification email.
          </p>
          <Link
            href="/register"
            className="px-6 py-2 rounded-xl border border-white/20 hover:bg-white/10 text-white font-medium transition-all duration-200"
          >
            Back to Register
          </Link>
        </div>
      </div>
    );
  }

  // ─── Success ───
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center rounded-3xl border border-white/20 backdrop-blur-3xl shadow-2xl max-w-sm w-[90vw] mx-auto px-6 py-10 text-white">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-semibold mb-3">Email Verified!</h1>
        <p className="text-gray-300 text-center text-sm mb-6">
          Your email has been verified successfully. You can now log in.
        </p>
        <Link
          href="/login"
          className="px-6 py-2 rounded-xl border border-white/20 hover:bg-white/10 text-white font-medium transition-all duration-200"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
