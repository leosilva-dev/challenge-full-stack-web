import { Knex } from 'src/database/knex/connection';
import { ETableNames } from 'src/database/ETableNames';
import { IStudent } from 'src/database/models';

const getById = async (id: string): Promise<IStudent | undefined | Error> => {
  try {
    const result = await Knex(ETableNames.students)
      .where({ id })
      .select('id', 'name', 'email', 'cpf', 'ra')
      .first();
    return result;
  } catch (error) {
    return new Error('Erro ao buscar aluno.');
  }
};

const getAll = async (offset: number, limit: number, search: string): Promise<IStudent[] | Error> => {
  try {
    let query = Knex(ETableNames.students)
      .select('id', 'name', 'email', 'cpf', 'ra')
      .offset(offset)
      .limit(limit);

    if (search.trim() !== '') {
      query = query.where(function () {
        this.where('name', 'like', `%${search}%`)
          .orWhere('email', 'like', `%${search}%`)
          .orWhere('cpf', 'like', `%${search}%`)
          .orWhere('ra', 'like', `%${search}%`);
      });
    }

    return await query;
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
  } catch (error: any) {
    if (error.code === '23505') {
      if (error.constraint === 'students_cpf_unique') {
        return new Error('O CPF informado já está cadastrado para outro aluno.');
      } else if (error.constraint === 'students_email_unique') {
        return new Error('O e-mail informado já está cadastrado para outro aluno.');
      } else if (error.constraint === 'students_ra_unique') {
        return new Error('O RA informado já está cadastrado para outro aluno.');
      }
    }
    return new Error('Erro ao cadastrar aluno.');
  }
};

const updateById = async (id: string, updateData: IStudent): Promise<IStudent | Error> => {
  try {
    const result = await Knex(ETableNames.students)
      .where({ id })
      .update(updateData)
      .returning(['id', 'name', 'email', 'cpf', 'ra']);

    if (result[0] === undefined) {
      return new Error('Erro ao editar aluno.');
    }
    return result[0];
  } catch (error) {
    return new Error('Erro ao editar aluno.');
  }
};

const deleteById = async (id: string): Promise<boolean | Error> => {
  try {
    const result = await Knex(ETableNames.students).where({ id }).del();
    return result === 1 ? true : false;
  } catch (error) {
    return new Error('Erro ao excluir aluno.');
  }
};

export const studentsProvider = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
