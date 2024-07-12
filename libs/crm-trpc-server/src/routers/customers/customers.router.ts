import { trpc } from '../../trpc';

export const customersRouter = trpc.router({
  all: trpc.procedure.query(() => []),
});
