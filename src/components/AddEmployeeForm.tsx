// AddEmployeeForm — controlled form component for adding a new employee.
// Validates that firstName has at least 3 characters.
// Calls onAdd with the selected department name and new Employee object on success.

import { useState } from 'react';
import { Department, Employee } from '../types';

interface AddEmployeeFormProps {
  departments: Department[];
  onAdd: (departmentName: string, employee: Employee) => void;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  department?: string;
}

const AddEmployeeForm = ({ departments, onAdd }: AddEmployeeFormProps) => {
  // Controlled input state
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [departmentName, setDepartmentName] = useState<string>('');

  // Validation error state — cleared on every new submission attempt
  const [errors, setErrors] = useState<FormErrors>({});

  // Returns an errors object; empty object means all inputs are valid
  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (firstName.trim().length < 3) {
      newErrors.firstName = 'First name must be at least 3 characters.';
    }

    if (!departmentName) {
      newErrors.department = 'Please select a department.';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Clear any previous validation messages
    setErrors({});

    const validationErrors = validate();

    // If there are errors, show them and stop — do not add the employee
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Build the Employee object (lastName is optional)
    const newEmployee: Employee = {
      firstName: firstName.trim(),
      ...(lastName.trim() ? { lastName: lastName.trim() } : {}),
    };

    onAdd(departmentName, newEmployee);

    // Reset form after successful submission
    setFirstName('');
    setLastName('');
    setDepartmentName('');
  };

  return (
    <section className="form-section">
      <div className="form-inner">
        <h2 className="form-heading">Add New Employee</h2>

        <form className="employee-form" onSubmit={handleSubmit} noValidate>

          {/* First Name */}
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">
              First Name <span className="required" aria-hidden="true">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              className={`form-input ${errors.firstName ? 'form-input--error' : ''}`}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g. Taylor"
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <p id="firstName-error" className="form-error" role="alert">
                {errors.firstName}
              </p>
            )}
          </div>

          {/* Last Name (optional) */}
          <div className="form-group">
            <label htmlFor="lastName" className="form-label">
              Last Name <span className="form-optional">(optional)</span>
            </label>
            <input
              id="lastName"
              type="text"
              className="form-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="e.g. Napier"
            />
          </div>

          {/* Department drop-down */}
          <div className="form-group">
            <label htmlFor="department" className="form-label">
              Department <span className="required" aria-hidden="true">*</span>
            </label>
            <select
              id="department"
              className={`form-select ${errors.department ? 'form-input--error' : ''}`}
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              aria-describedby={errors.department ? 'department-error' : undefined}
              aria-invalid={!!errors.department}
            >
              <option value="">— Select a department —</option>
              {departments.map((dept) => (
                <option key={dept.name} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
            {errors.department && (
              <p id="department-error" className="form-error" role="alert">
                {errors.department}
              </p>
            )}
          </div>

          <button type="submit" className="form-submit">
            Add Employee
          </button>

        </form>
      </div>
    </section>
  );
};

export default AddEmployeeForm;
