import axios from 'axios';
const API_URL = "http://localhost:8080"


    export function changeStateAlarm(stateAlarm,alarmid) {
      return axios.post(`${API_URL}/statesAlarm/change/${alarmid}`,stateAlarm)
          .then(response => response.data)
          .catch(error => {
              console.error(error);
              throw error;
          });
    }