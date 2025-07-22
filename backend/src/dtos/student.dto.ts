export interface ICreateStudentDTO {
  name: string;
  email: string;
  cpf: string;
  ra: string;
}

export interface IStudentResponseDTO {
  id: string;
  name: string;
  email: string;
  cpf: string;
  ra: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetAllStudentsDTO {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IPaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
