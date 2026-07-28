// routes/index.ts — mounts all routes.
// GET routes are public (read-only, unauthenticated users can view data).
// POST routes are protected by requireAuth (must have a valid Clerk token).

import { Router } from 'express';
import { employeeController } from '../controllers/employeeController';
import { organizationController } from '../controllers/organizationController';
import { requireAuth } from '../middleware/requireAuth';

const router = Router();

// ── Employees ────────────────────────────────────────────────────────────────
router.get('/departments', employeeController.getDepartments);
router.post('/departments/employees', requireAuth, employeeController.addEmployee);

// ── Organization ─────────────────────────────────────────────────────────────
router.get('/organization', organizationController.getAll);
router.post('/organization/roles', requireAuth, organizationController.addRole);

export default router;
