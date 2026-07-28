// Central type definitions — Lab 5.1
// Schema fix: Role now represents a title only; Employee holds the person's name.

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

// Role display shape — matches what the backend's organizationRepo returns.
// name is derived (employee.firstName + lastName), role is the Role.title.
export interface Role {
  id: number;
  name: string;
  role: string;
}
