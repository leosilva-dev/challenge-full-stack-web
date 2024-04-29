import { IStudent } from 'src/database/models';

export interface IStudentRepository {
  getAll(): Promise<IStudent[] | Error>;
  create(studentData: Omit<IStudent, 'id'>): Promise<string | Error>;
}
