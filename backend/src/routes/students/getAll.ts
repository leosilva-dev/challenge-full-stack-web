import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { studentsController } from 'src/controllers/students';
import { StudentRepository } from 'src/repositories/StudentRepository';
import { responseBadRequest, sendOkResponse } from 'src/utils/replyResponse';

export const getAll = async (app: FastifyInstance) => {
  app.get('/alunos', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const queryParams = request.query as Record<string, string | undefined>;
      const page = queryParams.page ? parseInt(queryParams.page) : 1;
      const pageSize = queryParams.pageSize ? parseInt(queryParams.pageSize) : 10;
      const search = queryParams.search ? queryParams.search : '';

      const repository = new StudentRepository();
      const result = await studentsController.getAll(repository, page, pageSize, search);
      sendOkResponse(reply, result);
    } catch (error: any) {
      responseBadRequest(reply, error.message);
    }
  });
};
