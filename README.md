# Pixell River Financial — Lab 4.2

Extends Lab 3.2 by replacing in-memory data with a PostgreSQL database via Prisma ORM.

## Database schema (3NF)

```
Department       — id, name (unique)
Employee         — id, firstName, lastName?, departmentId (FK → Department)
LeadershipMember — id, firstName, lastName?, roleTitle (unique)
```

3NF: every non-key column depends only on its own table's primary key.
Employee stores departmentId (FK) not department attributes — no transitive dependency.
firstName and lastName are separate atomic columns (1NF).

---

## Setup — Local PostgreSQL via Docker

```bash
# 1. Start Postgres container
docker run --name pixell-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=pixell_river \
  -p 5432:5432 \
  -d postgres:16

# 2. Install dependencies
npm install

# 3. Run migrations and seed (creates tables + populates all data)
npx prisma migrate dev --name init

# 4. Start the app
npm run dev
```

## Setup — GitHub Codespaces (SQLite fallback)

Change schema.prisma provider to "sqlite" and DATABASE_URL to "file:./dev.db", then:
```bash
npm install
npx prisma migrate dev --name init
npm run dev
```

## Setup — Vercel + Neon Postgres (production)

1. Vercel project → Integrations → add Neon Postgres
2. Neon sets DATABASE_URL automatically in Vercel environment variables
3. Add to vercel.json buildCommand:
   "npx prisma generate && npx prisma migrate deploy && npm run build"

## Prisma commands

| Command | Purpose |
|---|---|
| npx prisma migrate dev --name init | Create tables + seed |
| npx prisma db seed | Seed only |
| npx prisma studio | Browse DB in GUI |
| npx prisma generate | Regenerate Prisma client |
