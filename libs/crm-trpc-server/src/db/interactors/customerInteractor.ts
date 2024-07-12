import { eq, sql } from 'drizzle-orm';
import db from '../db-client';
import { customers } from '../schema';
import {
  CreateCustomer,
  FindCustomerById,
  GetAllCustomers,
  SearchCustomers,
} from './customerInteractor.types';

export const all = GetAllCustomers.implement(async ({ limit, offset }) => {
  const customersList = await db
    .select()
    .from(customers)
    .offset(offset)
    .limit(limit);
  return customersList;
});

export const search = SearchCustomers.implement(
  async ({ searchString, offset, limit }) => {
    const customersFound = await db
      .select()
      .from(customers)
      .where(
        sql.raw(
          `to_tsvector(full_text) @@ to_tsquery("${searchString}:*") OFFSET=${offset} LIMIT=${limit}`
        )
      );

    return customersFound;
  }
);

export const create = CreateCustomer.implement(async (input) => {
  const res = await db
    .insert(customers)
    .values(input)
    .returning({ id: customers.id });
  return res[0];
});

export const findById = FindCustomerById.implement(async (input) => {
  const customer = await db.query.customers.findFirst({
    where: eq(customers.id, input),
  });
  return customer;
});
