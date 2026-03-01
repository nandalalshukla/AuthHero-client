"use client";

import React from "react";
import Link from "next/link";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/validators/auth.schema";
import {
  useZodForm,
  FormField,
  SubmitButton,
} from "@/components/forms/FormField";
import { useForgotPassword } from "@/hooks/useAuth";

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm<ForgotPasswordInput>(forgotPasswordSchema);

  const forgotMutation = useForgotPassword();

  const onSubmit = (data: ForgotPasswordInput) => {
    forgotMutation.mutate(data);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col justify-center items-center rounded-3xl border border-white/20 bg-white/0 backdrop-blur-3xl shadow-2xl h-fit max-w-sm w-[90vw] mx-auto px-6 py-8 text-white relative">
        <h1 className="text-white text-center mb-2 text-2xl font-semibold tracking-wide drop-shadow-lg">
          Reset Password
        </h1>
        <p className="text-center text-gray-300 mb-6 text-sm">
          Enter your email and we&apos;ll send you a link to reset your
          password.
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

          <SubmitButton
            label="Send Reset Link"
            loadingLabel="Sending..."
            isLoading={forgotMutation.isPending}
          />
        </form>

        <div className="mt-6 text-sm text-gray-400">
          <Link href="/login" className="text-white hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
