import { FastifyPluginAsync } from 'fastify';
import { notFound } from 'src/utils/replyResponse';

export const handleNotFound: FastifyPluginAsync = async (app): Promise<void> => {
  app.setNotFoundHandler(async (_, reply) => {
    notFound(reply);
  });
};
