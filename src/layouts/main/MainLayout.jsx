import PropTypes from 'prop-types';

import Header from '../header/Header';

const MainLayout = ({ children }) => {
  return (
    <main style={{ padding: '0.5rem' }}>
      <Header />
      {children}
    </main>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element
};

export default MainLayout;
