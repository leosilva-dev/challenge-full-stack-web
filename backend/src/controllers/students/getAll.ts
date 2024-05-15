import { IStudentRepository } from 'src/repositories/IStudentRepository';

export const getAll = async (
  StudentRepository: IStudentRepository,
  page: number = 1,
  pageSize: number = 10,
  search: string = '',
) => {
  try {
    const offset = (page - 1) * pageSize;
    const result = await StudentRepository.getAll(offset, pageSize, search);

    if (!result || result instanceof Error) {
      throw new Error(result?.message || 'Não há alunos.');
    }

    const resultOrderedByName = result.sort((a, b) => a.name.localeCompare(b.name));
    return resultOrderedByName;
  } catch (error) {
    throw new Error('Erro ao obter recursos.');
  }
};
