// AddEmployeeForm — form component rebuilt on the Hook > Service > Repository
// architecture. Each input's state and messages are managed by useFormInput().
// Validation and creation logic are delegated entirely to employeeService.
//
// This component's only concern: presentation and wiring inputs to the service.

import { Department } from '../types';
import useFormInput from '../hooks/useFormInput';
import employeeService from '../services/employeeService';

interface AddEmployeeFormProps {
  departments: Department[];
  onSuccess: (departments: Department[]) => void;
}

const AddEmployeeForm = ({ departments, onSuccess }: AddEmployeeFormProps) => {
  const firstName  = useFormInput('');
  const lastName   = useFormInput('');
  const department = useFormInput('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Clear all previous messages before a new submission attempt
    firstName.clearMessages();
    lastName.clearMessages();
    department.clearMessages();

    // Each input validates itself using a callback — the hook stores results
    const firstNameErrors  = firstName.validate((val) =>
      val.trim().length < 3 ? ['First name must be at least 3 characters.'] : []
    );
    const departmentErrors = department.validate((val) =>
      !val ? ['Please select a department.'] : []
    );

    // If either input-level check failed, stop here (no service call needed)
    if (firstNameErrors.length > 0 || departmentErrors.length > 0) return;

    // Build the employee — lastName is optional
    const newEmployee = {
      firstName: firstName.value.trim(),
      ...(lastName.value.trim() ? { lastName: lastName.value.trim() } : {}),
    };

    // Delegate business validation + creation to the service
    const result = employeeService.createEmployee(department.value, newEmployee);

    if (!result.success && result.errors) {
      // Push any service-level errors back into the appropriate hook messages
      if (result.errors.firstName)  firstName.validate(() => [result.errors!.firstName!]);
      if (result.errors.department) department.validate(() => [result.errors!.department!]);
      return;
    }

    // Success — notify EmployeesPage with the updated departments from the repo
    if (result.departments) onSuccess(result.departments);

    // Reset all inputs
    firstName.setValue('');
    lastName.setValue('');
    department.setValue('');
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
              className={`form-input ${firstName.messages.length > 0 ? 'form-input--error' : ''}`}
              value={firstName.value}
              onChange={(e) => firstName.setValue(e.target.value)}
              placeholder="e.g. Taylor"
              aria-invalid={firstName.messages.length > 0}
            />
            {firstName.messages.map((msg) => (
              <p key={msg} className="form-error" role="alert">{msg}</p>
            ))}
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
              value={lastName.value}
              onChange={(e) => lastName.setValue(e.target.value)}
              placeholder="e.g. Napier"
            />
          </div>

          {/* Department */}
          <div className="form-group">
            <label htmlFor="department" className="form-label">
              Department <span className="required" aria-hidden="true">*</span>
            </label>
            <select
              id="department"
              className={`form-select ${department.messages.length > 0 ? 'form-input--error' : ''}`}
              value={department.value}
              onChange={(e) => department.setValue(e.target.value)}
              aria-invalid={department.messages.length > 0}
            >
              <option value="">— Select a department —</option>
              {departments.map((dept) => (
                <option key={dept.name} value={dept.name}>{dept.name}</option>
              ))}
            </select>
            {department.messages.map((msg) => (
              <p key={msg} className="form-error" role="alert">{msg}</p>
            ))}
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
