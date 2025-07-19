import { StudentService } from '../../services/students/student.service';
import { IStudentRepository } from '../../interfaces/students/student.repository.interface';
import { IStudentResponseDTO } from '../../dtos/student.dto';
import { HttpError } from '../../helpers/httpError';

describe('StudentService - getStudentById', () => {
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
    getAllStudents: jest.fn(),
    createStudent: jest.fn(),
    findByField: jest.fn(),
    updateStudent: jest.fn(),
    deleteStudent: jest.fn(),
  };

  const service = new StudentService(mockRepository);

  beforeEach(() => {
    jest.clearAllMocks();
    (mockRepository.getStudentById as jest.Mock).mockResolvedValue(mockStudent);
  });

  it('should return a student by id', async () => {
    (mockRepository.getStudentById as jest.Mock).mockResolvedValue(mockStudent);
    const result = await service.getStudentById('1');
    expect(result).toEqual(mockStudent);
    expect(mockRepository.getStudentById).toHaveBeenCalledWith('1');
  });

  it('should throw a 404 error if student not found', async () => {
    (mockRepository.getStudentById as jest.Mock).mockResolvedValue(null);

    await expect(service.getStudentById('2')).rejects.toThrow(HttpError);

    await service.getStudentById('2').catch((err) => {
      expect(err.statusCode).toBe(404);
      expect(err.message).toBe('Aluno não encontrado.');
    });

    expect(mockRepository.getStudentById).toHaveBeenCalledWith('2');
  });

  it('should throw if repository.getStudentById throws an error', async () => {
    (mockRepository.getStudentById as jest.Mock).mockRejectedValue(new Error('DB error'));
    await expect(service.getStudentById('1')).rejects.toThrow('DB error');
  });
});
