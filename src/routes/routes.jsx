import AddAlarm from "../pages/alarm-management/AddAlarm.jsx";
import EditAlarm from "../pages/alarm-management/EditAlarm.jsx"; 
import ListAlarm from "../pages/alarm-management/ListAlarm.jsx";

const routes = [
  {
    path: "/manage-alarm",
    component: <ListAlarm />
  },
  {
    path: "/edit-alarm",
    component: <EditAlarm />
  },
  {
    path: "/add-alarm",
    component: <AddAlarm />
  }
];

export default routes;
