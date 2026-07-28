// employeeRepo.ts — backend Prisma data access for Employees and Departments

import prisma from '../prisma/client';

const employeeRepo = {
  async getDepartments() {
    return prisma.department.findMany({
      include: { employees: true },
      orderBy: { name: 'asc' },
    });
  },

  async findDepartmentByName(name: string) {
    return prisma.department.findUnique({
      where: { name },
      include: { employees: true },
    });
  },

  async addEmployee(departmentId: number, firstName: string, lastName: string | null) {
    await prisma.employee.create({
      data: { firstName, lastName, departmentId },
    });
    return employeeRepo.getDepartments();
  },
};

export default employeeRepo;
