import { User } from '@prisma/client';

export interface UserRepositoryInterface {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: { email: string; password: string; name: string }): Promise<User>;
}
