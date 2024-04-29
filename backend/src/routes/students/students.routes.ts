import { createStudent } from './createStudent';
import { deleteStudent } from './deleteStudent';
import { updateById } from './updateById';
import { getById } from './getById';
import { getAll } from './getAll';
import { app } from 'src/server';

export const studentsRoutes = async () => {
  app.register(deleteStudent);
  app.register(createStudent);
  app.register(updateById);
  app.register(getById);
  app.register(getAll);
};
