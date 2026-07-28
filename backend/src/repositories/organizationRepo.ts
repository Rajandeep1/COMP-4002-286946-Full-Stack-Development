// organizationRepo.ts — backend Prisma data access for the Organization page.
// Uses the corrected schema: Role (title only) + EmployeeRole (junction) + Employee.

import prisma from '../prisma/client';

export interface OrganizationEntry {
  id: number;
  name: string;
  role: string;
}

const organizationRepo = {
  // Returns all EmployeeRole entries with their linked Employee and Role.
  // The display shape { id, name, role } matches the front-end's Role interface.
  async getAll(): Promise<OrganizationEntry[]> {
    const entries = await prisma.employeeRole.findMany({
      include: {
        employee: true,
        role: true,
      },
      orderBy: { id: 'asc' },
    });

    return entries.map((entry) => ({
      id: entry.id,
      name: entry.employee.lastName
        ? `${entry.employee.firstName} ${entry.employee.lastName}`
        : entry.employee.firstName,
      role: entry.role.title,
    }));
  },

  // Checks whether a Role with the given title already exists.
  async findRoleByTitle(title: string) {
    return prisma.role.findFirst({
      where: { title: { equals: title, mode: 'insensitive' } },
    });
  },

  // Creates a Role, an Employee (in Leadership dept), and an EmployeeRole link.
  async addRoleWithEmployee(
    firstName: string,
    lastName: string | null,
    roleTitle: string,
    leadershipDeptId: number
  ): Promise<OrganizationEntry[]> {
    const role = await prisma.role.create({ data: { title: roleTitle } });

    const employee = await prisma.employee.create({
      data: { firstName, lastName, departmentId: leadershipDeptId },
    });

    await prisma.employeeRole.create({
      data: { employeeId: employee.id, roleId: role.id },
    });

    return organizationRepo.getAll();
  },

  // Returns (or creates) the Leadership department id used for org entries.
  async getLeadershipDeptId(): Promise<number> {
    const dept = await prisma.department.upsert({
      where: { name: 'Leadership' },
      update: {},
      create: { name: 'Leadership' },
    });
    return dept.id;
  },
};

export default organizationRepo;
