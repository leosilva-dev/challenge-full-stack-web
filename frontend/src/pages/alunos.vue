<template>
  <v-container class="py-8">
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center mb-6">
          <h1 class="text-h4 font-weight-bold">Gestão de Alunos</h1>
          <v-btn
            color="primary"
            prepend-icon="mdi-account-plus"
            @click="openAddDialog"
            :disabled="loading"
          >
            Adicionar Aluno
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-text-field
              v-model="searchQuery"
              append-inner-icon="mdi-magnify"
              label="Buscar alunos..."
              single-line
              hide-details
              variant="outlined"
              density="compact"
              :disabled="loading"
              @input="handleSearchInput"
              clearable
              @click:clear="handleSearchClear"
              class="me-4"
              style="max-width: 400px"
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-chip
              v-if="pagination && pagination.total > 0"
              variant="outlined"
              color="primary"
              size="small"
            >
              {{ pagination.total }} {{ pagination.total === 1 ? 'aluno' : 'alunos' }}
            </v-chip>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="students || []"
            :loading="loading"
            loading-text="Carregando alunos..."
            class="elevation-0"
            no-data-text="Nenhum aluno cadastrado"
            items-per-page-text="Itens por página:"
            :items-per-page="pagination?.limit || 10"
            :page="pagination?.page || 1"
            :items-length="pagination?.total || 0"
            @update:page="handlePageChange"
            @update:items-per-page="handleItemsPerPageChange"
          >
            <template v-slot:item.cpf="{ item }">
              {{ formatCPFDisplay(item.cpf) }}
            </template>

            <template v-slot:item.createdAt="{ item }">
              {{ formatDate(item.createdAt) }}
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn
                icon="mdi-pencil"
                size="small"
                color="primary"
                variant="text"
                @click="openEditDialog(item)"
                :disabled="loading"
              ></v-btn>
              <v-btn
                icon="mdi-delete"
                size="small"
                color="error"
                variant="text"
                @click="handleDeleteStudent(item)"
                :disabled="loading"
              ></v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showDialog" max-width="600px" persistent>
      <v-card>
        <v-card-title class="text-h5">
          {{ editingStudent ? 'Editar Aluno' : 'Adicionar Novo Aluno' }}
        </v-card-title>

        <v-card-text>
          <v-form ref="formRef" v-model="formValid">
            <v-text-field
              v-model="form.name"
              label="Nome completo"
              :rules="validationRules.name"
              variant="outlined"
              class="mb-4"
              :disabled="loading"
            ></v-text-field>

            <v-text-field
              v-model="form.email"
              label="Email"
              type="email"
              :rules="validationRules.email"
              variant="outlined"
              class="mb-4"
              :disabled="loading"
            ></v-text-field>

            <v-text-field
              v-model="form.cpf"
              label="CPF"
              :rules="validationRules.cpf"
              variant="outlined"
              class="mb-4"
              :disabled="loading"
              @input="formatCPF"
              maxlength="14"
            ></v-text-field>

            <v-text-field
              v-model="form.ra"
              label="RA (Registro Acadêmico)"
              :rules="validationRules.ra"
              variant="outlined"
              :disabled="loading"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="closeDialog" :disabled="loading"> Cancelar </v-btn>
          <v-btn
            color="primary"
            @click="handleSaveStudent"
            :disabled="!formValid || loading"
            :loading="loading"
          >
            {{ editingStudent ? 'Salvar' : 'Adicionar' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showDeleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Confirmar Exclusão</v-card-title>
        <v-card-text>
          Deseja realmente excluir o aluno <strong>{{ studentToDelete?.name }}</strong
          >? <br /><br />
          Esta ação não pode ser desfeita.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="showDeleteDialog = false" :disabled="loading">
            Cancelar
          </v-btn>
          <v-btn color="error" @click="confirmDelete" :disabled="loading" :loading="loading">
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStudents, useStudentForm } from '@/composables/useStudents'
import { useNotification } from '@/composables/useNotification'
import { formatDate, formatCPFDisplay, handleCPFInput } from '@/utils/formatters'
import type { Student } from '@/types/student.types'

const {
  students,
  loading,
  error,
  pagination,
  loadStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  searchStudents,
  clearSearch,
  goToPage,
  clearError
} = useStudents()

const { form, resetForm, setForm, validationRules } = useStudentForm()
const { showSuccess, showError } = useNotification()

const searchQuery = ref('')
const showDialog = ref(false)
const showDeleteDialog = ref(false)
const editingStudent = ref<Student | null>(null)
const studentToDelete = ref<Student | null>(null)
const formValid = ref(false)
const formRef = ref()

const headers = [
  { title: 'Nome', value: 'name', sortable: true },
  { title: 'Email', value: 'email', sortable: true },
  { title: 'CPF', value: 'cpf', sortable: true },
  { title: 'RA', value: 'ra', sortable: true },
  { title: 'Criado em', value: 'createdAt', sortable: true },
  { title: 'Ações', value: 'actions', sortable: false, align: 'center' as const }
]

let searchTimeout: number | null = null

const handleSearchInput = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = setTimeout(handleSearch, 500)
}

const handleSearch = async () => {
  if (searchQuery.value.trim()) {
    await searchStudents(searchQuery.value.trim())
  } else {
    clearSearch()
  }
}

const handleSearchClear = () => {
  searchQuery.value = ''
  clearSearch()
}

const handlePageChange = (page: number) => goToPage(page)
const handleItemsPerPageChange = (itemsPerPage: number) => {
  loadStudents({ page: 1, limit: itemsPerPage })
}

const formatCPF = (event: Event) => {
  handleCPFInput(event, (value) => {
    form.cpf = value
  })
}

const openAddDialog = () => {
  editingStudent.value = null
  resetForm()
  showDialog.value = true
}

const openEditDialog = (student: Student) => {
  editingStudent.value = student
  setForm(student)
  showDialog.value = true
}

const closeDialog = () => {
  showDialog.value = false
  editingStudent.value = null
  resetForm()
  formRef.value?.resetValidation()
}

const handleSaveStudent = async () => {
  if (!formRef.value?.validate()) return

  const studentName = form.name
  const isEditing = !!editingStudent.value

  const result = isEditing
    ? await updateStudent(editingStudent.value.id, form)
    : await createStudent(form)

  if (result) {
    const action = isEditing ? 'atualizado' : 'adicionado'
    showSuccess(`Aluno(a) ${action}`, `${studentName} foi ${action} com sucesso.`)
    closeDialog()
    await loadStudents()
  } else if (error.value) {
    showError('Erro na operação', error.value)
  }
}

const handleDeleteStudent = (student: Student) => {
  studentToDelete.value = student
  showDeleteDialog.value = true
}

const confirmDelete = async () => {
  if (!studentToDelete.value) return

  const studentName = studentToDelete.value.name
  const success = await deleteStudent(studentToDelete.value.id)

  if (success) {
    showSuccess('Aluno removido', `${studentName} foi removido com sucesso.`)
    showDeleteDialog.value = false
    studentToDelete.value = null
    await loadStudents()
  } else if (error.value) {
    showError('Erro ao remover', error.value)
  }
}

onMounted(async () => {
  await loadStudents()
  if (error.value) {
    showError('Erro ao carregar', 'Não foi possível carregar a lista de alunos.')
  }
})
</script>

<style scoped>
.v-data-table {
  border-radius: 8px;
}
</style>
