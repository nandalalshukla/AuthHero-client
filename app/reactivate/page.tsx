"use client";

import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import Link from "next/link";
import {
  reactivateAccountSchema,
  type ReactivateAccountInput,
} from "@/lib/validators/auth.schema";
import {
  useZodForm,
  FormField,
  SubmitButton,
} from "@/components/forms/FormField";
import { useReactivateAccount } from "@/hooks/useAuth";

// ─── Reactivate Account Page ───
// Allows a previously deactivated user to restore their account.
// After reactivation, the user is redirected to login normally.

export default function ReactivatePage() {
  const [showPwd, setShowPwd] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm<ReactivateAccountInput>(reactivateAccountSchema);

  const mutation = useReactivateAccount();

  const onSubmit = (data: ReactivateAccountInput) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-y-auto pt-24 pb-10">
      <div className="flex flex-col justify-center items-center rounded-3xl border border-white/20 bg-white/0 backdrop-blur-3xl shadow-2xl h-fit max-w-sm w-[90vw] mx-auto px-6 py-8 text-white relative my-auto">
        <h1 className="text-white text-center mb-2 text-2xl font-semibold tracking-wide drop-shadow-lg">
          Reactivate Account
        </h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Enter your credentials to restore your deactivated account.
        </p>

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

          <SubmitButton
            label="Reactivate Account"
            loadingLabel="Reactivating..."
            isLoading={mutation.isPending}
          />
        </form>

        <div className="mt-6 text-sm text-gray-400">
          Remember your account is active?{" "}
          <Link href="/login" className="text-white hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
