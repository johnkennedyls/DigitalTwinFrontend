import { Route, Switch } from 'react-router';

import Landing from '../pages/landing-page/Landing';
import AddPlant from '../pages/plant-management/AddPlant';
import EditPlant from '../pages/plant-management/EditPlant';
import ListPlant from '../pages/plant-management/ListPlant';
import DetailTypeAlarm from '../pages/type-alarm-management/DetailTypeAlarm';
import ListTimeSeries from '../pages/charts-management/TimeSeries/ListTimeSeries';
import Plant from '../pages/plant-management/Plant';
import AddTypeAlarm from '../pages/type-alarm-management/AddTypeAlarm';
import EditTypeAlarm from '../pages/type-alarm-management/EditTypeAlarm';
import ListTypeAlarm from '../pages/type-alarm-management/ListTypeAlarm';
import ListAlarmGenerate from '../pages/alarm-navegator/ListAlarmGenerate';
import ListAlarmHistory from '../pages/alarm-navegator/ListAlarmHistory';
import DetailAlarm from '../pages/alarm-navegator/DetailAlarm';
import ListProcess from '../pages/process-management/ListProcess';
import AddProcess from '../pages/process-management/AddProcess';
import ListExecutionsProcess from '../pages/process-management/ListExecutionsProcess';
import App from '../App';
import ListCanvas from '../pages/charts-management/ListCanvas';
import AddManualMeasurement from '../pages/process-management/AddManualMeasurement';
import RegisterManualMeasurementForm from '../pages/process-management/components/forms/RegisterManualMeasurementForm';


// eslint-disable-next-line react-refresh/only-export-components
const MainLayoutRoutes = () => (
  <App>
    <Switch>
      <Route path="/add-type-alarm" component={AddTypeAlarm} />
      <Route path="/edit-type-alarm/:id" component={EditTypeAlarm} />
      <Route path="/detail-type-alarm/:id" component={DetailTypeAlarm} />
      <Route path="/manage-type-alarm" component={ListTypeAlarm} />
      <Route path="/navegator-alarm-active" component={ListAlarmGenerate} />
      <Route path="/navegator-alarm-history" component={ListAlarmHistory} />
      <Route path="/detail-alarm/:id" component={DetailAlarm} />
      <Route path="/add-plant" component={AddPlant} />
      <Route path="/edit-plant/:plantId" component={EditPlant} />
      <Route path="/manage-plant" component={ListPlant} />
      <Route path="/detail-plant/:plantId" component={Plant} />
      <Route exact path="/manage-charts" component={ListCanvas} />
      <Route path="/manage-charts/:canvasId" component={ListTimeSeries} />
      <Route exact path="/create-charts" component={ListTimeSeries} />
      <Route path="/manage-process" component={ListProcess} />
      <Route path="/process-executions/:processId" component={ListExecutionsProcess} />
      <Route path="/add-process" component={AddProcess} />
      <Route path="/add-manual" component={AddManualMeasurement} />
      <Route path="*" component={Landing} />
    </Switch>
  </App>
);

const routes = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route component={(MainLayoutRoutes)} />
    <Route path="*" component={Landing} />
  </Switch>
);

export default routes;
