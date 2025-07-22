import { User } from '@prisma/client';
import { UserRepositoryInterface } from '../../interfaces/users/user.repository.interface';
import { prisma } from '../../lib/prisma';

export class UserRepository implements UserRepositoryInterface {
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: { email: string; password: string; name: string }): Promise<User> {
    return await prisma.user.create({
      data,
    });
  }
}
