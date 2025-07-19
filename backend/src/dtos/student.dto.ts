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
