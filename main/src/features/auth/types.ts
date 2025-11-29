export interface User {
  id: string
  email: string
  username: string
  role?: string
  subscription_plan?: string
  profile_pic?: string | null
  first_name?: string
  last_name?: string
  status?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  username: string
  email: string
  password: string
  subscription_plan?: string
}

export interface LoginResponse {
  success: boolean
  message?: string
  token: string
  refreshToken?: string
  data: {
    id: string
    email: string
    username: string
  }
}

export interface RegisterResponse {
  success: boolean
  message: string
  user: {
    id: string
    username: string
    email: string
    subscription_plan: string
  }
}

export interface TokenValidationResponse {
  isValid: boolean
  user: {
    id: string
    email: string
    username: string
    first_name?: string
    last_name?: string
    role: string
    status?: string
  }
}
