"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  title: string;
  href: string;
}

interface SidebarSection {
  heading: string;
  items: SidebarItem[];
}

const sections: SidebarSection[] = [
  {
    heading: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Quick Start", href: "/docs/getting-started" },
      { title: "Configuration", href: "/docs/configuration" },
      { title: "Database Schema", href: "/docs/database" },
    ],
  },
  {
    heading: "Core Concepts",
    items: [
      { title: "Architecture", href: "/docs/architecture" },
      { title: "Authentication Flows", href: "/docs/authentication-flows" },
      { title: "API Reference", href: "/docs/api-reference" },
      { title: "Error Handling", href: "/docs/error-handling" },
    ],
  },
  {
    heading: "Features",
    items: [
      { title: "OAuth (Social Login)", href: "/docs/oauth" },
      { title: "MFA (TOTP)", href: "/docs/mfa" },
      { title: "Session Management", href: "/docs/sessions" },
    ],
  },
  {
    heading: "Advanced",
    items: [
      { title: "Security Deep Dive", href: "/docs/security" },
      { title: "Frontend Integration", href: "/docs/frontend" },
      { title: "Source Code Reference", href: "/docs/source-code" },
      { title: "Deployment", href: "/docs/deployment" },
    ],
  },
];

export default function DocsSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-72 border-r border-zinc-200 bg-white pt-16 transition-transform duration-200 dark:border-zinc-800 dark:bg-zinc-950 lg:sticky lg:top-16 lg:z-0 lg:h-[calc(100vh-4rem)] lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="h-full overflow-y-auto px-4 py-6 text-sm">
          {sections.map((section) => (
            <div key={section.heading} className="mb-6">
              <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {section.heading}
              </h4>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block rounded-md px-3 py-2 transition-colors ${
                          isActive
                            ? "bg-blue-50 font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                            : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
