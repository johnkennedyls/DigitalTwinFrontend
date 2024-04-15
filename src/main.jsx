import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import routes from './routes/routes';
import { store, persistor } from './reducers/Store.js';

if (typeof window !== 'undefined') {
  window.global = window;
} else {
  window.global = {};
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename="/dashboard">
        <Switch>
          {routes()}
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
