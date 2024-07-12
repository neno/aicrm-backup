import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { customers } from '../schema/customers';

export const Customer = createSelectSchema(customers);
export type Customer = z.infer<typeof Customer>;

export const InsertCustomer = createInsertSchema(customers);
export type InsertCustomer = z.infer<typeof InsertCustomer>;
