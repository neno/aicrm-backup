import 'dotenv/config';
import { Table, getTableName, sql } from 'drizzle-orm';
import { connection, db, DB } from './db-client';
import * as schema from './schema';
import * as seeds from './seeds';

(async function () {
  async function resetTable(db: DB, table: Table) {
    return await db.execute(
      sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`)
    );
  }

  for (const table of [schema.customers]) {
    await resetTable(db, table);
  }

  await seeds.customers(db);
  await connection.end();
})();
