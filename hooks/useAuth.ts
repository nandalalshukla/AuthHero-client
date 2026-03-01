import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { authApi } from "@/lib/auth.api";
import { useAuthStore } from "@/stores/auth.store";
import type { ApiErrorResponse } from "@/types/auth.types";

// ─── Helpers ───

/** Extract a human-readable message from any API error */
function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;
    return data?.message ?? error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}

// ─── Mutations ───
// Each hook wraps a single API call with loading/error/success handling.
// Pages just call `mutate(data)` — no manual try/catch needed.

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      toast.success("Account created! Check your email to verify.");
      // Optionally redirect to a "check your email" page
      router.push("/login");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useLogin() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      if (data.mfaRequired) {
        // MFA flow — redirect to MFA page with temp token
        toast.info("MFA required. Please enter your code.");
        router.push("/mfa"); // build this page when you add MFA UI
        return;
      }

      // Normal login — server sets httpOnly cookies for tokens.
      // TODO: call a /me endpoint and then _setUser(user) to populate the store.
      toast.success("Logged in successfully!");
      router.push("/");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: () => {
      toast.success("If that email exists, a reset link has been sent.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully! Please log in.");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useVerifyEmail() {
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.verifyEmail,
    onSuccess: () => {
      toast.success("Email verified! You can now log in.");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useLogout() {
  const clearUser = useAuthStore((s) => s.clearUser);
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearUser();
      toast.success("Logged out.");
      router.push("/login");
    },
    onError: (error) => {
      // Even if the API fails, clear local state
      clearUser();
      toast.error(getErrorMessage(error));
      router.push("/login");
    },
  });
}
