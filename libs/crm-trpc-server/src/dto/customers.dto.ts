import { Customer } from '../db';
import { z } from 'zod';

export const CustomerItemDto = Customer.pick({
  id: true,
  lastName: true,
  firstName: true,
  company: true,
  locality: true,
  email: true,
  phone: true,
});

export const CustomerItemOrderBy = CustomerItemDto.keyof();
export type CustomerItemOrderBy = z.infer<typeof CustomerItemOrderBy>;

export type CustomerItemDto = z.infer<typeof CustomerItemDto>;
