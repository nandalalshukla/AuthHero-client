import { z } from "zod";

// ─── Reusable password schema (mirrors server's passwordSchema exactly) ───
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be at most 128 characters")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[0-9]/, "Must contain at least one digit")
  .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character");

// ─── Register ───
export const registerSchema = z.object({
  fullname: z.string().min(1, "Full name is required").trim(),
  email: z.string().email("Invalid email format").toLowerCase().trim(),
  password: passwordSchema,
});
export type RegisterInput = z.infer<typeof registerSchema>;

// ─── Login ───
export const loginSchema = z.object({
  email: z.string().email("Invalid email format").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
});
export type LoginInput = z.infer<typeof loginSchema>;

// ─── Forgot Password ───
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format").toLowerCase().trim(),
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

// ─── Reset Password ───
export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  newPassword: passwordSchema,
});
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

// ─── Change Password (authenticated) ───
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: passwordSchema,
});
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

// ─── Verify Email ───
export const verifyEmailSchema = z.object({
  token: z.string().min(1, "Token is required"),
});
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

// ─── Deactivate Account ───
export const deactivateAccountSchema = z.object({
  password: z.string().min(1, "Password is required to confirm deactivation"),
});
export type DeactivateAccountInput = z.infer<typeof deactivateAccountSchema>;

// ─── Delete Account ───
export const deleteAccountSchema = z.object({
  password: z.string().min(1, "Password is required to confirm deletion"),
  confirmation: z.literal("DELETE MY ACCOUNT", {
    message: 'You must type "DELETE MY ACCOUNT" to confirm',
  }),
});
export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>;

// ─── Reactivate Account ───
export const reactivateAccountSchema = z.object({
  email: z.string().email("Invalid email format").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
});
export type ReactivateAccountInput = z.infer<typeof reactivateAccountSchema>;
