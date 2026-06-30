// leadershipService — manages business logic for Role (leadership) operations.
//
// Responsibilities (this layer only):
//   - Validate that the person's first name has at least 3 characters
//   - Validate that the specified role title is not already occupied
//   - If all rules pass, delegate creation to leadershipRepo
//   - Return a typed result describing success or what went wrong
//
// This layer does NOT manage HTTP request/response — that belongs to the
// controller. It does NOT manage raw data storage — that belongs to the repo.

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
  getAll(): Role[] {
    return leadershipRepo.getAll();
  },

  createRole(
    firstName: string,
    lastName: string,
    roleTitle: string
  ): LeadershipServiceResult {
    const errors: LeadershipServiceResult['errors'] = {};

    // Rule 1: first name must be at least 3 characters
    if (!firstName || firstName.trim().length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }

    // Rule 2: role title must not already be occupied
    if (!roleTitle || !roleTitle.trim()) {
      errors.role = 'Role title is required.';
    } else {
      const occupied = leadershipRepo.findByRole(roleTitle.trim());
      if (occupied) {
        errors.role = `The role "${roleTitle.trim()}" is already occupied by ${occupied.name}.`;
      }
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    const fullName = lastName && lastName.trim()
      ? `${firstName.trim()} ${lastName.trim()}`
      : firstName.trim();

    const updated = leadershipRepo.add({ name: fullName, role: roleTitle.trim() });

    return { success: true, leadership: updated };
  },
};

export default leadershipService;
