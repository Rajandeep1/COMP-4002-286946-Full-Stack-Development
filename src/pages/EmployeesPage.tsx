// EmployeesPage — Lab 5.2 refactor
//
// BEFORE (Lab 5.1):
//   - useState(loading) + useState(error) + useEffect(() => fetch...) pattern
//   - Manual state updates after POST (setDepartments(updated))
//   - No caching — refetches on every page visit
//
// AFTER (Lab 5.2 — TanStack Query):
//   - useQuery handles fetching, caching, loading state, and error state
//   - useMutation handles the POST, then invalidates the cache so the
//     department list automatically refetches with the new employee
//   - No manual useEffect or loading/error state boilerplate needed
//   - Data is cached for 30 seconds (staleTime in QueryClient config),
//     so switching between pages doesn't re-fetch unnecessarily

import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import employeeService from '../services/employeeService';
import Main from '../components/Main';
import AddEmployeeForm from '../components/AddEmployeeForm';
import LoginPrompt from '../components/LoginPrompt';

const EmployeesPage = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  // useQuery — replaces useEffect + useState(departments) + setState(loading/error)
  // TanStack Query fetches, caches, and re-serves the result automatically.
  const {
    data: departments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: queryKeys.departments.list(),
    queryFn: () => employeeService.getDepartments(),
  });

  // useMutation — replaces the manual POST + setDepartments(updated) pattern.
  // On success, invalidates the 'departments' cache key so useQuery automatically
  // refetches the fresh list — no manual state update needed.
  const addEmployeeMutation = useMutation({
    mutationFn: async ({
      departmentName,
      firstName,
      lastName,
    }: {
      departmentName: string;
      firstName: string;
      lastName: string | null;
    }) => {
      const token = await getToken();
      return employeeService.createEmployee(departmentName, firstName, lastName, token ?? '');
    },
    onSuccess: () => {
      // Invalidate the departments cache — triggers an automatic background refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.departments.all });
    },
  });

  if (isLoading) return <main className="main-content"><p>Loading employees…</p></main>;
  if (isError)   return <main className="main-content"><p className="form-error">{(error as Error).message}</p></main>;

  return (
    <>
      <Main departments={departments} />

      <SignedIn>
        <AddEmployeeForm
          departments={departments}
          onSuccess={() => {}}   // cache invalidation handles the refresh
          createEmployee={async (deptName, firstName, lastName) => {
            return addEmployeeMutation.mutateAsync({ departmentName: deptName, firstName, lastName });
          }}
          isPending={addEmployeeMutation.isPending}
        />
      </SignedIn>

      <SignedOut>
        <LoginPrompt action="add an employee" />
      </SignedOut>
    </>
  );
};

export default EmployeesPage;
