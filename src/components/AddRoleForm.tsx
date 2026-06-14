// AddRoleForm — form component for adding a new person to the Organization page.
//
// REUSABILITY: this component deliberately uses the same useFormInput hook
// that powers AddEmployeeForm. The hook is generic — it manages any input's
// value and messages regardless of what that input represents. This means
// all form input behaviour (value tracking, validation messaging, clear on
// reset) is shared between the two forms without any duplication.
//
// Architecture:
//   useFormInput (hook)  — manages value + messages for each field
//   leadershipService    — validates rules and creates the Role
//   leadershipRepo       — (called by service) stores and returns the data
//
// This component's only concern: rendering the form and wiring inputs to the service.

import { Role } from '../types';
import useFormInput from '../hooks/useFormInput';
import leadershipService from '../services/leadershipService';

interface AddRoleFormProps {
  onSuccess: (leadership: Role[]) => void;
}

const AddRoleForm = ({ onSuccess }: AddRoleFormProps) => {
  // Same hook, three instances — one per field.
  // This is the reusability the lab asks for: useFormInput works for any text input.
  const firstName = useFormInput('');
  const lastName  = useFormInput('');
  const roleTitle = useFormInput('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Clear all previous messages before a new submission attempt
    firstName.clearMessages();
    lastName.clearMessages();
    roleTitle.clearMessages();

    // Run input-level pre-checks using each hook's validate() method.
    // The callback passed to validate() IS the rule; the hook just stores the result.
    const firstNameErrors = firstName.validate((val) =>
      val.trim().length < 3 ? ['First name must be at least 3 characters.'] : []
    );
    const roleTitleErrors = roleTitle.validate((val) =>
      !val.trim() ? ['Role title is required.'] : []
    );

    // If basic input checks fail, stop — no need to call the service
    if (firstNameErrors.length > 0 || roleTitleErrors.length > 0) return;

    // Delegate business validation (role already occupied?) and creation to the service
    const result = leadershipService.createRole(
      firstName.value,
      lastName.value,
      roleTitle.value
    );

    if (!result.success && result.errors) {
      // Push service-level errors back into the appropriate hook's messages
      if (result.errors.firstName) firstName.validate(() => [result.errors!.firstName!]);
      if (result.errors.role)      roleTitle.validate(() => [result.errors!.role!]);
      return;
    }

    // Success — notify OrganizationPage with the updated list from the repo
    if (result.leadership) onSuccess(result.leadership);

    // Reset all inputs
    firstName.setValue('');
    lastName.setValue('');
    roleTitle.setValue('');
  };

  return (
    <section className="form-section">
      <div className="form-inner">
        <h2 className="form-heading">Add New Role</h2>

        <form className="employee-form" onSubmit={handleSubmit} noValidate>

          {/* First Name */}
          <div className="form-group">
            <label htmlFor="roleFirstName" className="form-label">
              First Name <span className="required" aria-hidden="true">*</span>
            </label>
            <input
              id="roleFirstName"
              type="text"
              className={`form-input ${firstName.messages.length > 0 ? 'form-input--error' : ''}`}
              value={firstName.value}
              onChange={(e) => firstName.setValue(e.target.value)}
              placeholder="e.g. Sandra"
              aria-invalid={firstName.messages.length > 0}
            />
            {firstName.messages.map((msg) => (
              <p key={msg} className="form-error" role="alert">{msg}</p>
            ))}
          </div>

          {/* Last Name (optional) */}
          <div className="form-group">
            <label htmlFor="roleLastName" className="form-label">
              Last Name <span className="form-optional">(optional)</span>
            </label>
            <input
              id="roleLastName"
              type="text"
              className="form-input"
              value={lastName.value}
              onChange={(e) => lastName.setValue(e.target.value)}
              placeholder="e.g. Bear"
            />
          </div>

          {/* Role Title */}
          <div className="form-group">
            <label htmlFor="roleTitle" className="form-label">
              Role Title <span className="required" aria-hidden="true">*</span>
            </label>
            <input
              id="roleTitle"
              type="text"
              className={`form-input ${roleTitle.messages.length > 0 ? 'form-input--error' : ''}`}
              value={roleTitle.value}
              onChange={(e) => roleTitle.setValue(e.target.value)}
              placeholder="e.g. Director, Information Technology"
              aria-invalid={roleTitle.messages.length > 0}
            />
            {roleTitle.messages.map((msg) => (
              <p key={msg} className="form-error" role="alert">{msg}</p>
            ))}
          </div>

          <button type="submit" className="form-submit">
            Add to Organization
          </button>

        </form>
      </div>
    </section>
  );
};

export default AddRoleForm;
