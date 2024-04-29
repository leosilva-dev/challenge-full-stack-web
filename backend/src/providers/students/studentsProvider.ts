import { Knex } from 'src/database/knex/connection';
import { ETableNames } from 'src/database/ETableNames';
import { IStudent } from 'src/database/models';

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
  create,
};
