// Page component — top-level layout and state owner.
// Departments state lives here so it can be passed down to both
// Main (for display) and AddEmployeeForm (for mutation).

import { useState } from 'react';
import { Department, Employee } from '../types';
import initialDepartments from '../data/departments';
import Header from './Header';
import Main from './Main';
import AddEmployeeForm from './AddEmployeeForm';
import Footer from './Footer';

const Page = () => {
  // Departments held in state so adding an employee triggers a re-render
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

  // Called by AddEmployeeForm when the user submits a valid entry.
  // Finds the target department and appends the new employee to it.
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
      <Header />
      <Main departments={departments} />
      <AddEmployeeForm departments={departments} onAdd={handleAddEmployee} />
      <Footer />
    </>
  );
};

export default Page;
