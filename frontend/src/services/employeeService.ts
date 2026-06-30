// employeeService — manages business logic for Employee operations on the
// front-end. Performs the same validation as the back-end for instant
// feedback, then calls the repository (which now hits the network) to
// perform the actual creation. The back-end re-validates everything
// independently — this client-side check only improves UX, it is not
// a substitute for server-side validation.
//
// Responsibilities (this layer only):
//   - Validate that a department exists (using the last-known list)
//   - Validate that the employee's first name has at least 3 characters
//   - If valid, delegate the actual creation to employeeRepo
//   - Return a result object describing success or what went wrong
//
// This layer does NOT manage state or raw data storage.

import { Department, Employee } from '../types';
import employeeRepo from '../repositories/employeeRepo';

export interface ServiceResult {
  success: boolean;
  departments?: Department[];
  errors?: {
    firstName?: string;
    department?: string;
  };
}

const employeeService = {
  async getDepartments(): Promise<Department[]> {
    return employeeRepo.getDepartments();
  },

  async createEmployee(
    departmentName: string,
    employee: Employee,
    knownDepartments: Department[]
  ): Promise<ServiceResult> {
    const errors: ServiceResult['errors'] = {};

    // Rule 1: first name must be at least 3 characters
    if (employee.firstName.trim().length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }

    // Rule 2: department must exist (checked against the list already
    // loaded into the page — the back-end re-checks this independently)
    const departmentExists = knownDepartments.some(
      (dept) => dept.name === departmentName
    );

    if (!departmentName || !departmentExists) {
      errors.department = departmentName
        ? `Department "${departmentName}" does not exist.`
        : 'Please select a department.';
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    // All client-side checks passed — delegate to the repository,
    // which sends the request to the back-end for final validation.
    const updated = await employeeRepo.addEmployee(departmentName, employee);

    if (!updated) {
      return {
        success: false,
        errors: { department: 'The server rejected this request. Please check your input and try again.' },
      };
    }

    return { success: true, departments: updated };
  },
};

export default employeeService;
