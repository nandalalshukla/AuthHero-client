"use client";

import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import Link from "next/link";
import { loginSchema, type LoginInput } from "@/lib/validators/auth.schema";
import {
  useZodForm,
  FormField,
  SubmitButton,
} from "@/components/forms/FormField";
import { SocialButtons } from "@/components/forms/SocialButtons";
import { useLogin } from "@/hooks/useAuth";

export default function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm<LoginInput>(loginSchema);

  const loginMutation = useLogin();

  const onSubmit = (data: LoginInput) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-y-auto pt-24 pb-10">
      <div className="flex flex-col justify-center items-center rounded-3xl border border-white/20 bg-white/0 backdrop-blur-3xl shadow-2xl h-fit max-w-sm w-[90vw] mx-auto px-6 py-8 text-white relative my-auto">
        <h1 className="text-white text-center mb-6 text-2xl font-semibold tracking-wide drop-shadow-lg">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full" noValidate>
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            register={register}
            error={errors.email?.message}
          />

          <FormField
            label="Password"
            name="password"
            type={showPwd ? "text" : "password"}
            placeholder="Enter your password"
            register={register}
            error={errors.password?.message}
            rightElement={
              showPwd ? (
                <IoEye onClick={() => setShowPwd(false)} className="text-xl" />
              ) : (
                <IoMdEyeOff
                  onClick={() => setShowPwd(true)}
                  className="text-xl"
                />
              )
            }
          />

          <div className="flex justify-end mb-4">
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              Forgot password?
            </Link>
          </div>

          <SubmitButton
            label="Login"
            loadingLabel="Signing in..."
            isLoading={loginMutation.isPending}
          />
        </form>

        <div className="flex items-center w-full my-6">
          <div className="grow h-px bg-white/20"></div>
          <span className="px-3 text-sm text-gray-300 font-medium">
            Or continue with
          </span>
          <div className="grow h-px bg-white/20"></div>
        </div>

        <SocialButtons />

        <div className="mt-6 text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-white hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
