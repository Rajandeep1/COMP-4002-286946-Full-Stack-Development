// employeeRoutes — maps URLs + HTTP verbs to employeeController methods.
//
// Only two routes exist because the front-end's employeeRepo only ever
// needs to GET the department list and POST a new employee. There is no
// PUT/DELETE route because nothing in the front-end calls for one.

import { Router } from 'express';
import employeeController from '../controllers/employeeController';

const router = Router();

// GET /api/departments — fetch all departments and their employees
router.get('/departments', employeeController.getDepartments);

// POST /api/departments/:departmentName/employees — add a new employee
router.post('/departments/:departmentName/employees', employeeController.addEmployee);

export default router;
