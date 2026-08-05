// OrganizationPage — Lab 5.2 refactor
//
// Same pattern as EmployeesPage:
//   useQuery  → fetches + caches the leadership list
//   useMutation → POSTs a new role, then invalidates the cache so the
//                 list automatically updates without a manual setLeadership()

import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import leadershipService from '../services/leadershipService';
import RoleRow from '../components/RoleRow';
import AddRoleForm from '../components/AddRoleForm';
import LoginPrompt from '../components/LoginPrompt';

const OrganizationPage = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  // useQuery — replaces useEffect + useState(leadership) + setState(loading/error)
  const {
    data: leadership = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: queryKeys.organization.list(),
    queryFn: () => leadershipService.getAll(),
  });

  // useMutation — replaces the manual POST + setLeadership(updated) pattern.
  const addRoleMutation = useMutation({
    mutationFn: async ({
      firstName,
      lastName,
      roleTitle,
    }: {
      firstName: string;
      lastName: string;
      roleTitle: string;
    }) => {
      const token = await getToken();
      return leadershipService.createRole(firstName, lastName, roleTitle, token ?? '');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.organization.all });
    },
  });

  if (isLoading) return <main className="main-content"><p>Loading organization chart…</p></main>;
  if (isError)   return <main className="main-content"><p className="form-error">{(error as Error).message}</p></main>;

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
          onSuccess={() => {}}    // cache invalidation handles the refresh
          createRole={async (firstName, lastName, roleTitle) => {
            return addRoleMutation.mutateAsync({ firstName, lastName, roleTitle });
          }}
          isPending={addRoleMutation.isPending}
        />
      </SignedIn>

      <SignedOut>
        <LoginPrompt action="add a new role" />
      </SignedOut>
    </>
  );
};

export default OrganizationPage;
