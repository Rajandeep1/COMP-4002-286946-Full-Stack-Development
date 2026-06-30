// employeeRepo — the sole manager of Department and Employee data.
//
// Responsibilities (this layer only):
//   - Hold the in-memory store of departments and their employees
//   - Return departments/employees on request
//   - Perform the actual mutation of adding an employee to a department
//
// This layer does NOT validate business rules — that belongs to the service.
// This layer does NOT know about HTTP — that belongs to the controller.
//
// NOTE: this is temporary in-memory storage, identical in behaviour to the
// front-end repository it replaces. A future lab will swap these internals
// for a real database without changing the public method signatures.

import { Department, Employee } from '../types';
import initialDepartments from '../data/departments';

let store: Department[] = initialDepartments.map((dept) => ({
  ...dept,
  employees: [...dept.employees],
}));

const employeeRepo = {
  getDepartments(): Department[] {
    return store.map((dept) => ({ ...dept, employees: [...dept.employees] }));
  },

  addEmployee(departmentName: string, employee: Employee): Department[] | null {
    const index = store.findIndex((dept) => dept.name === departmentName);

    if (index === -1) return null;

    store = store.map((dept, i) =>
      i === index
        ? { ...dept, employees: [...dept.employees, employee] }
        : dept
    );

    return employeeRepo.getDepartments();
  },
};

export default employeeRepo;
