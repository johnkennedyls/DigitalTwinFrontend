import axios from 'axios';
const API_URL = "http://localhost:8080"


    export function getAlarmsGenerate() {
      return axios.get(API_URL+"/alarms/")
          .then(response => response.data)
          .catch(error => {
              console.error(error);
              throw error;
          });
    }

    export function getAlarmById(alarmid) {
      return axios.get(`${API_URL}/alarms/${alarmid}`)
          .then(response => response.data)
          .catch(error => {
              console.error(error);
              throw error;
          });
    }


