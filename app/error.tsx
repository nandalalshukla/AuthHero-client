"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center rounded-3xl border border-white/20 backdrop-blur-3xl shadow-2xl max-w-sm w-[90vw] mx-auto px-6 py-10 text-white">
        <div className="text-5xl mb-4">⚠️</div>
        <h1 className="text-2xl font-semibold mb-3">Something went wrong</h1>
        <p className="text-gray-300 text-center text-sm mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 rounded-xl border border-white/20 hover:bg-white/10 text-white font-medium transition-all duration-200 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
