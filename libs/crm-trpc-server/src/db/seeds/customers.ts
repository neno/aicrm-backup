import { sql } from 'drizzle-orm';
import { customers } from './data/customers';
import { customers as customersSchema } from '../schema';
import { DB } from '../db-client';

export default async function seedCustomers(db: DB) {
  await db.insert(customersSchema).values(customers);
  await db.execute(
    sql.raw(
      `UPDATE customers SET full_text = CONCAT(last_name, ' ', first_name, ' ', company, ' ', locality)`
    )
  );
}
