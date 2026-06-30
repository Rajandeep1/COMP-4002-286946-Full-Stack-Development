// leadershipRoutes — maps URLs + HTTP verbs to leadershipController methods.
//
// Only two routes exist because the front-end's leadershipRepo only ever
// needs to GET the leadership list and POST a new role/person.

import { Router } from 'express';
import leadershipController from '../controllers/leadershipController';

const router = Router();

// GET /api/leadership — fetch all leadership entries
router.get('/leadership', leadershipController.getAll);

// POST /api/leadership — add a new leadership entry
router.post('/leadership', leadershipController.createRole);

export default router;
