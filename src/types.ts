// Types used throughout the Employee Directory application

export interface Employee {
  firstName: string;
  lastName?: string;
}

export interface Department {
  name: string;
  employees: Employee[];
}
