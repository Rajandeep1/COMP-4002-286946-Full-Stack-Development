// Layout — shared shell that wraps every page route.
// React Router's <Outlet /> renders whichever child route is currently active
// (EmployeesPage or OrganizationPage) between the Header and Footer.

import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

export default Layout;
