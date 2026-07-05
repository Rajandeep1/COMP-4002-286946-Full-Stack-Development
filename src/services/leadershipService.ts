// leadershipService — manages business logic for LeadershipMember operations.
// Sprint 4 refactor: all methods are now async since the repository
// calls Prisma (network/IO operations).
//
// Responsibilities (this layer only):
//   - Validate that firstName has at least 3 characters
//   - Validate that the roleTitle is not already occupied
//   - Delegate creation to leadershipRepo
//   - Return a typed result describing success or what went wrong

import { LeadershipMember, Role } from '../types';
import leadershipRepo from '../repositories/leadershipRepo';

export interface LeadershipServiceResult {
  success: boolean;
  leadership?: Role[];
  errors?: {
    firstName?: string;
    role?: string;
  };
}

// Converts a LeadershipMember (split names, roleTitle) to the Role shape
// expected by the front-end's RoleRow component (name string + role string).
const toRole = (member: LeadershipMember): Role => ({
  id: member.id,
  name: member.lastName
    ? `${member.firstName} ${member.lastName}`
    : member.firstName,
  role: member.roleTitle,
});

const leadershipService = {
  async getAll(): Promise<Role[]> {
    const members = await leadershipRepo.getAll();
    return members.map(toRole);
  },

  async createRole(
    firstName: string,
    lastName: string,
    roleTitle: string
  ): Promise<LeadershipServiceResult> {
    const errors: LeadershipServiceResult['errors'] = {};

    // Rule 1: first name must be at least 3 characters
    if (!firstName || firstName.trim().length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }

    // Rule 2: role title must not already be occupied
    if (!roleTitle || !roleTitle.trim()) {
      errors.role = 'Role title is required.';
    } else {
      const occupied = await leadershipRepo.findByRoleTitle(roleTitle.trim());
      if (occupied) {
        errors.role = `The role "${roleTitle.trim()}" is already occupied by ${toRole(occupied).name}.`;
      }
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    const updated = await leadershipRepo.add(
      firstName.trim(),
      lastName.trim() || null,
      roleTitle.trim()
    );

    return { success: true, leadership: updated.map(toRole) };
  },
};

export default leadershipService;
