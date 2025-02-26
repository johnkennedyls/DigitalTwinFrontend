import axios from 'axios';

import { store } from '../reducers/Store.js';
import { isLoading } from '../reducers/loading/loadingSlice.js';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
    Authorization: {
      toString () {
        return `Bearer ${localStorage.getItem('access_token')}`;
      }
    }
  },

  validateStatus: function validateStatus (status) {
    if (status === 401 || status === 403) {
      localStorage.removeItem('access_token');
      window.location.href = '/dashboard';
    }
    return status >= 200 && status < 300;
  }
});

instance.interceptors.request.use(
  request => {
    store.dispatch(isLoading(true));
    return request;
  }
);

instance.interceptors.response.use(
  response => {
    store.dispatch(isLoading(false));
    return response;
  },
  error => {
    store.dispatch(isLoading(false));
    return Promise.reject(error);
  }
);

export default instance;
