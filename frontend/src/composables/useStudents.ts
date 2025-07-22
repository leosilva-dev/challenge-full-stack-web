import { ref, reactive } from 'vue'
import { studentService } from '@/services/studentService'
import { formatCPFDisplay, cleanCPF } from '@/utils/formatters'
import type { Student, CreateStudentRequest, UpdateStudentRequest } from '@/types/student.types'
import type { ApiFilters, PaginatedResponse } from '@/types/global.types'

export function useStudents() {
  const students = ref<Student[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })
  const filters = ref<ApiFilters>({
    page: 1,
    limit: 10,
    search: ''
  })

  const handleApiResponse = (response: PaginatedResponse<Student>) => {
    students.value = response.data
    pagination.value = response.pagination
  }

  const handleApiError = (err: unknown, defaultMessage: string) => {
    error.value = err instanceof Error ? err.message : defaultMessage
    students.value = []
    console.error(defaultMessage, err)
  }

  const loadStudents = async (newFilters?: Partial<ApiFilters>) => {
    loading.value = true
    error.value = null

    try {
      if (newFilters) {
        filters.value = { ...filters.value, ...newFilters }
      }

      const response = await studentService.getStudents(filters.value)
      handleApiResponse(response)
    } catch (err) {
      handleApiError(err, 'Erro ao carregar estudantes')
    } finally {
      loading.value = false
    }
  }

  const searchStudentsWithFilters = async (searchQuery: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await studentService.searchStudents(searchQuery)
      handleApiResponse(response)

      filters.value = {
        ...filters.value,
        page: 1,
        search: searchQuery
      }
    } catch (err) {
      handleApiError(err, 'Erro ao buscar estudantes')
    } finally {
      loading.value = false
    }
  }

  const clearSearch = () => {
    loadStudents({
      page: 1,
      search: ''
    })
  }

  const nextPage = () => {
    if (pagination.value.page < pagination.value.totalPages) {
      loadStudents({ page: pagination.value.page + 1 })
    }
  }

  const previousPage = () => {
    if (pagination.value.page > 1) {
      loadStudents({ page: pagination.value.page - 1 })
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      loadStudents({ page })
    }
  }

  const createStudent = async (studentData: CreateStudentRequest): Promise<Student | null> => {
    loading.value = true
    error.value = null

    try {
      const cleanData = {
        ...studentData,
        cpf: cleanCPF(studentData.cpf)
      }

      const newStudent = await studentService.createStudent(cleanData)
      students.value.push(newStudent)
      return newStudent
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao criar estudante'
      return null
    } finally {
      loading.value = false
    }
  }

  const updateStudent = async (
    id: string,
    studentData: UpdateStudentRequest
  ): Promise<Student | null> => {
    loading.value = true
    error.value = null

    try {
      const cleanData = {
        ...studentData,
        cpf: studentData.cpf ? cleanCPF(studentData.cpf) : undefined
      }

      const updatedStudent = await studentService.updateStudent(id, cleanData)

      const index = students.value.findIndex((s) => s.id === id)
      if (index !== -1) {
        students.value[index] = updatedStudent
      }

      return updatedStudent
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao atualizar estudante'
      return null
    } finally {
      loading.value = false
    }
  }

  const deleteStudent = async (id: string): Promise<boolean> => {
    loading.value = true
    error.value = null

    try {
      await studentService.deleteStudent(id)
      students.value = students.value.filter((s) => s.id !== id)
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao excluir estudante'
      return false
    } finally {
      loading.value = false
    }
  }

  const getStudentById = async (id: string): Promise<Student | null> => {
    loading.value = true
    error.value = null

    try {
      const student = await studentService.getStudentById(id)
      return student
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao buscar estudante'
      return null
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    students,
    loading,
    error,
    pagination,
    filters,
    loadStudents,
    searchStudents: searchStudentsWithFilters,
    clearSearch,
    nextPage,
    previousPage,
    goToPage,
    createStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
    clearError
  }
}

export function useStudentForm() {
  const form = reactive<CreateStudentRequest>({
    name: '',
    email: '',
    cpf: '',
    ra: ''
  })

  const resetForm = () => {
    form.name = ''
    form.email = ''
    form.cpf = ''
    form.ra = ''
  }

  const setForm = (student: Partial<CreateStudentRequest>) => {
    form.name = student.name || ''
    form.email = student.email || ''
    form.cpf = student.cpf ? formatCPFDisplay(student.cpf) : ''
    form.ra = student.ra || ''
  }

  const validationRules = {
    name: [(v: string) => !!v || 'Nome é obrigatório'],
    email: [
      (v: string) => !!v || 'Email é obrigatório',
      (v: string) => /.+@.+\..+/.test(v) || 'Email deve ser válido'
    ],
    cpf: [
      (v: string) => !!v || 'CPF é obrigatório',
      (v: string) => {
        const cleanedCPF = cleanCPF(v)
        return cleanedCPF.length === 11 || 'CPF deve ter 11 dígitos'
      }
    ],
    ra: [(v: string) => !!v || 'RA é obrigatório']
  }

  return {
    form,
    resetForm,
    setForm,
    validationRules
  }
}
