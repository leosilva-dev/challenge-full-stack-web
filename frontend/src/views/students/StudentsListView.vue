<script setup lang="ts">
import { StudentsService, type IStudent } from '@/services/StudentsServices'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentPage = ref(1)
const pageSize = ref(10)

const search = ref('')
const showAlert = ref(false)
const alertText = ref('')
const snackbarColor = ref('')

const confirmDialog = ref(false)
const studentIdToDelete = ref(0)

let students = reactive<IStudent[]>([])

const headers = [
  { text: 'Registro acadêmico', value: 'ra' },
  { text: 'Nome', value: 'name' },
  { text: 'CPF', value: 'cpf' },
  { text: 'E-mail', value: 'email' },
  { text: 'Ações', value: 'actions' }
]

const handleEditStudent = (studentId: number) => {
  router.push(`/alunos/${studentId}`)
}

const handleNewStudent = () => {
  router.push(`/alunos/novo`)
}

const displayAlert = (message: string, success: 'success' | 'error') => {
  alertText.value = message
  snackbarColor.value = success === 'success' ? 'green' : 'red'
  showAlert.value = true
}

const handleDeleteItem = (studentId: number) => {
  studentIdToDelete.value = studentId
  confirmDialog.value = true
}

const cancelDelete = () => {
  confirmDialog.value = false
}

const confirmDelete = () => {
  StudentsService.deleteById(studentIdToDelete.value).then((response) => {
    if (response) {
      displayAlert(response, 'success')
    }
    fetchStudents()
  })
  confirmDialog.value = false
}

const searchStudents = () => {
  fetchStudents()
}

const fetchStudents = () => {
  StudentsService.getAll(currentPage.value, pageSize.value, search.value).then((response) => {
    if (response) {
      students.splice(0, students.length, ...response)
    }
  })
}

onMounted(() => {
  fetchStudents()
})
</script>

<template>
  <v-snackbar :color="snackbarColor" v-model="showAlert">
    {{ alertText }}
  </v-snackbar>
  <v-dialog v-model="confirmDialog" max-width="400">
    <v-card>
      <v-card-title>Confirmar Exclusão</v-card-title>
      <v-card-text> Tem certeza de que deseja excluir este aluno? </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="confirmDelete">Confirmar</v-btn>
        <v-btn @click="cancelDelete">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-container class="elevation-3 mt-8 w-75">
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            placeholder="Digite sua busca"
            variant="outlined"
            density="compact"
            v-model="search"
          />
        </v-col>
        <v-col cols="3">
          <v-btn color="primary" variant="outlined" @click="searchStudents"> Pesquisar </v-btn>
        </v-col>
        <v-col cols="3">
          <v-btn color="primary" @click="handleNewStudent"> Cadastrar Aluno </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-data-table
      :items="students"
      :headers="headers"
      :page="currentPage"
      :items-per-page="pageSize"
    >
      <template v-slot:item.actions="{ item: { id } }">
        <v-icon small class="mr-2" @click="handleEditStudent(id)"> mdi-pencil </v-icon>
        <v-icon small @click="handleDeleteItem(id)"> mdi-delete </v-icon>
      </template>

      <template v-slot:no-data>
        <v-container>Não existem alunos cadastrados!</v-container>
      </template>
    </v-data-table>
  </v-container>
</template>
