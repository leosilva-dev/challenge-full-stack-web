import { StudentService } from '../../services/students/student.service';
import { IStudentRepository } from '../../interfaces/students/student.repository.interface';
import { IStudentResponseDTO } from '../../dtos/student.dto';
import { HttpError } from '../../helpers/httpError';

describe('StudentService - updateStudent', () => {
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
    updateStudent: jest.fn(),
    getAllStudents: jest.fn(),
    createStudent: jest.fn(),
    findByField: jest.fn(),
    deleteStudent: jest.fn(),
  };

  const service = new StudentService(mockRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update a student if found and valid data', async () => {
    (mockRepository.getStudentById as jest.Mock).mockResolvedValue(mockStudent);
    (mockRepository.updateStudent as jest.Mock).mockResolvedValue({ ...mockStudent, name: 'Bob' });
    const result = await service.updateStudent('1', { name: 'Bob' });
    expect(result.name).toBe('Bob');
    expect(mockRepository.getStudentById).toHaveBeenCalledWith('1');
    expect(mockRepository.updateStudent).toHaveBeenCalledWith('1', { name: 'Bob' });
  });

  it('should throw 404 if student not found', async () => {
    (mockRepository.getStudentById as jest.Mock).mockResolvedValue(null);
    await expect(service.updateStudent('2', { name: 'Bob' })).rejects.toThrow(HttpError);
    await service.updateStudent('2', { name: 'Bob' }).catch((err) => {
      expect(err.statusCode).toBe(404);
      expect(err.message).toBe('Aluno não encontrado.');
    });
    expect(mockRepository.getStudentById).toHaveBeenCalledWith('2');
    expect(mockRepository.updateStudent).not.toHaveBeenCalled();
  });

  it('should throw 400 if trying to edit cpf', async () => {
    (mockRepository.getStudentById as jest.Mock).mockResolvedValue(mockStudent);
    await expect(service.updateStudent('1', { cpf: '99999999999' })).rejects.toThrow(HttpError);
    await service.updateStudent('1', { cpf: '99999999999' }).catch((err) => {
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe('O campo CPF não pode ser editado.');
    });
    expect(mockRepository.updateStudent).not.toHaveBeenCalled();
  });

  it('should throw 400 if trying to edit ra', async () => {
    (mockRepository.getStudentById as jest.Mock).mockResolvedValue(mockStudent);
    await expect(service.updateStudent('1', { ra: '20259999' })).rejects.toThrow(HttpError);
    await service.updateStudent('1', { ra: '20259999' }).catch((err) => {
      expect(err.statusCode).toBe(400);
      expect(err.message).toBe('O campo RA não pode ser editado.');
    });
    expect(mockRepository.updateStudent).not.toHaveBeenCalled();
  });

  it('should throw 409 if email already exists for another student', async () => {
    (mockRepository.getStudentById as jest.Mock).mockResolvedValue(mockStudent);
    (mockRepository.findByField as jest.Mock).mockResolvedValue({ ...mockStudent, id: '2' });
    await expect(service.updateStudent('1', { email: 'bob@example.com' })).rejects.toThrow(
      HttpError,
    );
    await service.updateStudent('1', { email: 'bob@example.com' }).catch((err) => {
      expect(err.statusCode).toBe(409);
      expect(err.message).toBe('Já existe um aluno cadastrado com este e-mail.');
    });
    expect(mockRepository.updateStudent).not.toHaveBeenCalled();
  });

  it('should throw if repository.updateStudent throws an error', async () => {
    (mockRepository.getStudentById as jest.Mock).mockResolvedValue(mockStudent);
    (mockRepository.updateStudent as jest.Mock).mockRejectedValue(new Error('DB error'));
    await expect(service.updateStudent('1', { name: 'Bob' })).rejects.toThrow('DB error');
  });
});
