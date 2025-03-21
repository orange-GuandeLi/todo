dev:
	clear && bun --watch server/index.ts

db-g:
	bunx drizzle-kit generate

db-m:
	bun db/migrate.ts

test:
	bun test