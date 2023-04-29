import React from 'react';
import { Route } from 'react-router';
import AddAlarm from '../pages/alarm-management/AddAlarm';
import EditAlarm from '../pages/alarm-management/EditAlarm';
import ListAlarm from '../pages/alarm-management/ListAlarm';

const routes = () => (
  <React.Fragment>
    <Route path="/add-alarm" component={AddAlarm} />
    <Route path="/edit-alarm" component={EditAlarm} />
    <Route path="/manage-alarm" component={ListAlarm} />
  </React.Fragment>
);

export default routes;