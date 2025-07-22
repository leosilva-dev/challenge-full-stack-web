import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from '../services/auth/auth.service';
import { HttpResponse } from '../helpers/httpResponse';

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return HttpResponse.error(reply, 'Token de acesso não fornecido', 401);
    }

    const token = authHeader.replace('Bearer ', '');

    if (!token) {
      return HttpResponse.error(reply, 'Token de acesso inválido', 401);
    }

    const authService = new AuthService();
    const decoded = await authService.verifyToken(token);

    const user = await authService.getUserById(decoded.userId);

    if (!user) {
      return HttpResponse.error(reply, 'Usuário não encontrado', 401);
    }

    (request as any).user = user;

    return;
  } catch (error) {
    return HttpResponse.error(reply, 'Token de acesso inválido', 401);
  }
}

export async function adminMiddleware(request: FastifyRequest, reply: FastifyReply) {
  await authMiddleware(request, reply);

  const user = (request as any).user;

  if (user.role !== 'ADMIN') {
    return HttpResponse.error(reply, 'Acesso negado. Permissões de administrador necessárias', 403);
  }
}
