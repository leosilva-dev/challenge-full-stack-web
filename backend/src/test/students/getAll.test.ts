import { StudentService } from '../../services/students/student.service';
import { IStudentRepository } from '../../interfaces/students/student.repository.interface';
import { IStudentResponseDTO } from '../../dtos/student.dto';

describe('StudentService - getAllStudents', () => {
  const mockStudents: IStudentResponseDTO[] = [
    {
      id: '1',
      name: 'Alice',
      email: 'alice@example.com',
      cpf: '12345678901',
      ra: '20250001',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Bob',
      email: 'bob@example.com',
      cpf: '12345678902',
      ra: '20250002',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockRepository: IStudentRepository = {
    getAllStudents: jest.fn().mockResolvedValue(mockStudents),
    createStudent: jest.fn(),
    findByField: jest.fn(),
    getStudentById: jest.fn(),
    updateStudent: jest.fn(),
    deleteStudent: jest.fn(),
  };

  const service = new StudentService(mockRepository);

  beforeEach(() => {
    jest.clearAllMocks();
    (mockRepository.getAllStudents as jest.Mock).mockResolvedValue(mockStudents);
  });

  it('should return all students', async () => {
    const result = await service.getAllStudents();
    expect(result).toEqual(mockStudents);
    expect(mockRepository.getAllStudents).toHaveBeenCalledTimes(1);
  });

  it('should return an empty array if no students exist', async () => {
    (mockRepository.getAllStudents as jest.Mock).mockResolvedValue([]);
    const result = await service.getAllStudents();
    expect(result).toEqual([]);
    expect(mockRepository.getAllStudents).toHaveBeenCalledTimes(1);
  });

  it('should throw if repository.getAllStudents throws an error', async () => {
    (mockRepository.getAllStudents as jest.Mock).mockRejectedValue(new Error('DB error'));
    await expect(service.getAllStudents()).rejects.toThrow('DB error');
  });
});
