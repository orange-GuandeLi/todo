dev:
	clear && bun --watch server/index.ts

db-g:
	bunx drizzle-kit generate

db-m:
	bun db/migrate.ts

db: db-g db-m

test:
	bun test

build-c:
	cd client && make build && cd ..

prod:
	bun i
	make db-g
	make db-m
	make build-c
	make