import { Prisma, Student } from "@prisma/client";
import { IStudentRepository } from "../../interfaces/students/student.repository.interface";
import { prisma } from "../../lib/prisma";

export class StudentRepository implements IStudentRepository {
  async createStudent(data: Prisma.StudentCreateInput): Promise<Student> {
    return prisma.student.create({ data });
  }

  async findByField(
    field: "email" | "cpf" | "ra",
    value: string
  ): Promise<Student | null> {
    switch (field) {
      case "email":
        return prisma.student.findUnique({ where: { email: value } });
      case "cpf":
        return prisma.student.findUnique({ where: { cpf: value } });
      case "ra":
        return prisma.student.findUnique({ where: { ra: value } });
      default:
        throw new Error(`Unsupported field: ${field}`);
    }
  }

  async getAllStudents(): Promise<Student[]> {
    return prisma.student.findMany();
  }

  async getStudentById(id: string): Promise<Student | null> {
    return prisma.student.findUnique({ where: { id } });
  }
}
