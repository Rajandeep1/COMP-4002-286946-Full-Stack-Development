# Pixell River Financial — Lab 4.1 (Monorepo)

This repository is split into a `frontend/` (React + Vite + TypeScript) and a
`backend/` (Express + TypeScript) application. The front-end now requests all
Employee and Role data from the back-end over HTTP, instead of holding it in
local in-memory state.

```
fs_lab-4.1/
├── frontend/      React/Vite app — UI, hooks, services, repositories (fetch-based)
└── backend/       Express app — routes, controllers, services, repositories (in-memory)
```

## Running locally
Running backend

https://glowing-space-robot-694grxpxp47p25wgj-3001.app.github.dev/

Running backend

https://glowing-space-robot-694grxpxp47p25wgj-5173.app.github.dev/



we need **two terminals** — one for each app.

### 1. Start the back-end
```bash
cd backend
npm install
npm run dev
```
This starts the Express server at `http://localhost:3001`.

### 2. Start the front-end
```bash
cd frontend
npm install
npm run dev
```
This starts the Vite dev server at `http://localhost:5173`.

> The front-end's repositories call `http://localhost:3001/api/...` directly.
> Make sure the back-end is running first, or the Employees/Organization
> pages will show a "Could not load..." error.

## Back-end API

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/departments` | Fetch all departments and their employees |
| POST | `/api/departments/:departmentName/employees` | Add a new employee to a department |
| GET | `/api/leadership` | Fetch all leadership/organization entries |
| POST | `/api/leadership` | Add a new leadership entry |
| GET | `/api/health` | Health check |

Only the routes the front-end actually calls exist — no DELETE or PUT routes
were created since nothing in the UI requires them yet.

## Architecture — Back-end

The back-end follows the **Route → Controller → Service → Repository** pattern:

```
routes/employeeRoutes.ts        — maps HTTP verb + URL to a controller method
  └─ controllers/employeeController.ts   — parses req/res, calls the service
       └─ services/employeeService.ts    — business rules (validation)
            └─ repositories/employeeRepo.ts — in-memory data storage
```

This mirrors the **Hook → Service → Repository** pattern already used on the
front-end, just with an HTTP layer (routes + controllers) added in front of it.

## CORS

The back-end only accepts cross-origin requests from `http://localhost:5173`
(the front-end dev server). Requests with no `Origin` header — like those
from Postman or `curl` — are also allowed, since these are development tools
rather than unauthorized browser-based clients.

## Temporary data

The back-end's repositories still use in-memory arrays seeded from
`backend/src/data/departments.ts` and `backend/src/data/leadership.ts` — the
same temporary data used throughout previous labs. A future lab will swap
these for a real database without changing the repository's public methods.
