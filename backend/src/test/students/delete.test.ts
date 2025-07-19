import { StudentService } from '../../services/students/student.service';
import { IStudentRepository } from '../../interfaces/students/student.repository.interface';
import { IStudentResponseDTO } from '../../dtos/student.dto';
import { HttpError } from '../../helpers/httpError';

describe('StudentService - deleteStudent', () => {
  const mockStudent: IStudentResponseDTO = {
    id: '1',
    name: 'Alice',
    email: 'alice@example.com',
    cpf: '12345678901',
    ra: '20250001',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository: IStudentRepository = {
    getStudentById: jest.fn(),
    deleteStudent: jest.fn(),
    getAllStudents: jest.fn(),
    createStudent: jest.fn(),
    findByField: jest.fn(),
    updateStudent: jest.fn(),
  };

  const service = new StudentService(mockRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a student if found', async () => {
    (mockRepository.getStudentById as jest.Mock).mockResolvedValue(mockStudent);
    (mockRepository.deleteStudent as jest.Mock).mockResolvedValue(true);

    const result = await service.deleteStudent('1');
    expect(result).toBe(true);
    expect(mockRepository.getStudentById).toHaveBeenCalledWith('1');
    expect(mockRepository.deleteStudent).toHaveBeenCalledWith('1');
  });

  it('should throw a 404 error if student not found', async () => {
    (mockRepository.getStudentById as jest.Mock).mockResolvedValue(null);

    await expect(service.deleteStudent('2')).rejects.toThrow(HttpError);
    await service.deleteStudent('2').catch((err) => {
      expect(err.statusCode).toBe(404);
      expect(err.message).toBe('Aluno não encontrado.');
    });
    expect(mockRepository.getStudentById).toHaveBeenCalledWith('2');
    expect(mockRepository.deleteStudent).not.toHaveBeenCalled();
  });

  it('should throw if repository.deleteStudent throws an error', async () => {
    (mockRepository.getStudentById as jest.Mock).mockResolvedValue(mockStudent);
    (mockRepository.deleteStudent as jest.Mock).mockRejectedValue(new Error('DB error'));

    await expect(service.deleteStudent('1')).rejects.toThrow('DB error');
  });
});
