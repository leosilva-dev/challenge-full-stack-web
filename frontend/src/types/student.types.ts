export interface Student {
  id: string
  name: string
  email: string
  cpf: string
  ra: string
  createdAt: Date
  updatedAt: Date
}

export type CreateStudentRequest = Omit<Student, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateStudentRequest = Partial<CreateStudentRequest>
