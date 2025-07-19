import { z } from 'zod';

export const createStudentSchema = z.object({
  name: z.string().min(1, { error: 'O nome é obrigatório e não pode ficar vazio.' }),
  email: z.email({ error: 'O formato do e-mail é inválido.' }),
  cpf: z
    .string()
    .length(11, { error: 'O CPF deve conter exatamente 11 dígitos numéricos.' })
    .regex(/^\d+$/, { message: 'O CPF deve conter apenas números.' }),
  ra: z.string().min(1, { error: 'O RA é obrigatório e não pode ficar vazio.' }),
});
