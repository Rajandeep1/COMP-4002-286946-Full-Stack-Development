// index.ts — Express application entry point.

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes';
import leadershipRoutes from './routes/leadershipRoutes';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Vite picks the next free port (5173, 5174, 5175...) if the default is busy,
// so we allow a small range of common dev ports rather than a single origin.
// In production, set FRONTEND_ORIGIN to your deployed front-end's exact URL.
const ALLOWED_ORIGINS = process.env.FRONTEND_ORIGIN
  ? [process.env.FRONTEND_ORIGIN]
  : [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'http://127.0.0.1:5175',
    ];

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman/curl (no origin header at all)
      if (!origin) return callback(null, true);

      // Allow whitelisted local dev origins
      if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);

      // Allow any GitHub Codespaces forwarded origin (*.app.github.dev) —
      // Codespaces assigns a unique random hostname per Codespace, so we
      // can't whitelist it by exact string match the way we do for localhost.
      if (/^https:\/\/.*\.app\.github\.dev$/.test(origin)) return callback(null, true);

      console.warn(`[CORS] Blocked request from origin: ${origin}`);
      callback(new Error(`CORS blocked: ${origin}`));
    },
  })
);
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
// Health check — visit http://localhost:3001/api/health to confirm server is up
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Pixell River backend is running.' });
});

app.use('/api', employeeRoutes);
app.use('/api', leadershipRoutes);

// Root — friendly message instead of "Cannot GET /"
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Pixell River Financial API',
    endpoints: [
      'GET  /api/health',
      'GET  /api/departments',
      'POST /api/departments/:departmentName/employees',
      'GET  /api/leadership',
      'POST /api/leadership',
    ],
  });
});

// 404 — catch any route that was not matched above
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found.' });
});

// ── Error handler ─────────────────────────────────────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[ERROR]', err.message);
  res.status(500).json({ error: 'Internal server error.' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Pixell River backend running at http://localhost:${PORT}`);
  console.log(`    Try: http://localhost:${PORT}/api/health`);
  console.log(`    Try: http://localhost:${PORT}/api/departments`);
});
