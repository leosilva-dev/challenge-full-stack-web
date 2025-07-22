<template>
  <AuthLayout>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-card-title class="text-center">
              <h1>Criar Conta</h1>
            </v-card-title>

            <v-card-text>
              <v-form ref="form" v-model="isFormValid" @submit.prevent="handleRegister">
                <v-text-field
                  v-model="userData.name"
                  :rules="nameRules"
                  label="Nome completo"
                  prepend-icon="mdi-account"
                  required
                  class="mb-3"
                />

                <v-text-field
                  v-model="userData.email"
                  :rules="emailRules"
                  label="Email"
                  type="email"
                  prepend-icon="mdi-email"
                  required
                  class="mb-3"
                />

                <v-text-field
                  v-model="userData.password"
                  :rules="passwordRules"
                  :type="showPassword ? 'text' : 'password'"
                  label="Senha"
                  prepend-icon="mdi-lock"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showPassword = !showPassword"
                  required
                  class="mb-3"
                />

                <v-text-field
                  v-model="confirmPassword"
                  :rules="confirmPasswordRules"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  label="Confirmar senha"
                  prepend-icon="mdi-lock-check"
                  :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showConfirmPassword = !showConfirmPassword"
                  required
                  class="mb-3"
                />

                <v-alert
                  v-if="authStore.error"
                  type="error"
                  class="mb-3"
                  closable
                  @click:close="authStore.clearError"
                >
                  {{ authStore.error }}
                </v-alert>

                <v-btn
                  type="submit"
                  color="primary"
                  size="large"
                  block
                  :loading="authStore.loading"
                  :disabled="!isFormValid"
                  class="mb-3"
                >
                  Criar Conta
                </v-btn>

                <v-divider class="my-4" />

                <div class="text-center">
                  <p class="text-body-2">
                    Já tem uma conta?
                    <router-link to="/login" class="text-primary text-decoration-none">
                      Faça login aqui
                    </router-link>
                  </p>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AuthLayout from '@/components/AuthLayout.vue'
import type { RegisterRequest } from '@/types/auth.types'

const router = useRouter()
const authStore = useAuthStore()

const form = ref()
const isFormValid = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const confirmPassword = ref('')

const userData = reactive<RegisterRequest>({
  name: '',
  email: '',
  password: ''
})

const nameRules = [
  (v: string) => !!v || 'Nome é obrigatório',
  (v: string) => v.length >= 2 || 'Nome deve ter pelo menos 2 caracteres'
]

const emailRules = [
  (v: string) => !!v || 'Email é obrigatório',
  (v: string) => /.+@.+\..+/.test(v) || 'Email deve ser válido'
]

const passwordRules = [
  (v: string) => !!v || 'Senha é obrigatória',
  (v: string) => v.length >= 6 || 'Senha deve ter pelo menos 6 caracteres'
]

const confirmPasswordRules = [
  (v: string) => !!v || 'Confirmação de senha é obrigatória',
  (v: string) => v === userData.password || 'As senhas não coincidem'
]

async function handleRegister() {
  if (!isFormValid.value) return

  try {
    await authStore.register(userData)
    router.push('/')
  } catch (error) {
    console.error('Erro no registro:', error)
  }
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
