import {
  ICreateStudentDTO,
  IGetAllStudentsDTO,
  IPaginatedResponse,
  IStudentResponseDTO,
} from '../../dtos/student.dto';
import { Prisma, Student } from '@prisma/client';
import { IStudentRepository } from '../../interfaces/students/student.repository.interface';
import { prisma } from '../../lib/prisma';

export class StudentRepository implements IStudentRepository {
  async createStudent(data: ICreateStudentDTO): Promise<IStudentResponseDTO> {
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

  async getAllStudents(params: IGetAllStudentsDTO): Promise<IPaginatedResponse<Student>> {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.StudentWhereInput = {};

    if (params.search) {
      where.OR = [
        {
          name: {
            contains: params.search,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: params.search,
            mode: 'insensitive',
          },
        },
        {
          cpf: {
            contains: params.search,
            mode: 'insensitive',
          },
        },
        {
          ra: {
            contains: params.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.student.count({ where }),
    ]);

    return {
      data: students,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
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
