import { trpc } from '../../trpc';
import { customersRouter } from './customers.router';
import { customersTestData } from '@ai/db';

const { createCallerFactory } = trpc;
const createCaller = createCallerFactory(customersRouter);
const caller = createCaller({ session: null });

describe('customersRouter', () => {
  it('should exist', () => {
    expect(customersRouter).toBeTruthy();
  });

  it('should get all customers', async () => {
    const input = { limit: 20, offset: 20 };
    const allCustomers = await caller.all(input);

    expect(allCustomers).toBeTruthy();
    expect(allCustomers.length).toBe(input.limit);
  });
});
