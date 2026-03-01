"use client";

import  { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import Link from "next/link";
import {
  registerSchema,
  type RegisterInput,
} from "@/lib/validators/auth.schema";
import {
  useZodForm,
  FormField,
  SubmitButton,
} from "@/components/forms/FormField";
import { useRegister } from "@/hooks/useAuth";

export default function RegisterPage() {
  const [showPwd, setShowPwd] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm<RegisterInput>(registerSchema);

  const registerMutation = useRegister();

  const onSubmit = (data: RegisterInput) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-y-auto pt-24 pb-10">
      <div className="flex flex-col justify-center items-center rounded-3xl border border-white/20 bg-white/0 backdrop-blur-3xl shadow-2xl h-fit max-w-sm w-[90vw] mx-auto px-4 py-6 text-white relative my-auto">
        <h1 className="text-white text-center mb-6 text-2xl font-semibold tracking-wide drop-shadow-lg">
          Signup
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full" noValidate>
          <FormField
            label="Fullname"
            name="fullname"
            type="text"
            placeholder="Enter your fullname"
            register={register}
            error={errors.fullname?.message}
          />

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

          <SubmitButton
            label="Signup"
            loadingLabel="Creating account..."
            isLoading={registerMutation.isPending}
          />
        </form>

        <div className="flex items-center w-full my-6">
          <div className="grow h-px bg-white/20"></div>
          <span className="px-3 text-sm text-gray-300 font-medium">
            Or continue with
          </span>
          <div className="grow h-px bg-white/20"></div>
        </div>

        <div className="flex flex-row justify-center gap-4 w-full">
          <button
            type="button"
            className="flex-1 py-2 rounded-xl bg-transparent border border-white/20 hover:bg-white/10 text-white font-medium transition-all duration-200 backdrop-blur-sm"
          >
            Google
          </button>
          <button
            type="button"
            className="flex-1 py-2 rounded-xl bg-transparent border border-white/20 hover:bg-white/10 text-white font-medium transition-all duration-200 backdrop-blur-sm"
          >
            Github
          </button>
        </div>
        <div className="mt-6 text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
