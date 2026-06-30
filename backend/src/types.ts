// Central type definitions for the back-end application.
// These mirror the front-end types so that JSON sent across the network
// has a single, agreed-upon shape on both sides.

export interface Employee {
  firstName: string;
  lastName?: string;
}

export interface Department {
  name: string;
  employees: Employee[];
}

/**
 * Represents a single member of the Leadership & Management team.
 * Source: Pixell River Financial Case Study Document, pg. 15.
 */
export interface Role {
  id: number;
  name: string;
  role: string;
}
