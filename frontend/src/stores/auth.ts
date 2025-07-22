import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { AuthService } from '@/services/authService'
import type { User, LoginRequest, RegisterRequest } from '@/types/auth.types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'ADMIN')
  const userName = computed(() => user.value?.name ?? '')

  async function login(credentials: LoginRequest): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const authData = await AuthService.login(credentials)

      AuthService.setToken(authData.token)

      user.value = authData.user
    } catch (err: any) {
      error.value = err.message || 'Erro ao fazer login'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function register(userData: RegisterRequest): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const authData = await AuthService.register(userData)

      AuthService.setToken(authData.token)

      user.value = authData.user
    } catch (err: any) {
      error.value = err.message || 'Erro ao registrar usuário'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout(): Promise<void> {
    await AuthService.logout()
    user.value = null
    error.value = null
  }

  async function fetchUser(): Promise<void> {
    if (!AuthService.isAuthenticated()) {
      return
    }

    loading.value = true
    error.value = null

    try {
      const userData = await AuthService.me()
      user.value = userData
    } catch (err: any) {
      await logout()
      error.value = err.message || 'Erro ao buscar dados do usuário'
    } finally {
      loading.value = false
    }
  }

  function clearError(): void {
    error.value = null
  }

  async function initialize(): Promise<void> {
    if (AuthService.isAuthenticated()) {
      await fetchUser()
    }
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    userName,
    login,
    register,
    logout,
    fetchUser,
    clearError,
    initialize
  }
})
