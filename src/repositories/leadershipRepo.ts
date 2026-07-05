// leadershipRepo — sole manager of LeadershipMember data.
// Sprint 4 refactor: all reads/writes now go through Prisma to the
// PostgreSQL database instead of an in-memory array.
//
// Responsibilities (this layer only):
//   - Translate CRUD operations into Prisma client calls
//   - Return typed objects to the service layer
//
// This layer does NOT validate business rules — that belongs to leadershipService.

import prisma from '../prisma/client';
import { LeadershipMember } from '../types';

const leadershipRepo = {
  // Returns all leadership members ordered by id.
  async getAll(): Promise<LeadershipMember[]> {
    return prisma.leadershipMember.findMany({ orderBy: { id: 'asc' } });
  },

  // Returns a leadership member whose roleTitle matches exactly.
  // Used by leadershipService to check if a role is already occupied.
  async findByRoleTitle(roleTitle: string): Promise<LeadershipMember | null> {
    return prisma.leadershipMember.findFirst({
      where: { roleTitle: { equals: roleTitle, mode: 'insensitive' } },
    });
  },

  // Adds a new LeadershipMember. Returns the full updated list.
  async add(
    firstName: string,
    lastName: string | null,
    roleTitle: string
  ): Promise<LeadershipMember[]> {
    await prisma.leadershipMember.create({
      data: { firstName, lastName, roleTitle },
    });

    return leadershipRepo.getAll();
  },
};

export default leadershipRepo;
