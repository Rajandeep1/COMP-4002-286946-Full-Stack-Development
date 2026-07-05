// employeeService — manages business logic for Employee operations.
// Sprint 4 refactor: all methods are now async since the repository
// calls Prisma (network/IO operations).
//
// Responsibilities (this layer only):
//   - Validate that a department exists before adding to it
//   - Validate that the employee's first name has at least 3 characters
//   - Delegate creation to employeeRepo
//   - Return a typed result describing success or what went wrong

import { Department } from '../types';
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
    firstName: string,
    lastName: string | null
  ): Promise<ServiceResult> {
    const errors: ServiceResult['errors'] = {};

    // Rule 1: first name must be at least 3 characters
    if (!firstName || firstName.trim().length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }

    // Rule 2: department must exist in the database
    const dept = departmentName
      ? await employeeRepo.findDepartmentByName(departmentName)
      : null;

    if (!dept) {
      errors.department = departmentName
        ? `Department "${departmentName}" does not exist.`
        : 'Please select a department.';
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    const updated = await employeeRepo.addEmployee(
      dept!.id,
      firstName.trim(),
      lastName ? lastName.trim() : null
    );

    if (!updated) {
      return {
        success: false,
        errors: { department: 'Failed to add employee.' },
      };
    }

    return { success: true, departments: updated };
  },
};

export default employeeService;
