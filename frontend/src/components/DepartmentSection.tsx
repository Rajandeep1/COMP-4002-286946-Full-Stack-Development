// DepartmentSection and EmployeeCard components
// EmployeeCard is co-located here because it is exclusively used by DepartmentSection.

import { Department, Employee } from '../types';

// ---------------------------------------------------------------------------
// Helper: derive initials from an Employee object
// ---------------------------------------------------------------------------
const getInitials = (employee: Employee): string => {
  const first = employee.firstName.charAt(0).toUpperCase();
  const last = employee.lastName ? employee.lastName.charAt(0).toUpperCase() : '';
  return first + last;
};

// ---------------------------------------------------------------------------
// Helper: derive the full display name from an Employee object
// ---------------------------------------------------------------------------
const getFullName = (employee: Employee): string =>
  employee.lastName ? `${employee.firstName} ${employee.lastName}` : employee.firstName;

// ---------------------------------------------------------------------------
// EmployeeCard — displays a single employee's avatar and name
// ---------------------------------------------------------------------------
interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => (
  <li className="employee-card">
    <div className="employee-avatar" aria-hidden="true">
      {getInitials(employee)}
    </div>
    <span className="employee-name">{getFullName(employee)}</span>
  </li>
);

// ---------------------------------------------------------------------------
// DepartmentSection — renders a department heading and its employee list
// ---------------------------------------------------------------------------
interface DepartmentSectionProps {
  department: Department;
}

const DepartmentSection = ({ department }: DepartmentSectionProps) => {
  const headingId = `dept-${department.name.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <section className="dept-section" aria-labelledby={headingId}>
      <h2 className="dept-heading" id={headingId}>
        {department.name}
      </h2>
      <ul className="employee-list">
        {department.employees.map((employee) => (
          <EmployeeCard
            key={`${employee.firstName}-${employee.lastName ?? ''}`}
            employee={employee}
          />
        ))}
      </ul>
    </section>
  );
};

export default DepartmentSection;
