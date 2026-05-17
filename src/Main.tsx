// Main component — the body of the directory, listing all departments

import DepartmentSection from './DepartmentSection';
import departments from '../data/departments';

const Main = () => {
  return (
    <main id="main-content" className="main-content">
      {departments.map((department) => (
        <DepartmentSection key={department.name} department={department} />
      ))}
    </main>
  );
};

export default Main;
