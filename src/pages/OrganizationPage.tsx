// OrganizationPage — the /organization route.
// Refactored to seed state from leadershipRepo (via leadershipService)
// rather than importing the raw data file directly.
// Renders the leadership table and the AddRoleForm below it.

import { useState } from 'react';
import { Role } from '../types';
import leadershipService from '../services/leadershipService';
import RoleRow from '../components/RoleRow';
import AddRoleForm from '../components/AddRoleForm';

const OrganizationPage = () => {
  // Seed state from the service (which reads from leadershipRepo)
  const [leadership, setLeadership] = useState<Role[]>(
    () => leadershipService.getAll()
  );

  const handleSuccess = (updated: Role[]): void => {
    setLeadership(updated);
  };

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

      <AddRoleForm onSuccess={handleSuccess} />
    </>
  );
};

export default OrganizationPage;
