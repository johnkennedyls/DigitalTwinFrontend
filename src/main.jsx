import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import AddAlarm from "./pages/alarm-management/AddAlarm.jsx";
import EditAlarm from "./pages/alarm-management/EditAlarm.jsx";
import ListAlarm from "./pages/alarm-management/ListAlarm.jsx";
import routes from "./routes/routes.jsx";
import "./index.css";

const router = new BrowserRouter({ routes });

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/add-alarm" component={AddAlarm} />
        <Route path="/edit-alarm" component={EditAlarm} />
        <Route path="/manage-alarm" component={ListAlarm} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
