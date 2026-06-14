// leadershipRepo — sole manager of Role (leadership) data.
//
// Responsibilities (this layer only):
//   - Hold the in-memory store of Role objects, seeded from leadership.ts
//   - Provide CRUD access: getAll, getById, findByRole, add, update, remove
//   - Perform the actual mutation of adding a new Role entry
//
// This layer does NOT validate business rules — that belongs to leadershipService.
// Nothing in the app should import the raw leadership data directly; all
// reads and writes go through this repository.

import { Role } from '../types';
import initialLeadership from '../data/leadership';

// In-memory store — seeded once from the static data file.
let store: Role[] = initialLeadership.map((r) => ({ ...r }));

const leadershipRepo = {
  // Returns a shallow copy of all Role entries
  getAll(): Role[] {
    return store.map((r) => ({ ...r }));
  },

  // Returns a single Role by id, or undefined if not found
  getById(id: number): Role | undefined {
    return store.find((r) => r.id === id);
  },

  // Returns the Role entry for an exact role title string, or undefined.
  // Used by leadershipService to check if a role is already occupied.
  findByRole(roleTitle: string): Role | undefined {
    return store.find(
      (r) => r.role.toLowerCase().trim() === roleTitle.toLowerCase().trim()
    );
  },

  // Adds a new Role entry and returns the full updated list.
  add(entry: Omit<Role, 'id'>): Role[] {
    const newEntry: Role = { ...entry, id: Date.now() };
    store = [...store, newEntry];
    return leadershipRepo.getAll();
  },

  // Updates an existing Role by id; returns the updated list or null if not found.
  update(id: number, changes: Partial<Omit<Role, 'id'>>): Role[] | null {
    const exists = store.some((r) => r.id === id);
    if (!exists) return null;
    store = store.map((r) => (r.id === id ? { ...r, ...changes } : r));
    return leadershipRepo.getAll();
  },

  // Removes a Role by id; returns the updated list or null if not found.
  remove(id: number): Role[] | null {
    const exists = store.some((r) => r.id === id);
    if (!exists) return null;
    store = store.filter((r) => r.id !== id);
    return leadershipRepo.getAll();
  },
};

export default leadershipRepo;
