// leadershipService — manages business logic for Role (leadership)
// operations on the front-end. Performs the same validation as the
// back-end for instant feedback, then calls the repository (which now
// hits the network) to perform the actual creation. The back-end
// re-validates everything independently.
//
// Responsibilities (this layer only):
//   - Validate that the person's first name has at least 3 characters
//   - Validate that the specified role title is not already occupied
//     (checked against the last-known list)
//   - If all rules pass, delegate creation to leadershipRepo
//   - Return a typed result describing success or what went wrong

import { Role } from '../types';
import leadershipRepo from '../repositories/leadershipRepo';

export interface LeadershipServiceResult {
  success: boolean;
  leadership?: Role[];
  errors?: {
    firstName?: string;
    role?: string;
  };
}

const leadershipService = {
  async getAll(): Promise<Role[]> {
    return leadershipRepo.getAll();
  },

  async createRole(
    firstName: string,
    lastName: string,
    roleTitle: string,
    knownLeadership: Role[]
  ): Promise<LeadershipServiceResult> {
    const errors: LeadershipServiceResult['errors'] = {};

    // Rule 1: first name must be at least 3 characters
    if (firstName.trim().length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }

    // Rule 2: role title must not already be occupied
    if (!roleTitle.trim()) {
      errors.role = 'Role title is required.';
    } else {
      const occupied = knownLeadership.find(
        (r) => r.role.toLowerCase().trim() === roleTitle.toLowerCase().trim()
      );
      if (occupied) {
        errors.role = `The role "${roleTitle.trim()}" is already occupied by ${occupied.name}.`;
      }
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    const updated = await leadershipRepo.add({
      firstName: firstName.trim(),
      lastName: lastName.trim() || undefined,
      role: roleTitle.trim(),
    });

    if (!updated) {
      return {
        success: false,
        errors: { role: 'The server rejected this request. Please check your input and try again.' },
      };
    }

    return { success: true, leadership: updated };
  },
};

export default leadershipService;
