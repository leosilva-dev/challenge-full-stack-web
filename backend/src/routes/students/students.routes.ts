import { createStudent } from './createStudent';
import { getById } from './getById';
import { getAll } from './getAll';
import { app } from 'src/server';

export const studentsRoutes = async () => {
  app.register(getAll);
  app.register(getById);
  app.register(createStudent);
};
