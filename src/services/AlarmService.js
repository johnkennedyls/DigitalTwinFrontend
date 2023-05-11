import axios from 'axios';
const API_URL = "http://localhost:8080"

class AlarmService {

  async getAlarms() {
    try {
      const response = await axios.get(API_URL + "/alarms");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAlarmById(alarmid) {
    try {
      const response = await axios.get(`${API_URL}/alarm/${alarmid}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteAlarm(alarmid) {
    try {
      const response = await axios.delete(`${API_URL}/alarm/delete/${alarmid}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createAlarm(alarmData) {
    try {
      const response = await axios.post(`${API_URL}/alarm/create`, alarmData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateAlarm(alarmid, alarmData) {
    try {
      const response = await axios.put(`${API_URL}/alarm/update/${alarmid}`, alarmData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getEmails() {
    try {
      const response = await axios.get(API_URL + "/emails");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getTags() {
    try {
      const response = await axios.get(API_URL + "/tags");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getEvents() {
    try {
      const response = await axios.get(API_URL + "/events");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

}

export default new AlarmService();