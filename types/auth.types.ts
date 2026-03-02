// ─── Types mirrored from authhero-server/src/modules/auth/auth.types.ts ───
// Keep these in sync with the server. If the server changes, update here.

export interface PublicUser {
  id: string;
  fullname: string;
  email: string;
  emailVerified: boolean;
  mfaEnabled: boolean;
  createdAt: string;
}

export interface RegisterResponse {
  user: PublicUser;
  verificationToken: string;
}

export interface LoginResponse {
  mfaRequired: false;
  accessToken: string;
}

export interface LoginMFAResponse {
  mfaRequired: true;
  tempToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface ApiSuccessResponse {
  success: boolean;
  message: string;
}
