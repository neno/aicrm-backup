import { customersTestData } from '../../db';
import { trpc } from '../../trpc';
import { customersRouter } from './customers.router';

const { createCallerFactory } = trpc;
const createCaller = createCallerFactory(customersRouter);
const caller = createCaller({ session: null });

describe.only('customersRouter', () => {
  it('should exist', () => {
    expect(customersRouter).toBeTruthy();
  });

  it('should get all customers', async () => {
    const input = {
      limit: 20,
      offset: 0,
      orderBy: 'id' as const,
    };
    const allCustomers = await caller.all(input);

    expect(allCustomers).toBeTruthy();
    expect(allCustomers.length).toBe(input.limit);
    expect(allCustomers[input.limit - 1].id).toEqual(
      customersTestData[input.limit - 1].id
    );
  });
});
