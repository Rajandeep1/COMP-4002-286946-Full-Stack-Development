// EmployeesPage — the /employees route.
// Sprint 4 refactor: state is now seeded by an async call to
// employeeService.getDepartments(), which reads from PostgreSQL via Prisma.
// Loading and error states handle the async nature of the data fetch.

import { useState, useEffect } from 'react';
import { Department } from '../types';
import employeeService from '../services/employeeService';
import Main from '../components/Main';
import AddEmployeeForm from '../components/AddEmployeeForm';

const EmployeesPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    employeeService
      .getDepartments()
      .then(setDepartments)
      .catch((err: Error) => setError(`Could not load employees: ${err.message}`))
      .finally(() => setLoading(false));
  }, []);

  const handleSuccess = (updated: Department[]): void => {
    setDepartments(updated);
  };

  if (loading) {
    return <main className="main-content"><p>Loading employees…</p></main>;
  }

  if (error) {
    return <main className="main-content"><p className="form-error">{error}</p></main>;
  }

  return (
    <>
      <Main departments={departments} />
      <AddEmployeeForm
        departments={departments}
        onSuccess={handleSuccess}
        createEmployee={(deptName, firstName, lastName) =>
          employeeService.createEmployee(deptName, firstName, lastName)
        }
      />
    </>
  );
};

export default EmployeesPage;
