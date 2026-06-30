// Navbar — navigation bar for switching between the Employees and Organization pages.
// Uses NavLink from react-router-dom so the active route gets an "active" class
// automatically, allowing it to be styled differently.

import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar" aria-label="Main navigation">
    <ul className="navbar-list">
      <li>
        <NavLink
          to="/employees"
          className={({ isActive }) =>
            isActive ? 'navbar-link navbar-link--active' : 'navbar-link'
          }
        >
          Employees
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/organization"
          className={({ isActive }) =>
            isActive ? 'navbar-link navbar-link--active' : 'navbar-link'
          }
        >
          Organization
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navbar;
