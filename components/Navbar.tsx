"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose, AiFillGithub } from "react-icons/ai";
import { useAuthStore } from "@/stores/auth.store";
import { useLogout } from "@/hooks/useAuth";
import ProfileDropdown from "@/components/ProfileDropdown";
import { usePathname } from "next/navigation";

function Logo() {
  return (
    <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#3ECF8E]/20 to-[#3ECF8E]/5 border border-[#3ECF8E]/30 shadow-[0_0_15px_rgba(62,207,142,0.15)]">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
          fill="url(#nav-grad-new)"
          fillOpacity="0.4"
          stroke="#4EEEA0"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 22C6.84 20.74 3 15.55 3 13V7l9-5 9 5v6c0 2.55-3.84 7.74-9 9z"
          stroke="url(#outline-grad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="11" r="3" fill="#3ECF8E" />
        <defs>
          <linearGradient
            id="nav-grad-new"
            x1="3"
            y1="2"
            x2="21"
            y2="24"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3ECF8E" />
            <stop offset="1" stopColor="#1E5C3F" />
          </linearGradient>
          <linearGradient id="outline-grad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4EEEA0" />
            <stop offset="1" stopColor="#4EEEA0" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const { mutate: logout } = useLogout();
  const pathname = usePathname();

  const handleNav = () => setNav(!nav);

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
    <nav className="fixed left-0 top-0 w-full z-50 border-b border-white/[0.08] bg-[#111111]/70 backdrop-blur-2xl transition-colors duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        {/* Left: Logo + nav links */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-3 group outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E] rounded-sm"
          >
            <Logo />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400 tracking-tight">
              AuthHero
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm px-3 py-1.5 rounded-md transition-all duration-200 ${
                    link.match(pathname)
                      ? "text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: GitHub + Auth */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/nandalalshukla/authhero"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-md"
          >
            <AiFillGithub size={18} />
          </a>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                href="/settings"
                className="text-sm font-medium px-4 py-1.5 rounded-md border border-[#3ECF8E] text-[#3ECF8E] hover:bg-[#3ECF8E]/10 transition-all"
              >
                Dashboard
              </Link>
              <ProfileDropdown />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm text-zinc-400 hover:text-white transition-colors px-3 py-1.5"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium px-4 py-1.5 rounded-md border border-[#3ECF8E] text-[#3ECF8E] hover:bg-[#3ECF8E]/10 transition-all"
              >
                Start your project
              </Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={handleNav}
          className="block md:hidden z-10 text-white p-2 hover:bg-white/[0.06] rounded-lg transition-colors"
        >
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute top-0 left-0 w-full h-screen bg-[#1C1C1C] flex flex-col pt-20 px-6 ease-in-out duration-300 md:hidden border-r border-white/[0.06] ${
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
                  className={`block px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                    pathname === link.href
                      ? "text-[#3ECF8E] bg-[#3ECF8E]/10"
                      : "text-zinc-300 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <div className="h-px w-full bg-white/[0.06] my-3" />

            {isAuthenticated ? (
              <>
                <li className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Account
                </li>
                <li>
                  <Link
                    href="/settings"
                    onClick={handleNav}
                    className="block px-4 py-3 rounded-lg text-[15px] font-medium text-zinc-300 hover:text-white hover:bg-white/[0.04] transition-colors"
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
                    className="w-full text-left px-4 py-3 rounded-lg text-[15px] font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
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
                    className="block px-4 py-3 rounded-lg text-[15px] font-medium text-zinc-300 hover:text-white hover:bg-white/[0.04] transition-colors"
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    onClick={handleNav}
                    className="block px-4 py-3 rounded-lg text-[15px] font-medium text-[#3ECF8E] hover:bg-[#3ECF8E]/10 transition-colors"
                  >
                    Start your project
                  </Link>
                </li>
              </>
            )}

            <div className="flex items-center gap-4 mt-6 px-4">
              <a
                href="https://github.com/nandalalshukla/authhero"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <AiFillGithub size={22} />
              </a>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
