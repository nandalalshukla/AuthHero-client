"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useModalStore } from "../stores/modalStore";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const { openLogin, openSignup } = useModalStore();
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav className="fixed left-0 top-0 w-full z-10 bg-gray-900 border-b border-gray-700 ease-in-out duration-300">
      <div className="max-w-[1240px] m-auto flex justify-between items-center p-4 text-white">
        <Link href="/">
          <h1 className="text-3xl font-bold #00df9a cursor-pointer">
            AuthHero
          </h1>
        </Link>
        <ul className="hidden sm:flex items-center gap-4">
          <li className="p-4 hover:text-gray-400 cursor-pointer">
            <Link href="/">Home</Link>
          </li>
          <li>
            <button
              onClick={openLogin}
              className="px-5 py-2 rounded-full border border-white hover:bg-white hover:text-black transition duration-300"
            >
              Login
            </button>
          </li>
          <li>
            <button
              onClick={openSignup}
              className="px-5 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition duration-300"
            >
              Signup
            </button>
          </li>
        </ul>

        {/* Mobile Button */}
        <div
          onClick={handleNav}
          className="block sm:hidden z-10 cursor-pointer"
        >
          {nav ? (
            <AiOutlineClose size={20} className="text-white" />
          ) : (
            <AiOutlineMenu size={20} className="text-white" />
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
              : "absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
          }
        >
          <ul>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/">Home</Link>
            </li>
            <li onClick={handleNav} className="p-4 text-4xl">
              <button
                onClick={openLogin}
                className="hover:text-gray-500 w-full"
              >
                Login
              </button>
            </li>
            <li onClick={handleNav} className="p-4 text-4xl">
              <button
                onClick={openSignup}
                className="hover:text-gray-500 w-full"
              >
                Signup
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
