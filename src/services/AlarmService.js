import axios from './utils/axios'

export function getAlarmsGenerate () {
  return axios.get('alarms/active')
    .then(response => response.data)
    .catch(error => {
      console.error(error)
      throw error
    })
}

export function getAlarmsHistory () {
  return axios.get('alarms/history')
    .then(response => response.data)
    .catch(error => {
      console.error(error)
      throw error
    })
}

export function getAlarmById (alarmid) {
  return axios.get(`alarms/${alarmid}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error)
      throw error
    })
}

export function getAllAlarmsClosedByPlantId (plantid) {
  return axios.get(`alarms/history${plantid}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error)
      throw error
    })
}

export function getAllAlarmsActiveByPlantId (plantid) {
  return axios.get(`alarms/active${plantid}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error)
      throw error
    })
}

export function getAllActionsHistoryByAlarm (alarmid) {
  return axios.get(`actionHistory/${alarmid}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error)
      throw error
    })
}

export function addHistoryAction (action, alarmid) {
  return axios.post(`actionHistory/create/${alarmid}`, action)
    .then(response => response.data)
    .catch(error => {
      console.error(error)
      throw error
    })
}

