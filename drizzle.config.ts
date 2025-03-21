import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './db/drizzle',
  schema: './db/schema/*',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DB_FILE!,
  },
});
