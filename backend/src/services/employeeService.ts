// employeeService — manages business logic for Employee operations.
//
// Responsibilities (this layer only):
//   - Validate that a department exists before adding to it
//   - Validate that the employee's first name has at least 3 characters
//   - If valid, delegate the actual creation to employeeRepo
//   - Return a result object describing success or what went wrong
//
// This layer does NOT manage HTTP request/response — that belongs to the
// controller. It does NOT manage raw data storage — that belongs to the repo.

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
  getDepartments(): Department[] {
    return employeeRepo.getDepartments();
  },

  createEmployee(departmentName: string, employee: Employee): ServiceResult {
    const errors: ServiceResult['errors'] = {};

    // Rule 1: first name must be at least 3 characters
    if (!employee.firstName || employee.firstName.trim().length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }

    // Rule 2: department must exist in the repository
    const departments = employeeRepo.getDepartments();
    const departmentExists = departments.some(
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

    const updated = employeeRepo.addEmployee(departmentName, employee);

    if (!updated) {
      return {
        success: false,
        errors: { department: 'Failed to add employee. Department not found.' },
      };
    }

    return { success: true, departments: updated };
  },
};

export default employeeService;
