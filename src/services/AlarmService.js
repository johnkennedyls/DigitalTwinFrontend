import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

    export function getAlarmsGenerate() {
      return axios.get(API_URL+"/alarms/active")
          .then(response => response.data)
          .catch(error => {
              console.error(error);
              throw error;
          });
    }

    export function getAlarmsHistory() {
        return axios.get(API_URL+"/alarms/history")
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

    export function getAllAlarmsClosedByPlantId(plantid) {
        return axios.get(`${API_URL}/alarms/history${plantid}`)
            .then(response => response.data)
            .catch(error => {
                console.error(error);
                throw error;
            });
      }

      export function getAllAlarmsActiveByPlantId(plantid) {
        return axios.get(`${API_URL}/alarms/active${plantid}`)
            .then(response => response.data)
            .catch(error => {
                console.error(error);
                throw error;
            });
      }

    export function getAllActionsHistoryByAlarm(alarmid) {
        return axios.get(`${API_URL}/actionHistory/${alarmid}`)
            .then(response => response.data)
            .catch(error => {
                console.error(error);
                throw error;
            });
      }

    export function addHistoryAction(action,alarmid) {
        return axios.post(`${API_URL}/actionHistory/create/${alarmid}`,action)
            .then(response => response.data)
            .catch(error => {
                console.error(error);
                throw error;
            });
      }
  

