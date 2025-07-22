<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useNotification } from '@/composables/useNotification'
import { useAuthStore } from '@/stores/auth'

const { notifications, removeNotification, getSnackbarColor, getNotificationIcon } =
  useNotification()

const authStore = useAuthStore()
const toggleDrawerOpen = ref(true)
const router = useRouter()
const showUserMenu = ref(false)

const items = [
  {
    title: 'Página Inicial',
    icon: 'mdi-home',
    route: '/'
  },
  {
    title: 'Alunos',
    icon: 'mdi-account-group',
    route: '/alunos'
  }
]

const navigateTo = (route: string) => {
  router.push(route)
}

const handleLogout = async () => {
  showUserMenu.value = false
  await authStore.logout()
  router.push('/login')
}

const currentRoute = ref(router.currentRoute.value.path)

const pageTitle = computed(() => {
  const matchedItem = items.find((item) => item.route === currentRoute.value)
  return matchedItem ? matchedItem.title : 'Módulo acadêmico'
})

watch(
  () => router.currentRoute.value,
  (to) => {
    currentRoute.value = to.path
  }
)
</script>
<template>
  <v-app>
    <v-app-bar color="primary" prominent app>
      <v-app-bar-nav-icon
        color="white"
        @click.stop="toggleDrawerOpen = !toggleDrawerOpen"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-white">{{ pageTitle }}</v-toolbar-title>
      <v-spacer />

      <v-menu v-model="showUserMenu" offset-y>
        <template v-slot:activator="{ props }">
          <v-btn color="white" variant="text" v-bind="props" class="text-white">
            <v-icon start>mdi-account</v-icon>
            {{ authStore.userName }}
            <v-icon end>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>{{ authStore.user?.email }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ authStore.isAdmin ? 'Administrador' : 'Usuário' }}
            </v-list-item-subtitle>
          </v-list-item>

          <v-divider />

          <v-list-item @click="handleLogout">
            <template v-slot:prepend>
              <v-icon>mdi-logout</v-icon>
            </template>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="toggleDrawerOpen" app>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="navigateTo(item.route)"
          :class="{ 'menu-item-highlighted': item.route === currentRoute }"
        >
          <v-list-item>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>

    <template v-for="notification in notifications" :key="notification.id">
      <v-snackbar
        :model-value="true"
        :timeout="5000"
        :color="getSnackbarColor(notification.type)"
        location="bottom right"
        variant="elevated"
        multi-line
        @update:model-value="removeNotification(notification.id)"
      >
        <div class="d-flex align-center">
          <v-icon :icon="getNotificationIcon(notification.type)" class="me-3"></v-icon>
          <div>
            <div class="font-weight-bold">{{ notification.title }}</div>
            <div class="text-body-2 mt-1">{{ notification.message }}</div>
          </div>
        </div>

        <template v-slot:actions>
          <v-btn
            variant="text"
            icon="mdi-close"
            size="small"
            @click="removeNotification(notification.id)"
          ></v-btn>
        </template>
      </v-snackbar>
    </template>
  </v-app>
</template>

<style scoped>
.menu-item-highlighted {
  background-color: #eceff1;
}
</style>
