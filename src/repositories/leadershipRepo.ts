// leadershipRepo — fetches organization data from the backend API.
// GET requests are public. POST requests include the Clerk session token.

import { Role } from '../types';
import { API_BASE } from '../apiBase';

const leadershipRepo = {
  async getAll(): Promise<Role[]> {
    const res = await fetch(`${API_BASE}/organization`);
    if (!res.ok) throw new Error('Failed to fetch organization.');
    return res.json();
  },

  async addRole(
    firstName: string,
    lastName: string | null,
    roleTitle: string,
    token: string
  ): Promise<Role[] | null> {
    const res = await fetch(`${API_BASE}/organization/roles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName, lastName, roleTitle }),
    });

    if (!res.ok) return null;
    return res.json();
  },
};

export default leadershipRepo;
