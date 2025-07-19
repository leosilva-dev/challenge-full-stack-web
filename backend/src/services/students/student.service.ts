import { ICreateStudentDTO } from "../../dtos/student.dto";
import { IStudentRepository } from "../../interfaces/students/student.repository.interface";
import { HttpError } from "../../helpers/httpError";

export class StudentService {
  constructor(private repository: IStudentRepository) {}

  async createStudent(data: ICreateStudentDTO) {
    const duplicates = await Promise.all([
      this.repository.findByField("email", data.email),
      this.repository.findByField("cpf", data.cpf),
      this.repository.findByField("ra", data.ra),
    ]);

    const [emailExists, cpfExists, raExists] = duplicates;

    if (emailExists) {
      throw new HttpError(
        409,
        "Já existe um aluno cadastrado com este e-mail."
      );
    }

    if (cpfExists) {
      throw new HttpError(409, "Já existe um aluno cadastrado com este CPF.");
    }

    if (raExists) {
      throw new HttpError(409, "Já existe um aluno cadastrado com este RA.");
    }

    return this.repository.createStudent(data);
  }

  async getAllStudents() {
    return this.repository.getAllStudents();
  }

  async getStudentById(id: string) {
    const student = await this.repository.getStudentById(id);
    if (!student) {
      throw new HttpError(404, "Aluno não encontrado.");
    }
    return student;
  }

  async updateStudent(id: string, data: Partial<ICreateStudentDTO>) {
    const student = await this.repository.getStudentById(id);
    if (!student) {
      throw new HttpError(404, "Aluno não encontrado.");
    }

    if (data.cpf !== undefined) {
      throw new HttpError(400, "O campo CPF não pode ser editado.");
    }
    if (data.ra !== undefined) {
      throw new HttpError(400, "O campo RA não pode ser editado.");
    }

    if (data.email) {
      const emailExists = await this.repository.findByField(
        "email",
        data.email
      );
      if (emailExists && emailExists.id !== id) {
        throw new HttpError(
          409,
          "Já existe um aluno cadastrado com este e-mail."
        );
      }
    }

    return this.repository.updateStudent(id, data);
  }

  async deleteStudent(id: string) {
    const student = await this.repository.getStudentById(id);
    if (!student) {
      throw new HttpError(404, "Aluno não encontrado.");
    }
    return this.repository.deleteStudent(id);
  }
}
