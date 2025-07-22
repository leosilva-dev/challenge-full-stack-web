import { FastifyInstance } from 'fastify';
import { studentsRoutes } from './students.route';
import { authRoutes } from './auth.route';

export const registerRoutes = (app: FastifyInstance) => {
  app.register(authRoutes);
  app.register(studentsRoutes);
};
