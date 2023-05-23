if (typeof window !== 'undefined') {
  window.global = window;
} else {
  window.global = {}
}
import "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from 'react-redux'
import routes from "./routes/routes.jsx";
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/dashboard">
        <Switch>
          {routes()}
        </Switch>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
