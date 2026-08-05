// controllers/organizationController.ts

import { Request, Response } from 'express';
import { organizationService } from '../services/organizationService';

export const organizationController = {
  async getAll(_req: Request, res: Response): Promise<void> {
    const leadership = await organizationService.getAll();
    res.status(200).json(leadership);
  },

  async addRole(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, roleTitle } = req.body ?? {};

    if (typeof firstName !== 'string' || typeof roleTitle !== 'string') {
      res.status(400).json({ errors: { firstName: 'firstName and roleTitle are required.' } });
      return;
    }

    const result = await organizationService.createRole(
      firstName,
      typeof lastName === 'string' ? lastName : '',
      roleTitle
    );

    if (!result.success) {
      res.status(400).json({ errors: result.errors });
      return;
    }

    res.status(201).json(result.leadership);
  },
};
