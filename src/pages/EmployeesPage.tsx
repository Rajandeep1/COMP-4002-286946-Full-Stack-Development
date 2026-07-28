// EmployeesPage — /employees
//
// Lab 5.1 auth behaviour:
//   - All users (signed in or not) can VIEW the employee directory.
//   - Only signed-in users see the AddEmployeeForm.
//   - Signed-out users see a LoginPrompt instead.
//
// useAuth() provides getToken() — used to attach the Clerk session token
// to POST requests so the backend can verify the user is authenticated.

import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import { Department } from '../types';
import employeeService from '../services/employeeService';
import Main from '../components/Main';
import AddEmployeeForm from '../components/AddEmployeeForm';
import LoginPrompt from '../components/LoginPrompt';

const EmployeesPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { getToken } = useAuth();

  useEffect(() => {
    employeeService
      .getDepartments()
      .then(setDepartments)
      .catch((err: Error) => setError(`Could not load employees: ${err.message}`))
      .finally(() => setLoading(false));
  }, []);

  const handleSuccess = (updated: Department[]): void => setDepartments(updated);

  if (loading) return <main className="main-content"><p>Loading employees…</p></main>;
  if (error)   return <main className="main-content"><p className="form-error">{error}</p></main>;

  return (
    <>
      <Main departments={departments} />

      {/* Show form if signed in, login prompt if signed out */}
      <SignedIn>
        <AddEmployeeForm
          departments={departments}
          onSuccess={handleSuccess}
          createEmployee={async (deptName, firstName, lastName) => {
            const token = await getToken();
            return employeeService.createEmployee(deptName, firstName, lastName, token ?? '');
          }}
        />
      </SignedIn>

      <SignedOut>
        <LoginPrompt action="add an employee" />
      </SignedOut>
    </>
  );
};

export default EmployeesPage;
