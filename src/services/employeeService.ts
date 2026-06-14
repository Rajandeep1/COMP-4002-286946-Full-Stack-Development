// employeeService — manages business logic for Employee operations.
//
// Responsibilities (this layer only):
//   - Validate that a department exists before adding to it
//   - Validate that the employee's first name has at least 3 characters
//   - If valid, delegate the actual creation to employeeRepo
//   - Return a result object describing success or what went wrong
//
// This layer does NOT manage state, UI messages, or raw data storage.
// It knows the rules; the repo knows the data; the hook knows the UI.

import { Department, Employee } from '../types';
import employeeRepo from '../repositories/employeeRepo';

export interface ServiceResult {
  success: boolean;
  departments?: Department[];   // returned on success for state update
  errors?: {
    firstName?: string;
    department?: string;
  };
}

const employeeService = {
  // Attempts to create a new employee in the given department.
  // Validates all business rules before delegating to the repository.
  createEmployee(departmentName: string, employee: Employee): ServiceResult {
    const errors: ServiceResult['errors'] = {};

    // Rule 1: first name must be at least 3 characters
    if (employee.firstName.trim().length < 3) {
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

    // If any rules failed, return errors without touching the repository
    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    // All validations passed — delegate creation to the repository
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
