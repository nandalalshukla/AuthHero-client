"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose, AiFillGithub } from "react-icons/ai";
import { SiNpm } from "react-icons/si";
import { useAuthStore } from "@/stores/auth.store";
import { useLogout } from "@/hooks/useAuth";
import ProfileDropdown from "@/components/ProfileDropdown";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const { mutate: logout } = useLogout();
  const pathname = usePathname();

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav className="fixed left-0 top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4 lg:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🔐</span>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
              AuthHero
            </h1>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            <li>
              <Link 
                href="/docs" 
                className={`transition-colors ${pathname?.startsWith('/docs') ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'}`}
              >
                Docs
              </Link>
            </li>
            <li>
              <Link 
                href="/docs/api-reference" 
                className={`transition-colors ${pathname === '/docs/api-reference' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'}`}
              >
                API
              </Link>
            </li>
          </ul>
        </div>

        {/* Right side Desktop */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
            <a href="https://github.com/nandalalshukla/authhero" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              <AiFillGithub size={22} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://www.npmjs.com/package/@nandalalshukla/auth-hero" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              <SiNpm size={20} />
              <span className="sr-only">npm</span>
            </a>
          </div>

          <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-800" /> {/* Divider */}

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-600 dark:text-zinc-300">Hi, {user?.fullname?.split(" ")[0]}</span>
              <ProfileDropdown />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium px-4 py-2 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 transition-colors"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Button */}
        <div onClick={handleNav} className="block md:hidden z-10 cursor-pointer text-zinc-900 dark:text-white">
          {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute top-0 left-0 w-full h-screen bg-white dark:bg-zinc-950 flex flex-col pt-20 px-6 ease-in-out duration-300 md:hidden ${
            nav ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ul className="flex flex-col gap-6 text-lg font-medium text-zinc-900 dark:text-white">
            <li><Link href="/" onClick={handleNav}>Home</Link></li>
            <li><Link href="/docs" onClick={handleNav}>Documentation</Link></li>
            <li><Link href="/docs/api-reference" onClick={handleNav}>API Reference</Link></li>
            
            <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800 my-2" />
            
            {isAuthenticated ? (
              <>
                <li className="text-zinc-500 dark:text-zinc-400 text-sm font-normal uppercase tracking-wider">Account</li>
                <li><Link href="/settings" onClick={handleNav}>Settings</Link></li>
                <li><button onClick={() => { handleNav(); logout(); }} className="text-red-500 hover:text-red-600">Log out</button></li>
              </>
            ) : (
              <>
                <li><Link href="/login" onClick={handleNav}>Log in</Link></li>
                <li><Link href="/register" onClick={handleNav} className="text-blue-600 dark:text-blue-400">Sign up</Link></li>
              </>
            )}
            
            <div className="flex items-center gap-6 mt-4 text-zinc-500 dark:text-zinc-400">
              <a href="https://github.com/nandalalshukla/authhero" target="_blank" rel="noopener noreferrer">
                <AiFillGithub size={28} />
              </a>
              <a href="https://www.npmjs.com/package/@nandalalshukla/auth-hero" target="_blank" rel="noopener noreferrer">
                <SiNpm size={26} />
              </a>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
