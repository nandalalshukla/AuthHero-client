"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
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
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Docs top nav */}
      <header className="fixed top-0 z-20 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 lg:hidden dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <AiOutlineMenu size={20} />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-zinc-900 dark:text-white"
          >
            <span className="text-blue-600">🔐</span>
            AuthHero
          </Link>

          {/* Nav links */}
          <nav className="ml-auto flex items-center gap-6 text-sm">
            <Link
              href="/docs"
              className="font-medium text-zinc-900 dark:text-white"
            >
              Docs
            </Link>
            <Link
              href="/docs/api-reference"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              API
            </Link>
            <a
              href="https://github.com/nandalalshukla/authhero"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@nandalalshukla/auth-hero"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              npm
            </a>
          </nav>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex pt-16">
        <DocsSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        {/* Content */}
        <main className="min-w-0 flex-1 px-6 py-10 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <article className="prose-docs">{children}</article>
          </div>
        </main>
      </div>
    </div>
  );
}
