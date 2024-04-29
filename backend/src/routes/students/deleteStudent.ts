import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

import { StudentRepository } from 'src/repositories/StudentRepository';
import { IDeleteParams } from 'src/controllers/students/deleteById';
import { studentsController } from 'src/controllers/students';

export const deleteStudent = async (app: FastifyInstance) => {
  app.delete('/alunos/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const params = request.params as IDeleteParams;
      const repository = new StudentRepository();
      const result = await studentsController.deleteById(params, repository);
      reply.send({ result });
    } catch (error: any) {
      reply.status(400).send({ error: error.message });
    }
  });
};
