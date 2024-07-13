import { z } from 'zod';
import { Customer, InsertCustomer } from '../entities';
import { CustomerItemDto, CustomerItemOrderBy, OrderDirEnum } from '../../dto';

// export const OrderByEnum = CustomerItemDto;
// export const OrderDirEnum = z.enum(['asc', 'desc']);
// export type OrderDirEndum = z.infer<typeof OrderDirEnum>;

export const GetAllCustomers = z
  .function()
  .args(
    z.object({
      limit: z.number(),
      offset: z.number(),
      orderBy: CustomerItemOrderBy,
      // orderDir: OrderDirEnum,
    })
  )
  .returns(z.promise(CustomerItemDto.array()));

export const SearchCustomers = z
  .function()
  .args(
    z.object({
      searchString: z.string(),
      limit: z.number(),
      offset: z.number(),
      orderBy: CustomerItemOrderBy,
      orderDir: OrderDirEnum,
    })
  )
  .returns(z.promise(CustomerItemDto.array()));

export const CreateCustomer = z
  .function()
  .args(InsertCustomer)
  .returns(z.promise(z.object({ id: z.number() })));

export type CreateCustomer = z.infer<typeof CreateCustomer>;

export const FindCustomerById = z
  .function()
  .args(z.number())
  .returns(z.promise(Customer.or(z.undefined())));
