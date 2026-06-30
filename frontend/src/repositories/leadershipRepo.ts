// leadershipRepo — sole manager of Role (leadership) data on the front-end.
// Now requests this data from the back-end API rather than holding it in
// local in-memory storage.
//
// Responsibilities (this layer only):
//   - Make network requests to the back-end's /api/leadership routes
//   - Return the parsed JSON response to the caller
//
// This layer does NOT validate business rules — that belongs to the service
// (and is now also enforced server-side).

import { Role } from '../types';

// See employeeRepo.ts for full explanation of this Codespaces detection.
const getApiBase = (): string => {
  const { hostname, protocol } = window.location;
  const codespacesMatch = hostname.match(/^(.*)-\d+\.app\.github\.dev$/);

  if (codespacesMatch) {
    const baseName = codespacesMatch[1];
    return `${protocol}//${baseName}-3001.app.github.dev/api`;
  }

  return 'http://localhost:3001/api';
};

const API_BASE = getApiBase();

const leadershipRepo = {
  // GET /api/leadership
  async getAll(): Promise<Role[]> {
    const res = await fetch(`${API_BASE}/leadership`);
    if (!res.ok) throw new Error('Failed to fetch leadership.');
    return res.json();
  },

  // POST /api/leadership
  // Returns the updated leadership list on success, or null if the
  // back-end rejected the request (e.g. validation failure).
  async add(entry: {
    firstName: string;
    lastName?: string;
    role: string;
  }): Promise<Role[] | null> {
    const res = await fetch(`${API_BASE}/leadership`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });

    if (!res.ok) return null;
    return res.json();
  },
};

export default leadershipRepo;
