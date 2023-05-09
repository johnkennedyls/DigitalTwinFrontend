import React from 'react';
import { Route } from 'react-router';
import AddAlarm from '../pages/alarm-management/AddAlarm';
import EditAlarm from '../pages/alarm-management/EditAlarm';
import ListAlarm from '../pages/alarm-management/ListAlarm';
import AddPlant from '../pages/plant-management/AddPlant';
import TagsPlantForm from '/src/components/plant/TagsPlantForm'
import LoadPlantSvgForm from '/src/components/plant/LoadPlantSvgForm';
import EditPlant from '../pages/plant-management/EditPlant';
import ListPlant from '../pages/plant-management/ListPlant';
import PlantPage from '../pages/plant-management/PlantPage';

const routes = () => (
  <React.Fragment>
    <Route path="/add-alarm" component={AddAlarm} />
    <Route path="/edit-alarm" component={EditAlarm} />
    <Route path="/manage-alarm" component={ListAlarm} />
    <Route path="/add-plant" component={AddPlant}/>
    <Route path="/add-plant-2" component={TagsPlantForm}/>
    <Route path="/add-plant-3" component={LoadPlantSvgForm}/>
    <Route path="/edit-plant" component={EditPlant}/>
    <Route path="/list-plant" component={ListPlant}/>
    <Route path="/plants/:id" component={PlantPage} />
  </React.Fragment>
);

export default routes;