"use client";

import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import {
  changePasswordSchema,
  type ChangePasswordInput,
} from "@/lib/validators/auth.schema";
import {
  useZodForm,
  FormField,
  SubmitButton,
} from "@/components/forms/FormField";
import { useChangePassword } from "@/hooks/useAuth";

// ─── ChangePasswordForm ───
// Renders an inline form for changing the user's password.
// Uses the same FormField / useZodForm pattern as login/register pages.

export default function ChangePasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useZodForm<ChangePasswordInput>(changePasswordSchema);

  const mutation = useChangePassword();

  const onSubmit = (data: ChangePasswordInput) => {
    mutation.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1" noValidate>
      <FormField
        label="Current Password"
        name="currentPassword"
        type={showCurrent ? "text" : "password"}
        placeholder="Enter current password"
        register={register}
        error={errors.currentPassword?.message}
        rightElement={
          showCurrent ? (
            <IoEye onClick={() => setShowCurrent(false)} className="text-xl" />
          ) : (
            <IoMdEyeOff
              onClick={() => setShowCurrent(true)}
              className="text-xl"
            />
          )
        }
      />

      <FormField
        label="New Password"
        name="newPassword"
        type={showNew ? "text" : "password"}
        placeholder="Enter new password"
        register={register}
        error={errors.newPassword?.message}
        rightElement={
          showNew ? (
            <IoEye onClick={() => setShowNew(false)} className="text-xl" />
          ) : (
            <IoMdEyeOff onClick={() => setShowNew(true)} className="text-xl" />
          )
        }
      />

      <SubmitButton
        label="Change Password"
        loadingLabel="Changing..."
        isLoading={mutation.isPending}
      />
    </form>
  );
}
