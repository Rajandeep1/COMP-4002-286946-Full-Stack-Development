// employeeRepo — sole manager of Department and Employee data.
// Sprint 4 refactor: all reads/writes now go through Prisma to the
// PostgreSQL database instead of an in-memory array.
//
// Responsibilities (this layer only):
//   - Translate CRUD operations into Prisma client calls
//   - Return typed objects to the service layer
//
// This layer does NOT validate business rules — that belongs to employeeService.

import prisma from '../prisma/client';
import { Department } from '../types';

const employeeRepo = {
  // Returns all departments with their employees included.
  async getDepartments(): Promise<Department[]> {
    return prisma.department.findMany({
      include: { employees: true },
      orderBy: { name: 'asc' },
    });
  },

  // Returns a single department by name, or null if not found.
  async findDepartmentByName(name: string): Promise<Department | null> {
    return prisma.department.findUnique({
      where: { name },
      include: { employees: true },
    });
  },

  // Adds a new Employee to the given department (by departmentId).
  // Returns the full updated list of departments, or null if dept not found.
  async addEmployee(
    departmentId: number,
    firstName: string,
    lastName: string | null
  ): Promise<Department[] | null> {
    const dept = await prisma.department.findUnique({ where: { id: departmentId } });
    if (!dept) return null;

    await prisma.employee.create({
      data: { firstName, lastName, departmentId },
    });

    return employeeRepo.getDepartments();
  },
};

export default employeeRepo;
