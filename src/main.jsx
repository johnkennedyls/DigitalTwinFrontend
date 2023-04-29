import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch } from "react-router-dom";
import routes from "./routes/routes.jsx";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        {routes()}
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
