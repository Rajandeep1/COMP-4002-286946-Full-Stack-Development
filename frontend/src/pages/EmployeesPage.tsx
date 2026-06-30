// EmployeesPage — the /employees route.
//
// State is now seeded by an async call to employeeRepo.getDepartments(),
// which fetches from the back-end over the network. Because this is now
// asynchronous, state is loaded inside useEffect with a loading flag,
// rather than synchronously inside useState as it was when data lived
// only in the front-end.

import { useState, useEffect } from 'react';
import { Department } from '../types';
import employeeRepo from '../repositories/employeeRepo';
import employeeService from '../services/employeeService';
import Main from '../components/Main';
import AddEmployeeForm from '../components/AddEmployeeForm';

const EmployeesPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    employeeRepo
      .getDepartments()
      .then(setDepartments)
      .catch((err: Error) => {
        console.error('[EmployeesPage] Failed to load departments:', err);
        setError(`Could not load employees: ${err.message}`);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSuccess = (updatedDepartments: Department[]): void => {
    setDepartments(updatedDepartments);
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
        createEmployee={(deptName, employee) =>
          employeeService.createEmployee(deptName, employee, departments)
        }
      />
    </>
  );
};

export default EmployeesPage;
