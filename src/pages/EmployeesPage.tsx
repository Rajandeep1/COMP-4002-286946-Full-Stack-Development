// EmployeesPage — the /employees route.
//
// State is seeded by calling employeeRepo.getDepartments() — not by importing
// the raw data file directly. The repository is the sole source of truth for
// department and employee data throughout the app.
//
// When AddEmployeeForm reports a successful add, the repo has already updated
// its store internally; the service returns the fresh list which we set as state.

import { useState } from 'react';
import { Department } from '../types';
import employeeRepo from '../repositories/employeeRepo';
import Main from '../components/Main';
import AddEmployeeForm from '../components/AddEmployeeForm';

const EmployeesPage = () => {
  // Seed state from the repository — never from the raw data file
  const [departments, setDepartments] = useState<Department[]>(
    employeeRepo.getDepartments()
  );

  // Called by AddEmployeeForm on a successful service result.
  // The service already updated the repo; we just apply the returned list to state.
  const handleSuccess = (updatedDepartments: Department[]): void => {
    setDepartments(updatedDepartments);
  };

  return (
    <>
      <Main departments={departments} />
      <AddEmployeeForm departments={departments} onSuccess={handleSuccess} />
    </>
  );
};

export default EmployeesPage;
