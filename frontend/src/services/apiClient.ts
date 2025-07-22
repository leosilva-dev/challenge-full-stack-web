import type { ApiError } from '@/types/global.types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL!

export class ApiClient {
  private baseURL: string

  constructor(baseURL?: string) {
    this.baseURL = baseURL || API_BASE_URL
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const headers: Record<string, string> = {}
    if (options.body) {
      headers['Content-Type'] = 'application/json'
    }

    const token = localStorage.getItem('auth-token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const defaultOptions: RequestInit = {
      headers: {
        ...headers,
        ...options.headers
      }
    }

    const config = { ...defaultOptions, ...options }

    try {
      const response = await fetch(url, config)

      const data: T = await response.json()

      if (!response.ok) {
        if (typeof data === 'object' && data !== null && 'message' in data && 'success' in data) {
          throw new Error((data as any).message)
        }
        if (typeof data === 'object' && data !== null && 'error' in data) {
          throw new Error((data as ApiError).error)
        }
        throw new Error(`HTTP Error: ${response.status}`)
      }

      return data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Error in API request')
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const apiClient = new ApiClient()
