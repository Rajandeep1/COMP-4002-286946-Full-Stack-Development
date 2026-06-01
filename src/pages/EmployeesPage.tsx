// EmployeesPage — the /employees route.
// Owns departments state and renders the directory + add-employee form.
// This is the same logic that was previously in Page.tsx, now a routed page.

import { useState } from 'react';
import { Department, Employee } from '../types';
import initialDepartments from '../data/departments';
import Main from '../components/Main';
import AddEmployeeForm from '../components/AddEmployeeForm';

const EmployeesPage = () => {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

  const handleAddEmployee = (departmentName: string, employee: Employee): void => {
    setDepartments((prev) =>
      prev.map((dept) =>
        dept.name === departmentName
          ? { ...dept, employees: [...dept.employees, employee] }
          : dept
      )
    );
  };

  return (
    <>
      <Main departments={departments} />
      <AddEmployeeForm departments={departments} onAdd={handleAddEmployee} />
    </>
  );
};

export default EmployeesPage;
