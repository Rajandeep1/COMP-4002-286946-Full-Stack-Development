// OrganizationPage — the /organization route.
// Displays all leadership and management staff (case study pg. 15)
// with their name on the left and role on the right.

import leadership from '../data/leadership';
import RoleRow from '../components/RoleRow';

const OrganizationPage = () => (
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
            <RoleRow key={person.name} person={person} />
          ))}
        </tbody>
      </table>
    </section>
  </main>
);

export default OrganizationPage;
