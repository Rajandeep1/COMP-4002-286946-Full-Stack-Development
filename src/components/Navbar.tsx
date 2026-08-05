// Navbar — navigation with Clerk login/logout controls.
// SignedIn/SignedOut/UserButton/SignInButton are Clerk components that
// automatically show/hide based on the user's auth state.
// Lab 5.1: "Options to log in or out of the application should be visible
// on navigation."

import { NavLink } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';

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

    {/* Auth controls — always visible in the navbar */}
    <div className="navbar-auth">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="auth-btn auth-btn--signin">Sign In</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        {/* UserButton shows avatar + dropdown with Sign Out option */}
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  </nav>
);

export default Navbar;
