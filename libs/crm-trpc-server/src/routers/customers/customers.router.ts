import { z } from 'zod';
import { trpc } from '../../trpc';
import { CustomerItemOrderBy } from '../../dto';
import { CustomersInteractor } from '../../interactors/customers/customersInteractor';
// import { db } from '../../db/db-client';

// const customerInteractor = makeCustomerInteractor(db);

const makeCustomersRouter = (customersInteractor: CustomersInteractor) =>
  trpc.router({
    all: trpc.procedure
      .input(
        z.object({
          limit: z.number().default(20),
          offset: z.number().default(0),
          orderBy: CustomerItemOrderBy,
        })
      )
      .query(({ input: { limit, offset, orderBy } }) => {
        return customersInteractor.all({
          limit,
          offset,
          orderBy,
        });
      }),
  });

export default makeCustomersRouter;
