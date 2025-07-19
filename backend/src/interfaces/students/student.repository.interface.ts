import { Prisma } from "@prisma/client";

export interface IStudentRepository {
  createStudent(data: Prisma.StudentCreateInput): Promise<any>;
  findByField(
    field: "email" | "cpf" | "ra",
    value: string
  ): Promise<any | null>;
}
