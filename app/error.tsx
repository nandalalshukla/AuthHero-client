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
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1C1C1C]">
      <div className="flex flex-col items-center rounded-xl border border-white/[0.06] bg-[#232323] max-w-sm w-[90vw] mx-auto px-8 py-10 text-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 mb-5">
          <span className="text-2xl">⚠️</span>
        </div>
        <h1 className="text-xl font-semibold text-white mb-2">
          Something went wrong
        </h1>
        <p className="text-zinc-400 text-sm mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-lg bg-[#3ECF8E] text-[#1C1C1C] text-sm font-semibold hover:bg-[#4EEEA0] transition-all cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
