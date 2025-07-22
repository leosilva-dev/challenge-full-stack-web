import { FastifyInstance } from 'fastify';
import { AuthController } from '../controllers/auth/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const authController = new AuthController();

export const authRoutes = (app: FastifyInstance) => {
  app.post('/auth/register', {
    handler: authController.register.bind(authController),
  });

  app.post('/auth/login', {
    handler: authController.login.bind(authController),
  });

  app.get('/auth/me', {
    preHandler: [authMiddleware],
    handler: authController.me.bind(authController),
  });
};
