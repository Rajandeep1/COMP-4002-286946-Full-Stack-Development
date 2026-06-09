// employeeRepo — the sole manager of Department and Employee data.
//
// Responsibilities (this layer only):
//   - Hold the in-memory store of departments and their employees
//   - Return departments/employees on request
//   - Perform the actual mutation of adding an employee to a department
//
// This layer does NOT validate business rules — that belongs to the service.
// Nothing in the app should import raw department data directly; all
// reads and writes go through this repository.

import { Department, Employee } from '../types';
import initialDepartments from '../data/departments';

// In-memory store — seeded once from the static data file.
// The data file is only ever touched here.
let store: Department[] = initialDepartments.map((dept) => ({
  ...dept,
  employees: [...dept.employees],
}));

const employeeRepo = {
  // Returns a copy of all departments with their employees.
  getDepartments(): Department[] {
    return store.map((dept) => ({ ...dept, employees: [...dept.employees] }));
  },

  // Adds the given employee to the named department.
  // Returns the updated list of all departments, or null if the department
  // was not found (the service validates existence before calling this).
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
