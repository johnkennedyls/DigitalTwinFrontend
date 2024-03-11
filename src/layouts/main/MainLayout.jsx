import PropTypes from 'prop-types';

import MainToolbar from '../header/MainToolbar';

const MainLayout = ({ children }) => {
  return (
    <main>
      <MainToolbar />
      {children}
    </main>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element
};

export default MainLayout;
