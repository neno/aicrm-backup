import Db from '../db-client';
import { customers } from './data/customers';
import { customers as customersSchema } from '../schema';
import { sql } from 'drizzle-orm';

export default async function seedCustomers(db: Db) {
  await db.insert(customersSchema).values(customers);
  await db.execute(
    sql.raw(
      `UPDATE customers SET full_text = CONCAT(last_name, ' ', first_name, ' ', company, ' ', locality)`
    )
  );
}
