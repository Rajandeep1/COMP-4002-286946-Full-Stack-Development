# Pixell River Financial — Lab 5.2

## Setup

### 1\. Create a Clerk application

1. Go to https://dashboard.clerk.com and create a new app
2. Copy your **Publishable Key** and **Secret Key**

### 2\. Set environment variables

```bash
cp .env.example .env
```

Fill in your `.env`:

```
DATABASE\\\_URL="postgresql://postgres:postgres@localhost:5432/pixell\\\_river?schema=public"
VITE\\\_CLERK\\\_PUBLISHABLE\\\_KEY=pk\\\_test\\\_your\\\_key\\\_here
CLERK\\\_SECRET\\\_KEY=sk\\\_test\\\_your\\\_key\\\_here
PORT=3001
FRONTEND\\\_ORIGIN=http://localhost:5173
```

### 3\. Start Postgres (Docker)

```bash
docker run --name pixell-postgres \\\\
  -e POSTGRES\\\_PASSWORD=postgres \\\\
  -e POSTGRES\\\_DB=pixell\\\_river \\\\
  -p 5432:5432 \\\\
  -d postgres:16
```

### 4\. Install and migrate

```bash
npm install
npx prisma migrate dev --name init
```

### 5\. Run (two terminals)

```bash
# Terminal 1 — backend
cd backend \\\&\\\& npm install \\\&\\\& npm run dev

# Terminal 2 — frontend
npm run dev
```

\---

## Auth flow

|State|Employees page|Organization page|
|-|-|-|
|Signed out|Can view list|Can view list|
|Signed out|Sees LoginPrompt|Sees LoginPrompt|
|Signed in|Sees Add Employee form|Sees Add Role form|
|Signed in|POST includes Bearer token|POST includes Bearer token|
|Backend|GET /api/departments — public|GET /api/organization — public|
|Backend|POST /api/departments/employees — requireAuth|POST /api/organization/roles — requireAuth|

\---

## GitHub Codespaces notes

* Port 3001 must be set to **Public** in the PORTS tab
* The frontend auto-detects the Codespaces hostname and rewrites API URLs
* In `.env`, set `FRONTEND\\\_ORIGIN` to your Codespaces frontend URL

