// OrganizationPage — /organization
//
// Lab 5.1 auth behaviour:
//   - All users can VIEW the organization chart.
//   - Only signed-in users see the AddRoleForm.
//   - Signed-out users see a LoginPrompt instead.

import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import { Role } from '../types';
import leadershipService from '../services/leadershipService';
import RoleRow from '../components/RoleRow';
import AddRoleForm from '../components/AddRoleForm';
import LoginPrompt from '../components/LoginPrompt';

const OrganizationPage = () => {
  const [leadership, setLeadership] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { getToken } = useAuth();

  useEffect(() => {
    leadershipService
      .getAll()
      .then(setLeadership)
      .catch((err: Error) => setError(`Could not load organization: ${err.message}`))
      .finally(() => setLoading(false));
  }, []);

  const handleSuccess = (updated: Role[]): void => setLeadership(updated);

  if (loading) return <main className="main-content"><p>Loading organization chart…</p></main>;
  if (error)   return <main className="main-content"><p className="form-error">{error}</p></main>;

  return (
    <>
      <main id="main-content" className="main-content">
        <section className="dept-section">
          <h2 className="dept-heading">Leadership &amp; Management</h2>
          <table className="role-table">
            <thead>
              <tr>
                <th className="role-table-header">Name</th>
                <th className="role-table-header">Role</th>
              </tr>
            </thead>
            <tbody>
              {leadership.map((person) => (
                <RoleRow key={person.id} person={person} />
              ))}
            </tbody>
          </table>
        </section>
      </main>

      <SignedIn>
        <AddRoleForm
          leadership={leadership}
          onSuccess={handleSuccess}
          createRole={async (firstName, lastName, roleTitle) => {
            const token = await getToken();
            return leadershipService.createRole(firstName, lastName, roleTitle, token ?? '');
          }}
        />
      </SignedIn>

      <SignedOut>
        <LoginPrompt action="add a new role" />
      </SignedOut>
    </>
  );
};

export default OrganizationPage;
