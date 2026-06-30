// employeeController — translates HTTP requests into service calls,
// and service results into HTTP responses.
//
// Responsibilities (this layer only):
//   - Read data out of req.params / req.body
//   - Call the appropriate employeeService method
//   - Choose the correct HTTP status code and shape the JSON response
//
// This layer does NOT contain business rules (that's the service) and does
// NOT touch the data store directly (that's the repository).

import { Request, Response } from 'express';
import employeeService from '../services/employeeService';

const employeeController = {
  // GET /api/departments
  getDepartments(_req: Request, res: Response): void {
    const departments = employeeService.getDepartments();
    res.status(200).json(departments);
  },

  // POST /api/departments/:departmentName/employees
  addEmployee(req: Request, res: Response): void {
    const { departmentName } = req.params;
    const { firstName, lastName } = req.body ?? {};

    // Basic shape validation belongs to the controller — it's about whether
    // the request is well-formed, not about business rules.
    if (typeof firstName !== 'string') {
      res.status(400).json({ errors: { firstName: 'firstName is required and must be a string.' } });
      return;
    }

    const employee = {
      firstName,
      ...(typeof lastName === 'string' && lastName.trim() ? { lastName } : {}),
    };

    const result = employeeService.createEmployee(departmentName, employee);

    if (!result.success) {
      res.status(400).json({ errors: result.errors });
      return;
    }

    res.status(201).json(result.departments);
  },
};

export default employeeController;
