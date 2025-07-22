import { ref } from 'vue'

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  timeout?: number
}

const notifications = ref<Notification[]>([])
const notificationCounter = ref(0)

const getSnackbarColor = (type: string) => {
  switch (type) {
    case 'success':
      return 'success-subtle'
    case 'error':
      return 'error-subtle'
    case 'warning':
      return 'warning-subtle'
    case 'info':
      return 'info-subtle'
    default:
      return 'surface'
  }
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success':
      return 'mdi-check-circle'
    case 'error':
      return 'mdi-alert-circle'
    case 'warning':
      return 'mdi-alert'
    case 'info':
      return 'mdi-information'
    default:
      return 'mdi-bell'
  }
}

export function useNotification() {
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = `notification-${++notificationCounter.value}`
    const newNotification: Notification = {
      id,
      timeout: 5000, //  5 segundos
      ...notification
    }

    notifications.value.push(newNotification)

    if (newNotification.timeout && newNotification.timeout > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.timeout)
    }

    return id
  }

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex((n) => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearAll = () => {
    notifications.value = []
  }

  const showSuccess = (title: string, message?: string) => {
    return addNotification({ type: 'success', title, message })
  }

  const showError = (title: string, message?: string) => {
    return addNotification({ type: 'error', title, message, timeout: 8000 })
  }

  const showWarning = (title: string, message?: string) => {
    return addNotification({ type: 'warning', title, message })
  }

  const showInfo = (title: string, message?: string) => {
    return addNotification({ type: 'info', title, message })
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    getSnackbarColor,
    getNotificationIcon
  }
}
