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
    <div className="group relative my-4 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-950 dark:border-zinc-800">
      {/* Header bar */}
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-2 text-xs">
          <span className="text-zinc-400">{filename || language}</span>
          <button
            onClick={handleCopy}
            className="rounded px-2 py-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}

      {/* Code content */}
      <pre
        ref={codeRef}
        className="overflow-x-auto p-4 text-sm leading-relaxed text-zinc-100"
      >
        <code>{children.trim()}</code>
      </pre>

      {/* Hover copy button when no header */}
      {!filename && !language && (
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-zinc-200"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      )}
    </div>
  );
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
      {children}
    </code>
  );
}
