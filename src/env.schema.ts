import { z } from 'zod';

export const schema = z.object({
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: 'DATABASE_PORT must be a number',
    })
    .default('5432')
    .transform(Number),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
});
