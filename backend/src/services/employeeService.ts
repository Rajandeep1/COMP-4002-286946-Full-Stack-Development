// employeeService.ts — business logic for Employee/Department operations

import employeeRepo from '../repositories/employeeRepo';

export interface ServiceResult {
  success: boolean;
  departments?: object[];
  errors?: { firstName?: string; department?: string };
}

export const employeeService = {
  async getDepartments() {
    return employeeRepo.getDepartments();
  },

  async createEmployee(
    departmentName: string,
    firstName: string,
    lastName: string | null
  ): Promise<ServiceResult> {
    const errors: ServiceResult['errors'] = {};

    if (!firstName || firstName.trim().length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }

    const dept = departmentName
      ? await employeeRepo.findDepartmentByName(departmentName)
      : null;

    if (!dept) {
      errors.department = departmentName
        ? `Department "${departmentName}" does not exist.`
        : 'Please select a department.';
    }

    if (Object.keys(errors).length > 0) return { success: false, errors };

    const updated = await employeeRepo.addEmployee(
      dept!.id,
      firstName.trim(),
      lastName ? lastName.trim() : null
    );

    return { success: true, departments: updated };
  },
};
