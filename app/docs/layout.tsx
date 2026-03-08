"use client";

import React, { useState, useCallback } from "react";
import DocsSidebar from "@/components/docs/DocsSidebar";
import { AiOutlineMenu } from "react-icons/ai";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] pt-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[#3ECF8E]/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-[20%] right-[-10%] h-[400px] w-[400px] rounded-full bg-[#3ECF8E]/5 blur-[100px]" />
      <div className="relative z-10 flex w-full mx-auto 2xl:max-w-[90rem]">
        {/* Mobile menu toggle */}
        <div className="lg:hidden fixed top-16 left-0 right-0 z-20 border-b border-white/[0.06] bg-[#111111]/80 backdrop-blur-xl px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors px-3 py-1.5 -ml-3 rounded-lg hover:bg-white/[0.04]"
          >
            <AiOutlineMenu size={16} />
            Menu
          </button>
        </div>

        <DocsSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        {/* Content */}
        <main className="min-w-0 flex-1 px-4 sm:px-8 py-12 lg:pl-12 lg:pr-10 lg:pt-12 pt-24">
          <div className="mx-auto max-w-3xl">
            <article className="rounded-2xl border border-white/[0.08] bg-[#111111]/40 px-6 sm:px-10 py-10 shadow-[0_0_40px_rgba(0,0,0,0.2)] backdrop-blur-xl prose prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-[#3ECF8E] hover:prose-a:text-[#4EEEA0] prose-a:no-underline hover:prose-a:underline prose-code:text-[#3ECF8E] prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[13px] prose-code:font-medium prose-pre:bg-[#111] prose-pre:border prose-pre:border-white/[0.06] prose-strong:text-white prose-p:text-zinc-400 prose-li:text-zinc-400 prose-headings:text-white prose-hr:border-white/[0.08] prose-blockquote:border-[#3ECF8E]/40 prose-blockquote:bg-[#3ECF8E]/5 prose-blockquote:py-1 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:text-zinc-300 prose-td:text-zinc-400 prose-th:text-zinc-300">
              {children}
            </article>
          </div>
        </main>
      </div>
    </div>
  );
}
