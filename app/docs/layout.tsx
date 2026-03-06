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
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-16">
      {/* Main layout */}
      <div className="flex max-w-7xl mx-auto">
        {/* Mobile menu toggle (visible only on lg down, positioned just above the content or as a floating button? Actually let's put it in a small sub-nav for mobile docs) */}
        <div className="lg:hidden sticky top-16 z-20 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            <AiOutlineMenu size={18} />
            Documentation Menu
          </button>
        </div>

        <DocsSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        {/* Content */}
        <main className="min-w-0 flex-1 px-6 py-10 lg:pl-10 lg:pr-6">
          <div className="mx-auto max-w-3xl">
            <article className="prose-docs">{children}</article>
          </div>
        </main>
      </div>
    </div>
  );
}
