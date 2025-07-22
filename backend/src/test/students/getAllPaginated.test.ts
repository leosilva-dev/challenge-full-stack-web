import { StudentService } from '../../services/students/student.service';
import { IStudentRepository } from '../../interfaces/students/student.repository.interface';
import { IStudentResponseDTO, IPaginatedResponse } from '../../dtos/student.dto';

describe('StudentService - getAllStudents with pagination and search', () => {
  const mockStudents: IStudentResponseDTO[] = [
    {
      id: '1',
      name: 'Leonardo Silva',
      email: 'leonardo@gmail.com',
      cpf: '12345678901',
      ra: '20250001',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Ana Costa',
      email: 'ana@hotmail.com',
      cpf: '98765432100',
      ra: '20250002',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockPaginatedResponse: IPaginatedResponse<IStudentResponseDTO> = {
    data: mockStudents,
    pagination: {
      page: 1,
      limit: 10,
      total: 2,
      totalPages: 1,
    },
  };

  const mockRepository: IStudentRepository = {
    getAllStudents: jest.fn(),
    createStudent: jest.fn(),
    findByField: jest.fn(),
    getStudentById: jest.fn(),
    updateStudent: jest.fn(),
    deleteStudent: jest.fn(),
  };

  const service = new StudentService(mockRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all students with default pagination', async () => {
    (mockRepository.getAllStudents as jest.Mock).mockResolvedValue(mockPaginatedResponse);

    const result = await service.getAllStudents({});

    expect(result).toEqual(mockPaginatedResponse);
    expect(mockRepository.getAllStudents).toHaveBeenCalledWith({});
    expect(mockRepository.getAllStudents).toHaveBeenCalledTimes(1);
  });

  it('should return students with custom pagination', async () => {
    const customPaginatedResponse = {
      ...mockPaginatedResponse,
      pagination: { page: 2, limit: 5, total: 10, totalPages: 2 },
    };

    (mockRepository.getAllStudents as jest.Mock).mockResolvedValue(customPaginatedResponse);

    const result = await service.getAllStudents({ page: 2, limit: 5 });

    expect(result).toEqual(customPaginatedResponse);
    expect(mockRepository.getAllStudents).toHaveBeenCalledWith({ page: 2, limit: 5 });
  });

  it('should return filtered students by search term', async () => {
    const filteredResponse = {
      data: [mockStudents[0]],
      pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
    };

    (mockRepository.getAllStudents as jest.Mock).mockResolvedValue(filteredResponse);

    const result = await service.getAllStudents({ search: 'leonardo' });

    expect(result).toEqual(filteredResponse);
    expect(mockRepository.getAllStudents).toHaveBeenCalledWith({ search: 'leonardo' });
  });

  it('should return filtered students with pagination and search', async () => {
    const filteredResponse = {
      data: [mockStudents[0]],
      pagination: { page: 1, limit: 5, total: 1, totalPages: 1 },
    };

    (mockRepository.getAllStudents as jest.Mock).mockResolvedValue(filteredResponse);

    const result = await service.getAllStudents({ page: 1, limit: 5, search: 'gmail' });

    expect(result).toEqual(filteredResponse);
    expect(mockRepository.getAllStudents).toHaveBeenCalledWith({
      page: 1,
      limit: 5,
      search: 'gmail',
    });
  });

  it('should return empty results when no students match search', async () => {
    const emptyResponse = {
      data: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
    };

    (mockRepository.getAllStudents as jest.Mock).mockResolvedValue(emptyResponse);

    const result = await service.getAllStudents({ search: 'nonexistent' });

    expect(result).toEqual(emptyResponse);
    expect(mockRepository.getAllStudents).toHaveBeenCalledWith({ search: 'nonexistent' });
  });

  it('should throw if repository.getAllStudents throws an error', async () => {
    (mockRepository.getAllStudents as jest.Mock).mockRejectedValue(new Error('DB error'));

    await expect(service.getAllStudents({})).rejects.toThrow('DB error');
    expect(mockRepository.getAllStudents).toHaveBeenCalledWith({});
  });
});
