import { ICreateStudentDTO, IStudentResponseDTO } from '../../dtos/student.dto';

export interface IStudentRepository {
  createStudent(data: ICreateStudentDTO): Promise<IStudentResponseDTO>;
  findByField(field: 'email' | 'cpf' | 'ra', value: string): Promise<IStudentResponseDTO | null>;
  getAllStudents(): Promise<IStudentResponseDTO[]>;
  getStudentById(id: string): Promise<IStudentResponseDTO | null>;
  updateStudent(id: string, data: Partial<ICreateStudentDTO>): Promise<IStudentResponseDTO>;
  deleteStudent(id: string): Promise<void>;
}
