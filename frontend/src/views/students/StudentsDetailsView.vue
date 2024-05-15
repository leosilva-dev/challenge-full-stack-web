<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, reactive, ref, watch } from 'vue'
import { StudentsService, type IStudent } from '@/services/StudentsServices'

const router = useRouter()
const studentId = ref<string>('')
const isEditing = ref<boolean>(false)
const student = reactive<IStudent>({} as IStudent)

const showAlert = ref(false)
const alertText = ref('')
const snackbarColor = ref('')

const allFieldsFilled = ref(false)

const validateFields = () => {
  allFieldsFilled.value = !!student.ra && !!student.name && !!student.email && !!student.cpf
}

watch([student], () => {
  validateFields()
})

onMounted(() => {
  if (router.currentRoute.value.params.id) {
    studentId.value = router.currentRoute.value.params.id.toString()
    if (studentId.value !== 'novo') {
      isEditing.value = true
      fetchStudent(parseInt(studentId.value))
    }
  }
})

const fetchStudent = (studentId: number) => {
  StudentsService.getById(studentId).then((response) => {
    if (response) {
      Object.assign(student, response)
      console.log(response)
    }
  })
}

const handleCancel = () => {
  router.push(`/alunos`)
}

const displayAlert = (message: string, success: 'success' | 'error') => {
  alertText.value = message
  snackbarColor.value = success === 'success' ? 'green' : 'red'
  showAlert.value = true
}

const handleSave = async () => {
  if (!allFieldsFilled.value) {
    displayAlert('Por favor, preencha todos os campos obrigatórios.', 'error')
    return
  }

  if (isEditing.value) {
    const response = await StudentsService.update(student)
    if (response instanceof Error) {
      displayAlert(response.message, 'error')
    } else {
      displayAlert('Usuário editado com sucesso.', 'success')
    }
  } else {
    const response = await StudentsService.create(student)
    if (response instanceof Error) {
      displayAlert(response.message, 'error')
    } else {
      displayAlert('Usuário cadastrado com sucesso.', 'success')
    }
  }
}
</script>

<template>
  <v-snackbar :color="snackbarColor" v-model="showAlert">
    {{ alertText }}
  </v-snackbar>
  <v-container class="elevation-3 mt-8 w-50">
    <h1>{{ isEditing ? 'Editar Aluno' : 'Cadastrar Aluno' }}</h1>

    <v-form @submit.prevent>
      <v-col cols="12">
        <v-text-field v-model="student.ra" label="RA" :disabled="isEditing" required></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="student.name" label="Nome" required></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="student.email" label="E-mail" required></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="student.cpf"
          label="CPF"
          :disabled="isEditing"
          required
        ></v-text-field>
      </v-col>

      <v-btn color="primary" variant="outlined" class="mr-4" @click="handleCancel">Cancelar</v-btn>
      <v-btn type="submit" color="primary" @click="handleSave" :disabled="!allFieldsFilled">{{
        isEditing ? 'Salvar' : 'Cadastrar'
      }}</v-btn>
    </v-form>
  </v-container>
</template>
