import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';
import { AuthService } from '../../services/auth/auth.service';
import {
  loginSchema,
  registerSchema,
  LoginInput,
  RegisterInput,
} from '../../validation-schemas/auth.schema';
import { HttpResponse } from '../../helpers/httpResponse';
import { HttpError } from '../../helpers/httpError';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      const validatedData: RegisterInput = registerSchema.parse(request.body);
      const result = await this.authService.register(validatedData);

      return HttpResponse.success(reply, result, 'Usuário registrado com sucesso', 201);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return HttpResponse.error(reply, error.issues[0].message, 400);
      }
      if (error instanceof HttpError) {
        return HttpResponse.error(reply, error.message, error.statusCode);
      }
      return HttpResponse.error(reply, 'Erro interno do servidor', 500);
    }
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const validatedData: LoginInput = loginSchema.parse(request.body);
      const result = await this.authService.login(validatedData);

      return HttpResponse.success(reply, result, 'Login realizado com sucesso');
    } catch (error: any) {
      if (error instanceof ZodError) {
        return HttpResponse.error(reply, error.issues[0].message, 400);
      }
      if (error instanceof HttpError) {
        return HttpResponse.error(reply, error.message, error.statusCode);
      }
      return HttpResponse.error(reply, 'Erro interno do servidor', 500);
    }
  }

  async me(request: FastifyRequest, reply: FastifyReply) {
    try {
      const user = (request as any).user;

      return HttpResponse.success(
        reply,
        {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        'Dados do usuário obtidos com sucesso',
      );
    } catch (error) {
      return HttpResponse.error(reply, 'Erro interno do servidor', 500);
    }
  }
}
