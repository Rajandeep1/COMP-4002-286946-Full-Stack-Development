// Page component — top-level layout that composes Header, Main, and Footer.
// Wrapping the layout here makes it easy to swap the shell without touching
// the individual section components.

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const Page = () => {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default Page;
