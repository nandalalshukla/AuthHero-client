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
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
        fill="url(#nav-grad)"
        fillOpacity="0.15"
        stroke="#3ECF8E"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <rect
        x="9.5"
        y="10"
        width="5"
        height="4.5"
        rx="0.75"
        stroke="#3ECF8E"
        strokeWidth="1.25"
        fill="none"
      />
      <path
        d="M10.25 10V8.5a1.75 1.75 0 013.5 0V10"
        stroke="#4EEEA0"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="nav-grad"
          x1="3"
          y1="2"
          x2="21"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3ECF8E" />
          <stop offset="1" stopColor="#287050" />
        </linearGradient>
      </defs>
    </svg>
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
    <nav className="fixed left-0 top-0 w-full z-50 border-b border-white/[0.06] bg-[#1C1C1C]/80 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        {/* Left: Logo + nav links */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-[#3ECF8E] rounded-sm"
          >
            <Logo />
            <span className="text-base font-semibold text-white tracking-tight">
              authhero
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
