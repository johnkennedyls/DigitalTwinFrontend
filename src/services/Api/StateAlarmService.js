import axios from '../axios';

export function changeStateAlarm (stateAlarm, alarmid) {
  return axios.post(`statesAlarm/change/${alarmid}`, stateAlarm)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}
