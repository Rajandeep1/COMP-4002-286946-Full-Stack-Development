---
Setup
1. Create a Clerk application
Go to https://dashboard.clerk.com and create a new app
Copy your Publishable Key and Secret Key
2. Set environment variables
```bash
cp .env.example .env
```
Fill in your `.env`:
```
DATABASE\_URL="postgresql://postgres:postgres@localhost:5432/pixell\_river?schema=public"
VITE\_CLERK\_PUBLISHABLE\_KEY=pk\_test\_your\_key\_here
CLERK\_SECRET\_KEY=sk\_test\_your\_key\_here
PORT=3001
FRONTEND\_ORIGIN=http://localhost:5173
```
3. Start Postgres (Docker)
```bash
docker run --name pixell-postgres \\
  -e POSTGRES\_PASSWORD=postgres \\
  -e POSTGRES\_DB=pixell\_river \\
  -p 5432:5432 \\
  -d postgres:16
```
4. Install and migrate
```bash
npm install
npx prisma migrate dev --name init
```
5. Run (two terminals)
```bash
# Terminal 1 — backend
cd backend \&\& npm install \&\& npm run dev

# Terminal 2 — frontend
npm run dev
```
---
