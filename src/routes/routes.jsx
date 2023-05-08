import React from 'react';
import { Route } from 'react-router';
import AddAlarm from '../pages/alarm-management/AddAlarm';
import EditAlarm from '../pages/alarm-management/EditAlarm';
import ListAlarm from '../pages/alarm-management/ListAlarm';
import AddPlant from '../pages/plant-management/AddPlant.jsx';
import EditPlant from '../pages/plant-management/EditPlant.jsx';
import ListPlant from '../pages/plant-management/ListPlant.jsx';
import PlantPage from '../pages/plant-management/PlantPage.jsx';
import App from '../App.jsx'

const routes = () => (
  <React.Fragment>
    <Route path="/add-alarm" component={AddAlarm} />
    <Route path="/edit-alarm" component={EditAlarm} />
    <Route path="/manage-alarm" component={ListAlarm} />
    <Route path="/add-plant" component={AddPlant}/>
    <Route path="/edit-plant" component={EditPlant}/>
    <Route path="/list-plant" component={ListPlant}/>
    <Route path="/plants/:id" component={PlantPage} />
  </React.Fragment>
);

export default routes;