import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';
import AddAlarm from '../pages/alarm-management/AddAlarm';
import EditAlarm from '../pages/alarm-management/EditAlarm';
import ListAlarm from '../pages/alarm-management/ListAlarm';
import ListTimeSeries from '../pages/charts-management/ListTimeSeries';
import WelcomeLayout from '../layouts/welcome/WelcomeLayout';
import MainLayout from '../layouts/main/MainLayout';
import SVGRender from '../components/svg/SVGRender';
import TestChart from '../components/charts/TestChart';

const MainLayoutRoutes = () => (
  <Switch>
    <Route path="/add-alarm" component={AddAlarm} />
    <Route path="/edit-alarm" component={EditAlarm} />
    <Route path="/manage-alarm" component={ListAlarm} />
    <Route path="/manage-charts" component={ListTimeSeries} />
    <Route path="/chart" component={TestChart} />
    <Route path="/svg" component={SVGRender} />
  </Switch>
);

const withMainLayout = (Component) => {
  const WithMainLayoutWrapper = (props) => (
    props.location.pathname === '/'
      ? <Component {...props} />
      : <MainLayout><Component {...props} /></MainLayout>
  );

  WithMainLayoutWrapper.propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  return WithMainLayoutWrapper;
};

const routes = () => (
  <Switch>
    <Route exact path="/" component={WelcomeLayout} />
    <Route component={withMainLayout(MainLayoutRoutes)} />
  </Switch>
);

export default routes;
