<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const toggleDrawerOpen = ref(true)
const router = useRouter()

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
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
.menu-item-highlighted {
  background-color: #eceff1;
}
</style>
