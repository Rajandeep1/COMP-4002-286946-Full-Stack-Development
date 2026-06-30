// leadershipRepo — sole manager of Role (leadership) data.
//
// Responsibilities (this layer only):
//   - Hold the in-memory store of Role objects, seeded from leadership.ts
//   - Provide CRUD access: getAll, findByRole, add
//   - Perform the actual mutation of adding a new Role entry
//
// This layer does NOT validate business rules — that belongs to leadershipService.
// This layer does NOT know about HTTP — that belongs to the controller.
//
// NOTE: temporary in-memory storage. Will be replaced by a database-backed
// implementation in a future lab without changing these method signatures.

import { Role } from '../types';
import initialLeadership from '../data/leadership';

let store: Role[] = initialLeadership.map((r) => ({ ...r }));

const leadershipRepo = {
  getAll(): Role[] {
    return store.map((r) => ({ ...r }));
  },

  getById(id: number): Role | undefined {
    return store.find((r) => r.id === id);
  },

  // Used by leadershipService to check if a role is already occupied.
  findByRole(roleTitle: string): Role | undefined {
    return store.find(
      (r) => r.role.toLowerCase().trim() === roleTitle.toLowerCase().trim()
    );
  },

  add(entry: Omit<Role, 'id'>): Role[] {
    const newEntry: Role = { ...entry, id: Date.now() };
    store = [...store, newEntry];
    return leadershipRepo.getAll();
  },
};

export default leadershipRepo;
