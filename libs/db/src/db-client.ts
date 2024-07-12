import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import env from '../env';

export const connection = postgres(env.DATABASE_URL, {
  max: env.DB_MIGRATING || env.DB_SEEDING ? 1 : undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onnotice: env.DB_SEEDING ? () => {} : undefined,
});

export const db = drizzle(connection, {
  schema,
  logger: true,
});

export type db = typeof db;

export default db;
