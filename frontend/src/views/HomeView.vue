<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToStudentsPage = () => {
  router.push('/alunos')
}
</script>

<template>
  <main>
    <v-container fluid>
      <v-row justify="start">
        <v-col cols="12" md="4">
          <v-card class="shortcut-card" @click="goToStudentsPage">
            <v-card-title>
              <span class="headline">Veja todos os alunos</span>
            </v-card-title>
            <v-card-text>Explore a lista de alunos e suas informações.</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>
