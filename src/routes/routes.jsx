import { Route, Switch } from 'react-router';
import AddAlarm from '../pages/alarm-management/AddAlarm';
import EditAlarm from '../pages/alarm-management/EditAlarm';
import ListAlarm from '../pages/alarm-management/ListAlarm';
import ListTimeSeries from '../pages/charts-management/ListTimeSeries';
import Plant from '../pages/plant-management/Plant';
import WelcomeLayout from '../layouts/welcome/WelcomeLayout';
import TestChart from '../components/charts/TestChart';

import App from '../App';


const MainLayoutRoutes = () => (
  <App>
    <Switch>
      <Route path="/add-alarm" component={AddAlarm} />
      <Route path="/edit-alarm" component={EditAlarm} />
      <Route path="/manage-alarm" component={ListAlarm} />
      <Route path="/manage-charts" component={ListTimeSeries} />
      <Route path="/chart" component={TestChart} />
      <Route path="/svg" component={Plant} />
    </Switch>
  </App>
);

const routes = () => (
  <Switch>
    <Route exact path="/" component={WelcomeLayout} />
    <Route component={(MainLayoutRoutes)} />
  </Switch>
);

export default routes;
