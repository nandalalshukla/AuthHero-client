"use client";
import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useModalStore } from "../../stores/modalStore";
import axios from "axios";

function Login() {
  const { showLogin, closeLogin } = useModalStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const takeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const takePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPwd(!showPwd);
  };

  const submitUserDetails = async () => {
    try {
      console.log("Submitting:", { email, password });
      // const response = await axios.post("/api/login", { email, password });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (!showLogin) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[998]"
        onClick={closeLogin}
      ></div>
      <div className="flex flex-col justify-center items-center rounded-2xl border-2 border-gray-900 bg-gray-800 h-115 max-w-100 w-[90vw] mx-auto px-2 py-4 fixed inset-0 m-auto z-[999]">
        <button
          className=" cursor-pointer hover:opacity-60 absolute right-2 top-2"
          onClick={closeLogin}
        >
          <MdCancel className="text-3xl" />
        </button>

        <h1 className="text-black text-center mb-5 text-4xl font-semibold">
          Login
        </h1>
        <div className="w-[95%]">
          <label htmlFor="login-email" className="block mb-1 text-left">
            Email:
          </label>
          <input
            type="text"
            id="login-email"
            name="email"
            value={email}
            onChange={(e) => {
              takeEmail(e);
            }}
            placeholder="Enter your email"
            className="bg-white p-2 w-[100%] rounded-md border-2 mb-2 outline-none shadow-gray-500 shadow-2xl"
          />
          <label htmlFor="login-password" className="block mb-1 text-left">
            Password:
          </label>

          <div className="relative flex w-full items-center justify-center">
            <input
              id="login-password"
              type={showPwd ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => {
                takePassword(e);
              }}
              placeholder="Enter your password"
              className="bg-white p-2 w-[100%] rounded-md border-2 mb-2 outline-none shadow-gray-500 shadow-2xl"
            />
            {showPwd ? (
              <IoEye
                onClick={togglePasswordVisibility}
                className="text-2xl absolute right-2 top-2 hover:opacity-65 cursor-pointer"
              />
            ) : (
              <IoMdEyeOff
                onClick={togglePasswordVisibility}
                className="text-2xl absolute right-2 top-2 hover:opacity-65 cursor-pointer"
              />
            )}
          </div>
          <button
            type="submit"
            className="cursor-pointer w-[100%] hover:bg-gray-600 rounded-2xl text-2xl bg-gray-400 border-2 border-gray-900 mt-4 p-1 mb-2"
            onClick={() => {
              submitUserDetails();
            }}
          >
            Login
          </button>
        </div>
        <hr className="border-t-2 border-gray-900 my-4 w-[97%] mx-auto" />
        <h3 className="text-center text-1xl font-bold mb-3">Or login with</h3>
        <div className="flex flex-row justify-center gap-3 items-center w-[100%]">
          <button
            type="button"
            className="cursor-pointer w-[40%] hover:bg-gray-600 rounded-2xl text-2xl bg-gray-400 border-2 border-gray-900 p-2"
          >
            Google
          </button>
          <button
            type="button"
            className="cursor-pointer w-[40%] hover:bg-gray-600 rounded-2xl text-2xl bg-gray-400 border-2 border-gray-900 p-2"
          >
            Github
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
