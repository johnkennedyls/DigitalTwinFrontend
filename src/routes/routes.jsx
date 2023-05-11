import { Route, Switch } from 'react-router';
import AddAlarm from '../pages/alarm-management/AddAlarm';
import EditAlarm from '../pages/alarm-management/EditAlarm';
import ListAlarm from '../pages/alarm-management/ListAlarm';
import AddPlant from '../pages/plant-management/AddPlant';
import EditPlant from '../pages/plant-management/EditPlant';
import ListPlant from '../pages/plant-management/ListPlant';
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
      <Route path="/add-plant" component={AddPlant}/>
      <Route path="/edit-plant/:plantId" component={EditPlant}/>
      <Route path="/manage-plant" component={ListPlant}/>
      <Route path="/manage-plant/:plantId" component={Plant} />
      <Route path="/manage-charts" component={ListTimeSeries} />
      <Route path="/chart" component={TestChart} />
      
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
