import { apiClient } from './apiClient'
import type { Student, CreateStudentRequest, UpdateStudentRequest } from '@/types/student.types'
import type { ApiResponse, PaginatedResponse, ApiFilters } from '@/types/global.types'

class StudentService {
  async getStudents(filters: ApiFilters = {}): Promise<PaginatedResponse<Student>> {
    try {
      const params = new URLSearchParams()

      if (filters.page) params.append('page', filters.page.toString())
      if (filters.limit) params.append('limit', filters.limit.toString())

      if (filters.search && filters.search.trim()) params.append('search', filters.search.trim())

      const endpoint = params.toString() ? `/students?${params}` : '/students'
      const response = await apiClient.get<PaginatedResponse<Student>>(endpoint)

      return response
    } catch (error) {
      console.error('Error fetching students:', error)
      throw new Error('Erro ao buscar lista de estudantes')
    }
  }

  async getStudentById(id: string): Promise<Student> {
    try {
      const response = await apiClient.get<ApiResponse<Student>>(`/students/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching student:', error)
      throw new Error('Erro ao buscar estudante')
    }
  }

  async createStudent(studentData: CreateStudentRequest): Promise<Student> {
    try {
      const response = await apiClient.post<ApiResponse<Student>>('/students', studentData)
      return response.data
    } catch (error) {
      console.error('Error creating student:', error)
      throw new Error('Erro ao criar estudante')
    }
  }

  async updateStudent(id: string, studentData: UpdateStudentRequest): Promise<Student> {
    try {
      const response = await apiClient.put<ApiResponse<Student>>(`/students/${id}`, studentData)
      return response.data
    } catch (error) {
      console.error('Error updating student:', error)
      throw new Error('Erro ao atualizar estudante')
    }
  }

  async deleteStudent(id: string): Promise<void> {
    try {
      await apiClient.delete<ApiResponse<null>>(`/students/${id}`)
    } catch (error) {
      console.error('Error deleting student:', error)
      throw new Error('Erro ao excluir estudante')
    }
  }

  async searchStudents(query: string): Promise<PaginatedResponse<Student>> {
    try {
      const filters: ApiFilters = {
        search: query,
        limit: 50
      }

      const response = await this.getStudents(filters)
      return response
    } catch (error) {
      console.error('Error searching students:', error)
      throw new Error('Erro ao buscar estudantes')
    }
  }
}

export const studentService = new StudentService()

export { StudentService }
