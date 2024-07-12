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
    const allCustomers = await caller.all();

    expect(allCustomers).toBeTruthy();
    // expect(allCustomers.length).toBe(customersTestData.length);
  });
});
