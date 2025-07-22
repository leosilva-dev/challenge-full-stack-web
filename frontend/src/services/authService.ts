import { apiClient } from './apiClient'
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ApiResponse,
  User
} from '@/types/auth.types'

export class AuthService {
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials)
    return response.data!
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', userData)
    return response.data!
  }

  static async me(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me')
    return response.data!
  }

  static async logout(): Promise<void> {
    localStorage.removeItem('auth-token')
  }

  static getToken(): string | null {
    return localStorage.getItem('auth-token')
  }

  static setToken(token: string): void {
    localStorage.setItem('auth-token', token)
  }

  static removeToken(): void {
    localStorage.removeItem('auth-token')
  }

  static isAuthenticated(): boolean {
    const token = this.getToken()
    if (!token) return false

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp * 1000 > Date.now()
    } catch {
      return false
    }
  }
}
