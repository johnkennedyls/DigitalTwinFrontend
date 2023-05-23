import axios from './utils/axios';


export function getTypeAlarms() {
  return axios.get("typeAlarms/")
      .then(response => response.data)
      .catch(error => {
          console.error(error);
          throw error;
      });
}

export function getTypeAlarmsByPlant(plantid) {
    return axios.get(`typeAlarms/plant/${plantid}`)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
  }

export function getTypeAlarmById(alarmid) {
  return axios.get(`typeAlarms/${alarmid}`)
      .then(response => response.data)
      .catch(error => {
          console.error(error);
          throw error;
      });
}

export function deleteTypeAlarm(alarmid) {
  return axios.delete(`typeAlarms/delete/${alarmid}`)
      .then(response => response.data)
      .catch(error => {
          console.error(error);
          throw error;
      });
}

export function createTypeAlarm(alarmData) {
  return axios.post(`typeAlarms/create`, alarmData)
      .then(response => response.data)
      .catch(error => {
          console.error(error);
          throw error;
      });
}

export function updateTypeAlarm(alarmid,alarmData) {
  return axios.put(`typeAlarms/edit/${alarmid}`, alarmData)
      .then(response => response.data)
      .catch(error => {
          console.error(error);
          throw error;
      });
}

export function getEmails() {
  return axios.get("http://xgrid103:8080/saamfiapi/public/institutions/1/systems/23/users")
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
  return axios.get("events/")
      .then(response => response.data)
      .catch(error => {
          console.error(error);
          throw error;
      });
}