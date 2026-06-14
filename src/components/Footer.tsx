// Footer component — displays the copyright notice with the current year

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p className="copyright">
        &copy; {currentYear} Pixell River Financial. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
