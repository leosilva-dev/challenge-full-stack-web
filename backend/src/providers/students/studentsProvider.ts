import { Knex } from 'src/database/knex/connection';
import { ETableNames } from 'src/database/ETableNames';
import { IStudent } from 'src/database/models';

const getById = async (id: string): Promise<IStudent | undefined | Error> => {
  try {
    const result = await Knex(ETableNames.students).where({ id }).first();
    return result;
  } catch (error) {
    return new Error('Erro ao buscar aluno.');
  }
};

const getAll = async (): Promise<IStudent[] | Error> => {
  try {
    return Knex(ETableNames.students).select('id', 'name', 'email', 'cpf', 'ra');
  } catch (error) {
    return new Error('Erro ao buscar alunos.');
  }
};

const create = async (studentData: Omit<IStudent, 'id'>): Promise<string | Error> => {
  try {
    const [result] = await Knex(ETableNames.students).insert(studentData).returning('id');

    if (typeof result === 'object') {
      return result.id;
    }

    return new Error('Erro ao cadastrar aluno.');
  } catch (error) {
    return new Error('Erro ao cadastrar aluno.');
  }
};

export const studentsProvider = {
  getAll,
  create,
  getById,
};
