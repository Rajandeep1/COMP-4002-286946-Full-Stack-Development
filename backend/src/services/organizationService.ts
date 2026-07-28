// organizationService.ts — business logic for Organization/Role operations

import organizationRepo from '../repositories/organizationRepo';
import { OrganizationEntry } from '../repositories/organizationRepo';

export interface OrgServiceResult {
  success: boolean;
  leadership?: OrganizationEntry[];
  errors?: { firstName?: string; role?: string };
}

export const organizationService = {
  async getAll(): Promise<OrganizationEntry[]> {
    return organizationRepo.getAll();
  },

  async createRole(
    firstName: string,
    lastName: string,
    roleTitle: string
  ): Promise<OrgServiceResult> {
    const errors: OrgServiceResult['errors'] = {};

    if (!firstName || firstName.trim().length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }

    if (!roleTitle || !roleTitle.trim()) {
      errors.role = 'Role title is required.';
    } else {
      const occupied = await organizationRepo.findRoleByTitle(roleTitle.trim());
      if (occupied) {
        errors.role = `The role "${roleTitle.trim()}" is already occupied.`;
      }
    }

    if (Object.keys(errors).length > 0) return { success: false, errors };

    const leadershipDeptId = await organizationRepo.getLeadershipDeptId();

    const updated = await organizationRepo.addRoleWithEmployee(
      firstName.trim(),
      lastName.trim() || null,
      roleTitle.trim(),
      leadershipDeptId
    );

    return { success: true, leadership: updated };
  },
};
