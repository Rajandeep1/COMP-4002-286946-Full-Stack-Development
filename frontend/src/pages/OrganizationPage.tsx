// OrganizationPage — the /organization route.
//
// State is now seeded by an async call to leadershipService.getAll(),
// which fetches from the back-end over the network.

import { useState, useEffect } from 'react';
import { Role } from '../types';
import leadershipService from '../services/leadershipService';
import RoleRow from '../components/RoleRow';
import AddRoleForm from '../components/AddRoleForm';

const OrganizationPage = () => {
  const [leadership, setLeadership] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    leadershipService
      .getAll()
      .then(setLeadership)
      .catch((err: Error) => {
        console.error('[OrganizationPage] Failed to load leadership:', err);
        setError(`Could not load the organization chart: ${err.message}`);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSuccess = (updated: Role[]): void => {
    setLeadership(updated);
  };

  if (loading) {
    return <main className="main-content"><p>Loading organization chart…</p></main>;
  }

  if (error) {
    return <main className="main-content"><p className="form-error">{error}</p></main>;
  }

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

      <AddRoleForm
        leadership={leadership}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default OrganizationPage;
