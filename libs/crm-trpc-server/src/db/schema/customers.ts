import { sql } from 'drizzle-orm';
import {
  char,
  index,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const customers = pgTable(
  'customers',
  {
    id: serial('id').notNull().primaryKey(),
    lastName: varchar('last_name', { length: 100 }).notNull(),
    firstName: varchar('first_name', { length: 50 }),
    title: varchar('title', { length: 25 }),
    phone: varchar('phone', { length: 25 }),
    email: varchar('email', { length: 50 }),
    street: varchar('street', { length: 50 }),
    zipCode: varchar('zip_code', { length: 25 }),
    locality: varchar('locality', { length: 100 }),
    country: varchar('country', { length: 25 }).default('CH'),
    website: varchar('website', { length: 50 }),
    company: varchar('company', { length: 50 }),
    department: varchar('department', { length: 50 }),
    salutation: text('salutation'),
    language: char('language').default('DE'),
    job: varchar('job', { length: 25 }),
    notes: text('notes'),
    poBox: varchar('po_box', { length: 25 }),
    address: text('address'),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
    fullText: text('full_text').notNull(),
  },
  (table) => ({
    fullTextIndex: index('full_text_index').using(
      'gin',
      sql`to_tsvector('german', ${table.fullText})`
    ),
  })
);
