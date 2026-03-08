"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiBook,
  FiZap,
  FiSettings,
  FiDatabase,
  FiLayers,
  FiGitBranch,
  FiCode,
  FiAlertCircle,
  FiGlobe,
  FiShield,
  FiRefreshCw,
  FiLock,
  FiMonitor,
  FiServer,
} from "react-icons/fi";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarSection {
  heading: string;
  items: SidebarItem[];
}

const sections: SidebarSection[] = [
  {
    heading: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs", icon: FiBook },
      { title: "Quick Start", href: "/docs/getting-started", icon: FiZap },
      {
        title: "Configuration",
        href: "/docs/configuration",
        icon: FiSettings,
      },
      { title: "Database Schema", href: "/docs/database", icon: FiDatabase },
    ],
  },
  {
    heading: "Core Concepts",
    items: [
      { title: "Architecture", href: "/docs/architecture", icon: FiLayers },
      {
        title: "Auth Flows",
        href: "/docs/authentication-flows",
        icon: FiGitBranch,
      },
      { title: "API Reference", href: "/docs/api-reference", icon: FiCode },
      {
        title: "Error Handling",
        href: "/docs/error-handling",
        icon: FiAlertCircle,
      },
    ],
  },
  {
    heading: "Features",
    items: [
      { title: "OAuth (Social Login)", href: "/docs/oauth", icon: FiGlobe },
      { title: "MFA (TOTP)", href: "/docs/mfa", icon: FiShield },
      {
        title: "Session Management",
        href: "/docs/sessions",
        icon: FiRefreshCw,
      },
    ],
  },
  {
    heading: "Advanced",
    items: [
      { title: "Security Deep Dive", href: "/docs/security", icon: FiLock },
      {
        title: "Frontend Integration",
        href: "/docs/frontend",
        icon: FiMonitor,
      },
      { title: "Deployment", href: "/docs/deployment", icon: FiServer },
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
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-72 lg:w-60 border-r border-white/[0.06] bg-[#111111]/95 backdrop-blur-xl lg:bg-transparent transition-transform duration-200 lg:sticky lg:top-16 lg:z-0 lg:h-[calc(100vh-4rem)] lg:self-start lg:translate-x-0 pt-16 lg:pt-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile header */}
        <div className="flex lg:hidden items-center justify-between p-4 border-b border-white/[0.06] bg-transparent absolute top-0 w-full h-16">
          <span className="text-sm font-semibold text-white">
            Documentation
          </span>
          <button
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="h-full overflow-y-auto px-3 py-5 lg:pt-6 mt-16 lg:mt-0 pb-20">
          {sections.map((section) => (
            <div key={section.heading} className="mb-5">
              <h4 className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                {section.heading}
              </h4>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-150 ${
                          isActive
                            ? "text-[#3ECF8E] bg-[#3ECF8E]/10 border border-[#3ECF8E]/20"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] border border-transparent"
                        }`}
                      >
                        <Icon
                          className={`w-3.5 h-3.5 shrink-0 ${
                            isActive ? "text-[#3ECF8E]" : "text-zinc-500"
                          }`}
                        />
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
