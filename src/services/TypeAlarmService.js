import axios from 'axios';
const API_URL = "http://localhost:8080"


export function getTypeAlarms() {
  return axios.get(API_URL+"/typeAlarms/")
      .then(response => response.data)
      .catch(error => {
          console.error(error);
          throw error;
      });
}

export function getTypeAlarmsByPlant(plantid) {
    return axios.get(`${API_URL}/typeAlarms/plant/${plantid}`)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
  }

export function getTypeAlarmById(alarmid) {
  return axios.get(`${API_URL}/typeAlarms/${alarmid}`)
      .then(response => response.data)
      .catch(error => {
          console.error(error);
          throw error;
      });
}

export function deleteTypeAlarm(alarmid) {
  return axios.delete(`${API_URL}/typeAlarms/delete/${alarmid}`)
      .then(response => response.data)
      .catch(error => {
          console.error(error);
          throw error;
      });
}

export function createTypeAlarm(alarmData) {
  return axios.post(`${API_URL}/typeAlarms/create`, alarmData)
      .then(response => response.data)
      .catch(error => {
          console.error(error);
          throw error;
      });
}

export function updateTypeAlarm(alarmid,alarmData) {
  return axios.put(`${API_URL}/typeAlarms/edit/${alarmid}`, alarmData)
      .then(response => response.data)
      .catch(error => {
          console.error(error);
          throw error;
      });
}

export function getEmails() {
  return axios.get(API_URL+"/emails")
      .then(response => response.data)
      .catch(error => {
          console.error(error);
          throw error;
      });
}

export function getTags() {
  return axios.get(API_URL+"/tags")
      .then(response => response.data)
      .catch(error => {
          console.error(error);
          throw error;
      });
}

export function getEvents() {
  return axios.get(API_URL+"/events")
      .then(response => response.data)
      .catch(error => {
          console.error(error);
          throw error;
      });
}