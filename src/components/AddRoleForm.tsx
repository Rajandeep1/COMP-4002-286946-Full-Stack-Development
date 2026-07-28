// AddRoleForm — form for adding a new leadership role.
// Lab 5.1: only rendered when signed in (controlled by <SignedIn> in OrganizationPage).
// createRole prop includes the Clerk token via leadershipService.

import { useState } from 'react';
import { Role } from '../types';
import useFormInput from '../hooks/useFormInput';
import { LeadershipServiceResult } from '../services/leadershipService';

interface AddRoleFormProps {
  leadership: Role[];
  onSuccess: (leadership: Role[]) => void;
  createRole: (
    firstName: string,
    lastName: string,
    roleTitle: string
  ) => Promise<LeadershipServiceResult>;
}

const AddRoleForm = ({ onSuccess, createRole }: AddRoleFormProps) => {
  const firstName = useFormInput('');
  const lastName  = useFormInput('');
  const roleTitle = useFormInput('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    firstName.clearMessages();
    lastName.clearMessages();
    roleTitle.clearMessages();

    const firstNameErrors = firstName.validate((val) =>
      val.trim().length < 3 ? ['First name must be at least 3 characters.'] : []
    );
    const roleTitleErrors = roleTitle.validate((val) =>
      !val.trim() ? ['Role title is required.'] : []
    );

    if (firstNameErrors.length > 0 || roleTitleErrors.length > 0) return;

    setSubmitting(true);
    const result = await createRole(
      firstName.value,
      lastName.value,
      roleTitle.value
    );
    setSubmitting(false);

    if (!result.success && result.errors) {
      if (result.errors.firstName) firstName.validate(() => [result.errors!.firstName!]);
      if (result.errors.role)      roleTitle.validate(() => [result.errors!.role!]);
      return;
    }

    if (result.leadership) onSuccess(result.leadership);

    firstName.setValue('');
    lastName.setValue('');
    roleTitle.setValue('');
  };

  return (
    <section className="form-section">
      <div className="form-inner">
        <h2 className="form-heading">Add New Role</h2>
        <form className="employee-form" onSubmit={handleSubmit} noValidate>

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
              disabled={submitting}
            />
            {firstName.messages.map((msg) => (
              <p key={msg} className="form-error" role="alert">{msg}</p>
            ))}
          </div>

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
              disabled={submitting}
            />
          </div>

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
              disabled={submitting}
            />
            {roleTitle.messages.map((msg) => (
              <p key={msg} className="form-error" role="alert">{msg}</p>
            ))}
          </div>

          <button type="submit" className="form-submit" disabled={submitting}>
            {submitting ? 'Saving…' : 'Add to Organization'}
          </button>

        </form>
      </div>
    </section>
  );
};

export default AddRoleForm;
