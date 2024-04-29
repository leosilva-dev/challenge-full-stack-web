import { app } from 'src/server';
import { createStudent } from './createStudent';
import { getAll } from './getAll';

export const studentsRoutes = async () => {
  app.register(getAll);
  app.register(createStudent);
};
