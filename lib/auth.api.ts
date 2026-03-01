import api from "./axios";
import type {
  RegisterResponse,
  LoginResponse,
  LoginMFAResponse,
  RefreshResponse,
} from "@/types/auth.types";
import type {
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  ChangePasswordInput,
  VerifyEmailInput,
} from "./validators/auth.schema";

// ─── Auth API functions ───
// Each function is a thin, typed wrapper around the axios instance.
// They return the *data* directly (unwrapping AxiosResponse) so consumers
// never have to deal with `response.data`.

export const authApi = {
  register: async (data: RegisterInput) => {
    const res = await api.post<RegisterResponse>("/auth/register", data);
    return res.data;
  },

  login: async (data: LoginInput) => {
    const res = await api.post<LoginResponse | LoginMFAResponse>(
      "/auth/login",
      data,
    );
    return res.data;
  },

  forgotPassword: async (data: ForgotPasswordInput) => {
    const res = await api.post<{ message: string }>(
      "/auth/forgot-password",
      data,
    );
    return res.data;
  },

  resetPassword: async (data: ResetPasswordInput) => {
    const res = await api.post<{ message: string }>(
      "/auth/reset-password",
      data,
    );
    return res.data;
  },

  verifyEmail: async (data: VerifyEmailInput) => {
    const res = await api.post<{ message: string }>("/auth/verify-email", data);
    return res.data;
  },

  changePassword: async (data: ChangePasswordInput) => {
    const res = await api.post<{ message: string }>(
      "/auth/change-password",
      data,
    );
    return res.data;
  },

  refreshToken: async () => {
    const res = await api.post<RefreshResponse>("/auth/refresh-token");
    return res.data;
  },

  logout: async () => {
    const res = await api.post<{ message: string }>("/auth/logout");
    return res.data;
  },

  logoutAll: async () => {
    const res = await api.post<{ message: string }>("/auth/logout-all");
    return res.data;
  },

  // ─── OAuth ───
  // Exchange the one-time code from the OAuth redirect for real tokens.
  // The backend consumes (deletes) the code on first use.
  exchangeOAuthCode: async (code: string) => {
    const res = await api.post<OAuthExchangeResponse>("/auth/oauth/exchange", {
      code,
    });
    return res.data;
  },
} as const;

// ─── OAuth exchange response ───
export interface OAuthExchangeResponse {
  success: boolean;
  message: string;
  data:
    | { mfaRequired: false; accessToken: string }
    | { mfaRequired: true; tempToken: string };
}
