// Main component — receives departments as a prop (state owned by Page)
// and renders a DepartmentSection for each.

import { Department } from '../types';
import DepartmentSection from './DepartmentSection';

interface MainProps {
  departments: Department[];
}

const Main = ({ departments }: MainProps) => {
  return (
    <main id="main-content" className="main-content">
      {departments.map((department) => (
        <DepartmentSection key={department.name} department={department} />
      ))}
    </main>
  );
};

export default Main;
