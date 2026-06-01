// Types used throughout the Employee Directory application

export interface Employee {
  firstName: string;
  lastName?: string;
}

export interface Department {
  name: string;
  employees: Employee[];
}

// Used by the Organization page (Leadership & Management, case study pg. 15)
export interface Role {
  name: string;   // Full name of the individual
  role: string;   // Their title / role
}
