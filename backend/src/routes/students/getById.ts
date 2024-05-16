import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { StudentRepository } from 'src/repositories/StudentRepository';
import { IGetByIdParams } from 'src/controllers/students/getById';
import { studentsController } from 'src/controllers/students';
import { responseBadRequest, sendOkResponse } from 'src/utils/replyResponse';

export const getById = async (app: FastifyInstance) => {
  app.get('/alunos/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const params = request.params as IGetByIdParams;
      const repository = new StudentRepository();
      const result = await studentsController.getById(params, repository);
      sendOkResponse(reply, { result });
    } catch (error: any) {
      responseBadRequest(reply, error.message);
    }
  });
};
