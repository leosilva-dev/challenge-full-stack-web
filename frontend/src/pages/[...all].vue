<template>
  <v-container class="py-16">
    <v-row justify="center" align="center" style="min-height: 60vh">
      <v-col cols="12" sm="8" md="6" class="text-center">
        <h1 class="text-h3 text-md-h2 font-weight-light mb-4">404</h1>

        <h2 class="text-h5 text-md-h4 font-weight-regular mb-6">Página não encontrada</h2>

        <p class="text-body-1 text-medium-emphasis mb-8">
          A página que você está procurando não existe ou foi movida para outro local.
        </p>

        <v-btn
          color="primary"
          variant="outlined"
          size="large"
          prepend-icon="mdi-home"
          @click="goHome"
          rounded="lg"
        >
          Ir para Início
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>
