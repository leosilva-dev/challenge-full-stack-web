/**
 * router/index.ts
 *
 */

import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import { useAuthStore } from '@/stores/auth'
import { AuthService } from '@/services/authService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (!authStore.user && AuthService.isAuthenticated()) {
    await authStore.initialize()
  }

  const publicRoutes = ['/login', '/registro']
  const isPublicRoute = publicRoutes.includes(to.path)

  if (!authStore.isAuthenticated && !isPublicRoute) {
    next('/login')
    return
  }

  if (authStore.isAuthenticated && isPublicRoute) {
    next('/')
    return
  }

  next()
})

router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
