import { LoginInput, RegisterInput } from '../validation-schemas/auth.schema';

export type LoginDto = LoginInput;
export type RegisterDto = RegisterInput;

export interface AuthResponseDto {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}
