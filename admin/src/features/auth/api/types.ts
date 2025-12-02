import type { AdminUser, AuthApiResponse } from '@/types'

export interface LoginPayload {
  email: string
  password: string
}

export type AuthUser = AdminUser

export type LoginResponse = AuthApiResponse<AuthUser>

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  token: string
  password: string
}


