# Pixell River Financial 
## Database schema (3NF)
```
Department       — id, name (unique)
Employee         — id, firstName, lastName?, departmentId (FK → Department)
LeadershipMember — id, firstName, lastName?, roleTitle (unique)
```

3NF: every non-key column depends only on its own table's primary key.
Employee stores departmentId (FK) not department attributes — no transitive dependency.
firstName and lastName are separate atomic columns (1NF).
# 1. Install dependencies
npm install

# 2. Run migrations and seed (creates tables + populates all data)
npx prisma migrate dev --name init

# 3. Start the app
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
