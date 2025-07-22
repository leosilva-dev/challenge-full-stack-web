<template>
  <MainLayout>
    <v-container class="py-8">
      <v-row justify="center" class="mb-4">
        <v-col cols="12" lg="8" class="text-center">
          <h1 class="text-h3 text-md-h2 font-weight-light text-primary">Módulo Acadêmico</h1>
        </v-col>
      </v-row>

      <v-row justify="center" class="cards-container">
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h4 font-weight-regular text-medium-emphasis">O que você pode fazer</h2>
        </v-col>

        <v-col cols="auto" class="cards-wrapper">
          <div class="d-flex flex-wrap justify-center ga-6">
            <v-card
              v-for="feature in features"
              :key="feature.title"
              class="mx-2"
              width="280"
              height="380"
              elevation="3"
              hover
              @click="navigateTo(feature.route)"
              :disabled="!feature.route"
              rounded="lg"
            >
              <v-card-text
                class="text-center pa-6 d-flex flex-column align-center justify-space-between fill-height"
              >
                <div class="d-flex flex-column align-center">
                  <v-avatar size="100" :color="feature.color" class="mb-4">
                    <v-icon size="50" color="white">{{ feature.icon }}</v-icon>
                  </v-avatar>

                  <h3 class="text-h6 font-weight-bold mb-3">{{ feature.title }}</h3>
                  <p class="text-body-2 text-center mb-6">{{ feature.description }}</p>
                </div>

                <div class="w-100">
                  <v-btn
                    v-if="feature.route"
                    color="primary"
                    variant="tonal"
                    block
                    rounded="lg"
                    size="large"
                  >
                    Acessar
                  </v-btn>

                  <v-btn v-else disabled variant="outlined" block rounded="lg" size="large">
                    Em breve
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </MainLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import MainLayout from '@/components/MainLayout.vue'

const router = useRouter()

const features = [
  {
    title: 'Gestão de Alunos',
    description: 'Cadastro, consulta e gerenciamento completo de alunos',
    icon: 'mdi-account-group',
    color: 'blue',
    route: '/alunos'
  },
  {
    title: 'Notas e Avaliações',
    description: 'Controle de notas, frequência e avaliações dos estudantes',
    icon: 'mdi-chart-line',
    color: 'green',
    route: null
  },
  {
    title: 'Relatórios',
    description: 'Relatórios detalhados e estatísticas do sistema',
    icon: 'mdi-file-chart',
    color: 'orange',
    route: null
  }
]

const navigateTo = (route: string | null) => {
  if (route) {
    router.push(route)
  }
}
</script>

<style scoped>
.v-card:hover {
  transform: translateY(-4px);
  transition: all 0.3s ease;
}

.v-card[disabled] {
  opacity: 0.6;
}

.v-card[disabled]:hover {
  transform: none;
}
</style>
