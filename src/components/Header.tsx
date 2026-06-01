// Header — displays the Pixell River logo, site title, greeting, and the Navbar.

import Navbar from './Navbar';

const Header = () => (
  <header className="site-header">
    <div className="header-inner">
      <a href="/" className="logo-link" aria-label="Pixell River Financial Home">
        <img
          src="https://itsm-ace.ca/images/logo.svg"
          alt="Pixell River Financial Logo"
          className="logo"
        />
      </a>
      <div className="header-text">
        <h1 className="site-title">Pixell River Employee Directory</h1>
        <p className="greeting">
          Welcome — browse our teams and the people behind Pixell River Financial.
        </p>
      </div>
    </div>
    <Navbar />
  </header>
);

export default Header;
