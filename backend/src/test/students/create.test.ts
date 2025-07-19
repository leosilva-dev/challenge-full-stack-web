import { StudentService } from '../../services/students/student.service';
import { ICreateStudentDTO, IStudentResponseDTO } from '../../dtos/student.dto';
import { HttpError } from '../../helpers/httpError';

describe('StudentService - create', () => {
  const mockRepository = {
    findByField: jest.fn(),
    createStudent: jest.fn(),
  } as any;

  const service = new StudentService(mockRepository);

  const validStudent: ICreateStudentDTO = {
    name: 'Test User',
    email: 'test@example.com',
    cpf: '12345678900',
    ra: '20250001',
  };

  it('should create a student when no duplicates exist', async () => {
    mockRepository.findByField.mockResolvedValue(null);
    const createdStudent: IStudentResponseDTO = {
      id: '1',
      ...validStudent,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockRepository.createStudent.mockResolvedValue(createdStudent);

    const result = await service.createStudent(validStudent);
    expect(result).toEqual(createdStudent);
    expect(mockRepository.createStudent).toHaveBeenCalledWith(validStudent);
  });

  it('should throw error if email already exists', async () => {
    mockRepository.findByField.mockImplementation((field: 'email' | 'cpf' | 'ra') =>
      field === 'email' ? { ...validStudent } : null,
    );
    await expect(service.createStudent(validStudent)).rejects.toThrow(HttpError);
    await expect(service.createStudent(validStudent)).rejects.toThrow(
      'Já existe um aluno cadastrado com este e-mail.',
    );
  });

  it('should throw error if cpf already exists', async () => {
    mockRepository.findByField.mockImplementation((field: 'email' | 'cpf' | 'ra') =>
      field === 'cpf' ? { ...validStudent } : null,
    );
    await expect(service.createStudent(validStudent)).rejects.toThrow(HttpError);
    await expect(service.createStudent(validStudent)).rejects.toThrow(
      'Já existe um aluno cadastrado com este CPF.',
    );
  });

  it('should throw error if ra already exists', async () => {
    mockRepository.findByField.mockImplementation((field: 'email' | 'cpf' | 'ra') =>
      field === 'ra' ? { ...validStudent } : null,
    );
    await expect(service.createStudent(validStudent)).rejects.toThrow(HttpError);
    await expect(service.createStudent(validStudent)).rejects.toThrow(
      'Já existe um aluno cadastrado com este RA.',
    );
  });

  it('should throw if repository.createStudent throws an error', async () => {
    mockRepository.findByField.mockResolvedValue(null);
    mockRepository.createStudent.mockRejectedValue(new Error('DB error'));
    await expect(service.createStudent(validStudent)).rejects.toThrow('DB error');
  });
});
