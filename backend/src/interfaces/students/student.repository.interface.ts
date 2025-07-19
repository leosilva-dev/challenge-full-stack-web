import { Prisma, Student } from "@prisma/client";

export interface IStudentRepository {
  createStudent(data: Prisma.StudentCreateInput): Promise<Student>;
  findByField(
    field: "email" | "cpf" | "ra",
    value: string
  ): Promise<Student | null>;
  getAllStudents(): Promise<Student[]>;
  getStudentById(id: string): Promise<Student | null>;
}
