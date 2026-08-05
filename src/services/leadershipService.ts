// leadershipService — async business logic for Leadership/Role operations.
// Now accepts a token parameter for authenticated POST requests.

import { Role } from '../types';
import leadershipRepo from '../repositories/leadershipRepo';

export interface LeadershipServiceResult {
  success: boolean;
  leadership?: Role[];
  errors?: { firstName?: string; role?: string };
}

const leadershipService = {
  async getAll(): Promise<Role[]> {
    return leadershipRepo.getAll();
  },

  async createRole(
    firstName: string,
    lastName: string,
    roleTitle: string,
    token: string
  ): Promise<LeadershipServiceResult> {
    const errors: LeadershipServiceResult['errors'] = {};

    if (!firstName || firstName.trim().length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }
    if (!roleTitle || !roleTitle.trim()) {
      errors.role = 'Role title is required.';
    }
    if (Object.keys(errors).length > 0) return { success: false, errors };

    const updated = await leadershipRepo.addRole(
      firstName.trim(),
      lastName.trim() || null,
      roleTitle.trim(),
      token
    );

    if (!updated) {
      return { success: false, errors: { role: 'Server rejected the request. Role may already be occupied.' } };
    }

    return { success: true, leadership: updated };
  },
};

export default leadershipService;
