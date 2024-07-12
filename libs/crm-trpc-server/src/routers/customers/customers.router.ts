import { z } from 'zod';
import { trpc } from '../../trpc';
import { CustomerInteractor } from '../../db';

export const customersRouter = trpc.router({
  all: trpc.procedure
    .input(
      z.object({
        limit: z.number().optional().default(20),
        offset: z.number().optional().default(0),
      })
    )
    .query(({ input: { limit, offset } }) => {
      return CustomerInteractor.all({
        limit,
        offset,
      });
    }),
});
