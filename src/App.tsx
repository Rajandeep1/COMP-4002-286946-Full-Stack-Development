// App — sets up the React Router structure.
// Layout wraps all routes so every page shares the Header and Footer.
// The index route redirects "/" to "/employees" automatically.

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import EmployeesPage from './pages/EmployeesPage';
import OrganizationPage from './pages/OrganizationPage';
import './index.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Redirect root "/" to "/employees" */}
        <Route index element={<Navigate to="/employees" replace />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="organization" element={<OrganizationPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
