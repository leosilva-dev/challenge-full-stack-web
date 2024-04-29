import { app } from 'src/server';
import { createStudent } from './createStudent';

export const studentsRoutes = async () => {
  app.register(createStudent);
};
