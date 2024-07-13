import { z } from 'zod';
import { trpc } from '../../trpc';
import { CustomerInteractor } from '../../db';
import { CustomerItemOrderBy } from '../../dto';
// import { OrderByEnum } from '../../db/interactors/customerInteractor.types';

export const customersRouter = trpc.router({
  all: trpc.procedure
    .input(
      z.object({
        limit: z.number().default(20),
        offset: z.number().default(0),
        orderBy: CustomerItemOrderBy,
        // order: OrderByEnum.optional().default(`asc`),
      })
    )
    .query(({ input: { limit, offset, orderBy } }) => {
      return CustomerInteractor.all({
        limit,
        offset,
        orderBy,
      });
    }),
});
