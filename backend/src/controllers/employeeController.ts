// controllers/employeeController.ts

import { Request, Response } from 'express';
import { employeeService } from '../services/employeeService';

export const employeeController = {
  async getDepartments(_req: Request, res: Response): Promise<void> {
    const departments = await employeeService.getDepartments();
    res.status(200).json(departments);
  },

  async addEmployee(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, departmentName } = req.body ?? {};

    if (typeof firstName !== 'string') {
      res.status(400).json({ errors: { firstName: 'firstName is required.' } });
      return;
    }

    const result = await employeeService.createEmployee(
      departmentName,
      firstName,
      typeof lastName === 'string' ? lastName : null
    );

    if (!result.success) {
      res.status(400).json({ errors: result.errors });
      return;
    }

    res.status(201).json(result.departments);
  },
};
