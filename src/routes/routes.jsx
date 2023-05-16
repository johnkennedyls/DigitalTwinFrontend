import React from 'react';
import { Route } from 'react-router';
import AddTypeAlarm from '../pages/type-alarm-management/AddTypeAlarm';
import EditTypeAlarm from '../pages/type-alarm-management/EditTypeAlarm';
import ListTypeAlarm from '../pages/type-alarm-management/ListTypeAlarm';
import ListAlarmGenerate from '../pages/alarm-navegator/ListAlarmGenerate';
import DetailAlarmGenerate from '../pages/alarm-navegator/DetailAlarmGenerate';

const routes = () => (
  <React.Fragment>
    <Route path="/add-type-alarm" component={AddTypeAlarm} />
    <Route path="/edit-type-alarm/:id" component={EditTypeAlarm} />
    <Route path="/manage-type-alarm" component={ListTypeAlarm} />
    <Route path="/navegator-alarm" component={ListAlarmGenerate} />
    <Route path="/detail-alarm/:id" component={DetailAlarmGenerate} />
  </React.Fragment>
);

export default routes;