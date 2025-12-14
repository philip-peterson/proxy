import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import {  pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  user_id: serial('user_id').primaryKey(),
  email: text('email').notNull(),
});

export const domains = pgTable('domains', {
  domain_id: serial('domain_id').primaryKey(),
  domain_slug: text('domain_slug').notNull(),
  user_id: integer('user_id').notNull().references(() => user.user_id),
  cleartext: text('cleartext').notNull(),
});