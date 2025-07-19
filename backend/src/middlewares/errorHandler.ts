import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { HttpError } from '../helpers/httpError';

export const errorHandler = (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation failed',
      errors: error.flatten().fieldErrors,
    });
  }

  if (error instanceof HttpError) {
    return reply.status(error.statusCode).send({
      error: error.message,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return reply.status(409).send({
        error: 'Unique constraint failed',
        fields: error.meta?.target,
      });
    }
  }

  console.error('Unexpected error:', error);
  return reply.status(500).send({
    error: 'Internal server error',
  });
};
