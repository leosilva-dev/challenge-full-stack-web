import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { studentsController } from 'src/controllers/students';
import { ICreateParams } from 'src/controllers/students/create';
import { StudentRepository } from 'src/repositories/StudentRepository';
import { responseBadRequest, sendOkResponse } from 'src/utils/replyResponse';

export const createStudent = async (app: FastifyInstance) => {
  app.post('/alunos', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const params = request.body as ICreateParams;
      const repository = new StudentRepository();
      const result = await studentsController.create(params, repository);
      sendOkResponse(reply, result);
    } catch (error: any) {
      responseBadRequest(reply, error.message);
    }
  });
};
