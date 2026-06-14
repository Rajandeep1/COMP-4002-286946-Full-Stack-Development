// leadershipService — manages business logic for Role (leadership) operations.
//
// Responsibilities (this layer only):
//   - Validate that the person's first name has at least 3 characters
//   - Validate that the specified role title is not already occupied
//   - If all rules pass, delegate creation to leadershipRepo
//   - Return a typed result describing success or what went wrong
//
// This layer does NOT manage state, UI messages, or raw data storage.
// It knows the rules; leadershipRepo knows the data; useFormInput knows the UI.

import { Role } from '../types';
import leadershipRepo from '../repositories/leadershipRepo';

export interface LeadershipServiceResult {
  success: boolean;
  leadership?: Role[];   // returned on success for state update
  errors?: {
    firstName?: string;
    lastName?: string;
    role?: string;
  };
}

const leadershipService = {
  // Returns all current Role entries from the repository.
  getAll(): Role[] {
    return leadershipRepo.getAll();
  },

  // Attempts to create a new Role entry.
  // Validates all business rules before delegating to the repository.
  createRole(
    firstName: string,
    lastName: string,
    roleTitle: string
  ): LeadershipServiceResult {
    const errors: LeadershipServiceResult['errors'] = {};

    // Rule 1: first name must be at least 3 characters
    if (firstName.trim().length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }

    // Rule 2: role title must not already be occupied
    if (!roleTitle.trim()) {
      errors.role = 'Role title is required.';
    } else {
      const occupied = leadershipRepo.findByRole(roleTitle.trim());
      if (occupied) {
        errors.role = `The role "${roleTitle.trim()}" is already occupied by ${occupied.name}.`;
      }
    }

    // If any rules failed, return errors without touching the repository
    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    // Build the full name — lastName is optional
    const fullName = lastName.trim()
      ? `${firstName.trim()} ${lastName.trim()}`
      : firstName.trim();

    // All validations passed — delegate creation to the repository
    const updated = leadershipRepo.add({ name: fullName, role: roleTitle.trim() });

    return { success: true, leadership: updated };
  },
};

export default leadershipService;
