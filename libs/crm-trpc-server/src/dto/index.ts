import { z } from 'zod';

export * from './customers.dto';

export const OrderDirEnum = z.enum(['asc', 'desc']);
