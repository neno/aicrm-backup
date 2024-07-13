import { asc, desc, eq, sql } from 'drizzle-orm';
import db from '../../db/db-client';
import { customers } from '../../db/schema';
import {
  CreateCustomer,
  FindCustomerById,
  GetAllCustomers,
  SearchCustomers,
} from './customerInteractor.types';
import { CustomerItemDto, OrderDirEnum } from '../../dto';

export const all = GetAllCustomers.implement(
  async ({ limit, offset, orderBy }) => {
    const customersList = await db
      .select()
      .from(customers)
      .offset(offset)
      .limit(limit)
      .orderBy(asc(customers[orderBy]));
    // .orderBy(
    //   orderDir === OrderDirEnum.Enum.asc
    //     ? asc(customers[orderBy])
    //     : desc(customers[orderBy])
    // );
    return customersList;
  }
);

export const search = SearchCustomers.implement(
  async ({ searchString, offset, limit, orderBy, orderDir }) => {
    const customersFound = await db
      .select()
      .from(customers)
      .where(
        sql.raw(
          `to_tsvector(full_text) @@ to_tsquery("${searchString}:*") OFFSET=${offset} LIMIT=${limit}`
        )
      )
      .offset(offset)
      .limit(limit)
      .orderBy(
        orderDir === OrderDirEnum.Enum.asc
          ? asc(customers[orderBy])
          : desc(customers[orderBy])
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
