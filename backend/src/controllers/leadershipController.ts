// leadershipController — translates HTTP requests into service calls,
// and service results into HTTP responses.
//
// Responsibilities (this layer only):
//   - Read data out of req.body
//   - Call the appropriate leadershipService method
//   - Choose the correct HTTP status code and shape the JSON response
//
// This layer does NOT contain business rules (that's the service) and does
// NOT touch the data store directly (that's the repository).

import { Request, Response } from 'express';
import leadershipService from '../services/leadershipService';

const leadershipController = {
  // GET /api/leadership
  getAll(_req: Request, res: Response): void {
    const leadership = leadershipService.getAll();
    res.status(200).json(leadership);
  },

  // POST /api/leadership
  createRole(req: Request, res: Response): void {
    const { firstName, lastName, role } = req.body ?? {};

    if (typeof firstName !== 'string' || typeof role !== 'string') {
      res.status(400).json({
        errors: {
          firstName: typeof firstName !== 'string' ? 'firstName is required and must be a string.' : undefined,
          role: typeof role !== 'string' ? 'role is required and must be a string.' : undefined,
        },
      });
      return;
    }

    const result = leadershipService.createRole(
      firstName,
      typeof lastName === 'string' ? lastName : '',
      role
    );

    if (!result.success) {
      res.status(400).json({ errors: result.errors });
      return;
    }

    res.status(201).json(result.leadership);
  },
};

export default leadershipController;
