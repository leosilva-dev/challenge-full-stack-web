import { ICreateStudentDTO, IStudentResponseDTO } from '../../dtos/student.dto';
import { Prisma, Student } from '@prisma/client';
import { IStudentRepository } from '../../interfaces/students/student.repository.interface';
import { prisma } from '../../lib/prisma';

export class StudentRepository implements IStudentRepository {
  async createStudent(data: ICreateStudentDTO): Promise<IStudentResponseDTO> {
    // Converte DTO para o formato do Prisma se necessário
    return prisma.student.create({ data });
  }

  async findByField(
    field: 'email' | 'cpf' | 'ra',
    value: string,
  ): Promise<IStudentResponseDTO | null> {
    switch (field) {
      case 'email':
        return prisma.student.findUnique({ where: { email: value } });
      case 'cpf':
        return prisma.student.findUnique({ where: { cpf: value } });
      case 'ra':
        return prisma.student.findUnique({ where: { ra: value } });
      default:
        throw new Error(`Unsupported field: ${field}`);
    }
  }

  async getAllStudents(): Promise<IStudentResponseDTO[]> {
    return prisma.student.findMany();
  }

  async getStudentById(id: string): Promise<IStudentResponseDTO | null> {
    return prisma.student.findUnique({ where: { id } });
  }

  async updateStudent(id: string, data: Partial<ICreateStudentDTO>): Promise<IStudentResponseDTO> {
    return prisma.student.update({
      where: { id },
      data,
    });
  }

  deleteStudent(id: string): Promise<void> {
    return prisma.student.delete({ where: { id } }).then(() => {});
  }
}
