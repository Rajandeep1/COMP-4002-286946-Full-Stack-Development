// Central type definitions for the Pixell River Financial application.
// These now mirror the Prisma schema models exactly.

// ── Employee / Department ────────────────────────────────────────────────────

export interface Employee {
  id: number;
  firstName: string;
  lastName: string | null;
  departmentId: number;
}

export interface Department {
  id: number;
  name: string;
  employees: Employee[];
}

// ── Leadership / Organization ────────────────────────────────────────────────

/**
 * Represents a single member of the Leadership & Management team.
 * firstName and lastName are separate columns (1NF atomic values).
 * roleTitle is unique per row (enforced by @@unique in schema).
 */
export interface LeadershipMember {
  id: number;
  firstName: string;
  lastName: string | null;
  roleTitle: string;
}

// ── Legacy alias kept for backward compatibility with RoleRow component ──────
// RoleRow displays { name, role } — we derive these from LeadershipMember.
export interface Role {
  id: number;
  name: string;   // derived: firstName + ' ' + (lastName ?? '')
  role: string;   // maps to roleTitle
}
