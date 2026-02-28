import { useContext, useEffect } from "react";
import { ModalContext } from "../contexts/ModelContext";
import { MdCancel } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import axios from "axios";

function Signup() {

  return (
    <>
      {showSignup && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={openSignup}
          ></div>
          <div className="flex flex-col justify-center items-center rounded-2xl border-2 border-gray-900 bg-gray-400 h-135 max-w-100 w-[90vw] mx-auto px-2 py-4 fixed inset-30 bg-opacity-50 z-[999] ">
            <button
              className=" cursor-pointer hover:opacity-60 absolute right-2 top-2"
              onClick={openSignup}
            >
              <MdCancel className="text-3xl" />
            </button>
            <h1 className="text-black text-center mb-5 text-4xl font-semibold">
              Signup
            </h1>
            <div className="w-[95%]">
              <label htmlFor="fullname" className="block mb-1 text-left">
                Fullname:
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={fullName}
                placeholder="Enter your fullname"
                className="bg-white p-2 w-[100%] rounded-md border-2 mb-2 outline-none shadow-gray-500 shadow-2xl"
                onChange={(e) => {
                  takeFullname(e);
                  takeUserDetails(fullName, email, password);
                }}
              />
              <label htmlFor="email" className="block mb-1 text-left">
                Email:
              </label>
              <input
                type="text"
                id="signup-email"
                name="email"
                value={email}
                placeholder="Enter your email"
                className="bg-white p-2 w-[100%] rounded-md border-2 mb-2 outline-none shadow-gray-500 shadow-2xl"
                onChange={(e) => {
                  takeEmail(e);
                  takeUserDetails(fullName, email, password);
                }}
              />
              <label htmlFor="password" className="block mb-1 text-left">
                Password:
              </label>
              <div className="relative flex w-full">
                <input
                  id="signup-password"
                  type={showPwd ? "password" : "text"}
                  name="password"
                  value={password}
                  placeholder="Enter your password"
                  className="bg-white p-2 w-[100%] rounded-md border-2 mb-2 outline-none shadow-gray-500 shadow-2xl"
                  onChange={(e) => {
                    takePassword(e);
                    const newPassword = e.target.value;
                    takeUserDetails(fullName, email, newPassword);
                  }}
                />
                {showPwd ? (
                  <IoEye
                    onClick={togglePasswordVisibility}
                    className="text-2xl absolute right-2 top-2 hover:opacity-65 "
                  />
                ) : (
                  <IoMdEyeOff
                    onClick={togglePasswordVisibility}
                    className="text-2xl absolute right-2 top-2 hover:opacity-65"
                  />
                )}
              </div>
              <button
                type="submit"
                className="cursor-pointer w-[100%] hover:bg-gray-600 rounded-2xl text-2xl bg-gray-400 border-2 border-gray-900 mt-4 p-1 mb-2"
                onClick={() => {
                  takeUserDetails();
                  submitUserDetails();
                }}
              >
                Signup
              </button>
            </div>
            <hr className="border-t-2 border-gray-900 my-4 w-[97%] mx-auto" />
            <h3 className="text-center text-1xl font-bold mb-3">
              Or Signup with
            </h3>
            <div className="flex flex-row justify-center gap-3 items-center w-[100%]">
              <button
                type="submit"
                className="cursor-pointer w-[40%] hover:bg-gray-600 rounded-2xl text-2xl bg-gray-400 border-2 border-gray-900 p-2"
              >
                Google
              </button>
              <button
                type="submit"
                className="cursor-pointer w-[40%] hover:bg-gray-600 rounded-2xl text-2xl bg-gray-400 border-2 border-gray-900 p-2"
              >
                Github
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Signup;
