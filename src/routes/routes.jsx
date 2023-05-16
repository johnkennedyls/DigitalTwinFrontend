import { Route, Switch } from 'react-router';
import WelcomeLayout from '../layouts/welcome/WelcomeLayout';
import AddPlant from '../pages/plant-management/AddPlant';
import EditPlant from '../pages/plant-management/EditPlant';
import ListPlant from '../pages/plant-management/ListPlant';
import ListTimeSeries from '../pages/charts-management/ListTimeSeries';
import Plant from '../pages/plant-management/Plant';  
import AddTypeAlarm from '../pages/type-alarm-management/AddTypeAlarm';
import EditTypeAlarm from '../pages/type-alarm-management/EditTypeAlarm';
import ListTypeAlarm from '../pages/type-alarm-management/ListTypeAlarm';
import ListAlarmGenerate from '../pages/alarm-navegator/ListAlarmGenerate';
import DetailAlarmGenerate from '../pages/alarm-navegator/DetailAlarmGenerate';
import TestChart from '../components/charts/TestChart';

import App from '../App';


const MainLayoutRoutes = () => (
  <App>
    <Switch>
      <Route path="/add-type-alarm" component={AddTypeAlarm} />
      <Route path="/edit-type-alarm/:id" component={EditTypeAlarm} />
      <Route path="/manage-type-alarm" component={ListTypeAlarm} />
      <Route path="/navegator-alarm" component={ListAlarmGenerate} />
      <Route path="/detail-alarm/:id" component={DetailAlarmGenerate} />
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
