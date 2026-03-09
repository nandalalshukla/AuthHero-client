"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose, AiFillGithub } from "react-icons/ai";
import { FiArrowUpRight } from "react-icons/fi";
import { useAuthStore } from "@/stores/auth.store";
import { useLogout } from "@/hooks/useAuth";
import ProfileDropdown from "@/components/ProfileDropdown";
import { usePathname } from "next/navigation";

function Logo() {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-cyan-200/30 bg-[#0c1933] shadow-[0_0_24px_rgba(34,211,238,0.22)]">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-cyan-300/25 via-sky-300/15 to-transparent" />
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative shrink-0"
      >
        <path
          d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
          fill="url(#nav-shield-fill)"
          fillOpacity="0.5"
          stroke="url(#nav-shield-stroke)"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 12h7"
          stroke="#dbeafe"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M12 8.8v6.5"
          stroke="#dbeafe"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="1.8" fill="#67e8f9" />
        <defs>
          <linearGradient
            id="nav-shield-fill"
            x1="3"
            y1="2"
            x2="21"
            y2="24"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#22d3ee" />
            <stop offset="1" stopColor="#0f766e" />
          </linearGradient>
          <linearGradient
            id="nav-shield-stroke"
            x1="12"
            y1="2"
            x2="12"
            y2="22"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#a5f3fc" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0.25" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { mutate: logout } = useLogout();
  const pathname = usePathname();

  const handleNav = () => setNav((prev) => !prev);

  const navLinks = [
    {
      href: "/docs",
      label: "Docs",
      match: (p: string) =>
        p?.startsWith("/docs") && p !== "/docs/api-reference",
    },
    {
      href: "/docs/api-reference",
      label: "API Reference",
      match: (p: string) => p === "/docs/api-reference",
    },
  ];

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-cyan-100/10 bg-[#081127]/72 backdrop-blur-2xl shadow-[0_10px_40px_rgba(2,8,23,0.5)]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-cyan-200/35 to-transparent" />

      <div className="mx-auto flex h-18 max-w-350 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <Logo />
            <div>
              <span className="block bg-linear-to-r from-white via-slate-100 to-cyan-100 bg-clip-text text-lg font-semibold tracking-tight text-transparent sm:text-xl">
                AuthHero
              </span>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 sm:block">
                Secure Auth Toolkit
              </span>
            </div>
            <span className="hidden rounded-full border border-cyan-200/25 bg-cyan-300/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-cyan-100/85 lg:inline-block">
              OSS
            </span>
          </Link>

          <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`inline-flex rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                    link.match(pathname)
                      ? "bg-cyan-300/15 text-cyan-100"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="https://github.com/nandalalshukla/authhero"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-slate-300 transition-colors hover:text-white"
            aria-label="AuthHero GitHub"
          >
            <AiFillGithub size={18} />
          </a>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                href="/settings"
                className="inline-flex items-center rounded-xl border border-cyan-200/35 px-4 py-2 text-sm font-semibold text-cyan-100 transition-colors hover:bg-cyan-300/10"
              >
                Dashboard
              </Link>
              <ProfileDropdown />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="inline-flex rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-200/45 bg-linear-to-r from-cyan-300 to-sky-300 px-4 py-2 text-sm font-semibold text-slate-950 transition-transform hover:scale-[1.02]"
              >
                Start Project
                <FiArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>

        <button
          onClick={handleNav}
          className="z-10 block rounded-xl border border-white/10 bg-white/5 p-2 text-white transition-colors hover:bg-white/10 md:hidden"
          aria-label="Toggle mobile menu"
        >
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </button>

        <div
          className={`absolute left-0 top-18 h-[calc(100vh-72px)] w-full border-t border-white/10 bg-[#081127]/95 px-6 pb-8 pt-6 backdrop-blur-2xl ease-in-out duration-300 md:hidden ${
            nav ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ul className="flex flex-col gap-1">
            {[
              { href: "/", label: "Home" },
              { href: "/docs", label: "Documentation" },
              { href: "/docs/api-reference", label: "API Reference" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={handleNav}
                  className={`block rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                    (link.href === "/docs" && pathname.startsWith("/docs")) ||
                    pathname === link.href
                      ? "bg-cyan-300/12 text-cyan-100"
                      : "text-slate-200 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <div className="my-4 h-px w-full bg-white/10" />

            {isAuthenticated ? (
              <>
                <li className="px-4 py-1 text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
                  Account
                </li>
                <li>
                  <Link
                    href="/settings"
                    onClick={handleNav}
                    className="block rounded-xl px-4 py-3 text-[15px] font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleNav();
                      logout();
                    }}
                    className="w-full rounded-xl px-4 py-3 text-left text-[15px] font-medium text-rose-300 transition-colors hover:bg-rose-300/10 hover:text-rose-200"
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    onClick={handleNav}
                    className="block rounded-xl px-4 py-3 text-[15px] font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    onClick={handleNav}
                    className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-linear-to-r from-cyan-300 to-sky-300 px-4 py-3 text-[15px] font-semibold text-slate-950 transition-transform hover:scale-[1.01]"
                  >
                    Start Project
                  </Link>
                </li>
              </>
            )}

            <div className="mt-6 flex items-center gap-4 px-4">
              <a
                href="https://github.com/nandalalshukla/authhero"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
              >
                <AiFillGithub size={22} />
                <span className="text-sm">GitHub</span>
              </a>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
