import { FastifyReply } from 'fastify';

export const sendOkResponse = <T>(reply: FastifyReply, data: T): void => {
  if (data && typeof data === 'object' && 'data' in data && 'pagination' in data) {
    reply.code(200).send(data);
  } else {
    reply.code(200).send({ data });
  }
};

export const sendBadRequest = (reply: FastifyReply, error: string): void => {
  reply.code(400).send({ error });
};

export const sendNotFound = (reply: FastifyReply, error: string = 'Route not found'): void => {
  reply.code(404).send({ error });
};

export const sendCreated = <T>(reply: FastifyReply, data: T): void => {
  reply.code(201).send({ data });
};

export const sendNoContent = (reply: FastifyReply): void => {
  reply.code(204).send();
};

export class HttpResponse {
  static success<T>(
    reply: FastifyReply,
    data: T,
    message?: string,
    statusCode: number = 200,
  ): void {
    reply.code(statusCode).send({
      success: true,
      message,
      data,
    });
  }

  static error(reply: FastifyReply, message: string, statusCode: number = 500): void {
    reply.code(statusCode).send({
      success: false,
      message,
    });
  }
}
