import { ICreateStudentDTO, IGetAllStudentsDTO, IPaginatedResponse } from '../../dtos/student.dto';
import { Student } from '@prisma/client';

export interface IStudentRepository {
  createStudent(data: ICreateStudentDTO): Promise<Student>;
  findByField(field: 'email' | 'cpf' | 'ra', value: string): Promise<Student | null>;
  getAllStudents(params: IGetAllStudentsDTO): Promise<IPaginatedResponse<Student>>;
  getStudentById(id: string): Promise<Student | null>;
  updateStudent(id: string, data: Partial<ICreateStudentDTO>): Promise<Student>;
  deleteStudent(id: string): Promise<void>;
}
