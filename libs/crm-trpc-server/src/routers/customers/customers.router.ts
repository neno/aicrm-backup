import { z } from 'zod';
import { trpc } from '../../trpc';
import { CustomerItemOrderBy } from '../../dto';
import { customerInteractor } from '../../interactors';

export const customersRouter = trpc.router({
  all: trpc.procedure
    .input(
      z.object({
        limit: z.number().default(20),
        offset: z.number().default(0),
        orderBy: CustomerItemOrderBy,
      })
    )
    .query(({ input: { limit, offset, orderBy } }) => {
      return customerInteractor.all({
        limit,
        offset,
        orderBy,
      });
    }),
});
