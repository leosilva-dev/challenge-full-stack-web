import { studentsProvider } from 'src/providers/students/studentsProvider';
import { IStudentRepository } from './IStudentRepository';
import { IStudent } from 'src/database/models';

export class StudentRepository implements IStudentRepository {
  async getAll(): Promise<IStudent[] | Error> {
    return studentsProvider.getAll();
  }

  async create(studentData: Omit<IStudent, 'id'>): Promise<string | Error> {
    return studentsProvider.create(studentData);
  }
}
