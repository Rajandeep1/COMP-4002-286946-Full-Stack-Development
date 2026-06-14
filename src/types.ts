// Central type definitions for the Pixell River Financial application.

// ── Employee / Department ────────────────────────────────────────────────────

export interface Employee {
  firstName: string;
  lastName?: string;
}

export interface Department {
  name: string;
  employees: Employee[];
}

// ── Leadership / Organization ────────────────────────────────────────────────

/**
 * Represents a single member of the Leadership & Management team.
 * Source: Pixell River Financial Case Study Document, pg. 15.
 *
 * id — unique numeric identifier used by leadershipRepo for CRUD operations.
 * name — full display name of the individual (firstName + optional lastName).
 * role — their job title / role in the organization.
 */
export interface Role {
  id: number;
  name: string;
  role: string;
}
