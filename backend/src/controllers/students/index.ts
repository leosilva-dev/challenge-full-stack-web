import { updateById } from './updateById';
import { deleteById } from './deleteById';
import { getById } from './getById';
import { create } from './create';
import { getAll } from './getAll';

export const studentsController = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
