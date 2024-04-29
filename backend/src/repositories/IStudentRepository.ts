import { IStudent } from 'src/database/models';

export interface IStudentRepository {
  create(studentData: Omit<IStudent, 'id'>): Promise<string | Error>;
}
