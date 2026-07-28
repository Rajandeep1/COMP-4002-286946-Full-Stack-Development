// AddEmployeeForm — form for adding a new employee.
// Lab 5.1: this component is only rendered when the user is signed in
// (controlled by <SignedIn> in EmployeesPage). The createEmployee prop
// accepts an async function that includes the Clerk token.

import { useState } from 'react';
import { Department } from '../types';
import useFormInput from '../hooks/useFormInput';
import { ServiceResult } from '../services/employeeService';

interface AddEmployeeFormProps {
  departments: Department[];
  onSuccess: (departments: Department[]) => void;
  createEmployee: (
    departmentName: string,
    firstName: string,
    lastName: string | null
  ) => Promise<ServiceResult>;
}

const AddEmployeeForm = ({ departments, onSuccess, createEmployee }: AddEmployeeFormProps) => {
  const firstName  = useFormInput('');
  const lastName   = useFormInput('');
  const department = useFormInput('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    firstName.clearMessages();
    lastName.clearMessages();
    department.clearMessages();

    const firstNameErrors  = firstName.validate((val) =>
      val.trim().length < 3 ? ['First name must be at least 3 characters.'] : []
    );
    const departmentErrors = department.validate((val) =>
      !val ? ['Please select a department.'] : []
    );

    if (firstNameErrors.length > 0 || departmentErrors.length > 0) return;

    setSubmitting(true);
    const result = await createEmployee(
      department.value,
      firstName.value.trim(),
      lastName.value.trim() || null
    );
    setSubmitting(false);

    if (!result.success && result.errors) {
      if (result.errors.firstName)  firstName.validate(() => [result.errors!.firstName!]);
      if (result.errors.department) department.validate(() => [result.errors!.department!]);
      return;
    }

    if (result.departments) onSuccess(result.departments);

    firstName.setValue('');
    lastName.setValue('');
    department.setValue('');
  };

  return (
    <section className="form-section">
      <div className="form-inner">
        <h2 className="form-heading">Add New Employee</h2>
        <form className="employee-form" onSubmit={handleSubmit} noValidate>

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
              disabled={submitting}
            />
            {firstName.messages.map((msg) => (
              <p key={msg} className="form-error" role="alert">{msg}</p>
            ))}
          </div>

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
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="department" className="form-label">
              Department <span className="required" aria-hidden="true">*</span>
            </label>
            <select
              id="department"
              className={`form-select ${department.messages.length > 0 ? 'form-input--error' : ''}`}
              value={department.value}
              onChange={(e) => department.setValue(e.target.value)}
              disabled={submitting}
            >
              <option value="">— Select a department —</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
            </select>
            {department.messages.map((msg) => (
              <p key={msg} className="form-error" role="alert">{msg}</p>
            ))}
          </div>

          <button type="submit" className="form-submit" disabled={submitting}>
            {submitting ? 'Saving…' : 'Add Employee'}
          </button>

        </form>
      </div>
    </section>
  );
};

export default AddEmployeeForm;
