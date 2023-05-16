import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;


    export function changeStateAlarm(stateAlarm,alarmid) {
      return axios.post(`${API_URL}/statesAlarm/change/${alarmid}`,stateAlarm)
          .then(response => response.data)
          .catch(error => {
              console.error(error);
              throw error;
          });
    }