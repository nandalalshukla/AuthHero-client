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
    <div className="bg-[#1C1C1C] pt-16">
      <div className="flex w-full mx-auto 2xl:max-w-[90rem]">
        {/* Mobile menu toggle */}
        <div className="lg:hidden fixed top-16 left-0 right-0 z-20 border-b border-white/[0.06] bg-[#1C1C1C]/90 backdrop-blur-xl px-4 py-3">
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
            <article className="prose prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-[#3ECF8E] hover:prose-a:text-[#4EEEA0] prose-a:no-underline hover:prose-a:underline prose-code:text-[#3ECF8E] prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-[13px] prose-code:font-medium prose-pre:bg-[#111] prose-pre:border prose-pre:border-white/[0.06] prose-strong:text-white prose-p:text-zinc-400 prose-li:text-zinc-400 prose-headings:text-white prose-hr:border-white/[0.06] prose-blockquote:border-[#3ECF8E]/30 prose-blockquote:text-zinc-400 prose-td:text-zinc-400 prose-th:text-zinc-300">
              {children}
            </article>
          </div>
        </main>
      </div>
    </div>
  );
}
