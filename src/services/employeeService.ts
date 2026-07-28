// employeeService — async business logic for Employee operations.
// Now accepts a token parameter for authenticated POST requests.

import { Department } from '../types';
import employeeRepo from '../repositories/employeeRepo';

export interface ServiceResult {
  success: boolean;
  departments?: Department[];
  errors?: { firstName?: string; department?: string };
}

const employeeService = {
  async getDepartments(): Promise<Department[]> {
    return employeeRepo.getDepartments();
  },

  async createEmployee(
    departmentName: string,
    firstName: string,
    lastName: string | null,
    token: string
  ): Promise<ServiceResult> {
    const errors: ServiceResult['errors'] = {};

    if (!firstName || firstName.trim().length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }
    if (!departmentName) {
      errors.department = 'Please select a department.';
    }
    if (Object.keys(errors).length > 0) return { success: false, errors };

    const updated = await employeeRepo.addEmployee(
      departmentName,
      firstName.trim(),
      lastName ? lastName.trim() : null,
      token
    );

    if (!updated) {
      return { success: false, errors: { department: 'Server rejected the request.' } };
    }

    return { success: true, departments: updated };
  },
};

export default employeeService;
