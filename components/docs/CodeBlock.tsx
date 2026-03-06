"use client";

import React, { useState, useRef } from "react";

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({
  children,
  language = "bash",
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="group relative my-5 overflow-hidden rounded-xl border border-white/[0.06] bg-[#111] not-prose">
      {/* Header bar */}
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            </div>
            <span className="text-zinc-500 font-mono text-[12px]">
              {filename || language}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="rounded-md px-2.5 py-1 text-zinc-500 transition-all hover:bg-white/[0.06] hover:text-zinc-300 text-[11px] font-medium uppercase tracking-wider"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}

      {/* Code content */}
      <pre
        ref={codeRef}
        className="overflow-x-auto p-4 text-[13px] leading-relaxed text-zinc-300"
      >
        <code>{children.trim()}</code>
      </pre>

      {/* Hover copy button when no header */}
      {!filename && !language && (
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 rounded-md bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-zinc-500 opacity-0 transition-all group-hover:opacity-100 hover:text-zinc-300"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      )}
    </div>
  );
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[13px] font-medium text-[#3ECF8E]">
      {children}
    </code>
  );
}
