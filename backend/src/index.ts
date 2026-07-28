// backend/src/index.ts — Express entry point for Lab 5.1

import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes/index';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

const ALLOWED_ORIGINS = process.env.FRONTEND_ORIGIN
  ? [process.env.FRONTEND_ORIGIN]
  : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
    if (/^https:\/\/.*\.app\.github\.dev$/.test(origin)) return callback(null, true);
    callback(new Error(`CORS blocked: ${origin}`));
  },
}));

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api', routes);

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Pixell River Financial API — Lab 5.1',
    endpoints: [
      'GET  /api/departments         (public)',
      'POST /api/departments/employees (requires Clerk auth)',
      'GET  /api/organization        (public)',
      'POST /api/organization/roles  (requires Clerk auth)',
    ],
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[ERROR]', err.message);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`✅  Backend running at http://localhost:${PORT}`);
});
