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


import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import rootReducer from './reducers'; // the value from combineReducers
import { PersistGate } from 'redux-persist/integration/react';


const root = ReactDOM.createRoot(document.getElementById("root"));

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  }),
});

export const persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter basename="/dashboard">
            <Switch>
              {routes()}
            </Switch>
          </BrowserRouter>
        </PersistGate>
    </Provider>
  </React.StrictMode>
);
