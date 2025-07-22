import { FastifyInstance } from 'fastify';
import { studentsController } from '../controllers/students/student.controller';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware';

export const studentsRoutes = async (app: FastifyInstance) => {
  app.post('/students', {
    preHandler: [authMiddleware],
    handler: studentsController.createStudent,
  });

  app.get('/students', {
    preHandler: [authMiddleware],
    handler: studentsController.getAllStudents,
  });

  app.get('/students/:id', {
    preHandler: [authMiddleware],
    handler: studentsController.getStudentById,
  });

  app.put('/students/:id', {
    preHandler: [authMiddleware],
    handler: studentsController.updateStudent,
  });

  app.delete('/students/:id', {
    preHandler: [adminMiddleware],
    handler: studentsController.deleteStudent,
  });
};
