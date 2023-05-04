import axios from 'axios';
const API_URL = "http://localhost:8080"

class TypeAlarmService{

    async getTypeAlarms() {
        try {
        const response = await axios.get(API_URL+"/type-alarms");
        return response.data;
        } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async getTypeAlarmById(alarmid) {
        try {
        const response = await axios.get(`${API_URL}/type-alarm/${alarmid}`);
        return response.data;
        } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async deleteTypeAlarm(alarmid) {
        try {
        const response = await axios.delete(`${API_URL}/type-alarm/delete/${alarmid}`);
        return response.data;
        } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async createTypeAlarm(alarmData) {
        try {
          const response = await axios.post(`${API_URL}/type-alarm/create`, alarmData);
          return response.data;
        } catch (error) {
          console.error(error);
          throw error;
        }
    }

    async updateTypeAlarm(alarmid,alarmData) {
        try {
            const response = await axios.put(`${API_URL}/type-alarm/update/${alarmid}`, alarmData);
            return response.data;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }

      async getEmails() {
        try {
        const response = await axios.get(API_URL+"/emails");
        return response.data;
        } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async getTags() {
        try {
        const response = await axios.get(API_URL+"/tags");
        return response.data;
        } catch (error) {
        console.error(error);
        throw error;
      }
    }

    async getEvents() {
        try {
        const response = await axios.get(API_URL+"/events");
        return response.data;
        } catch (error) {
        console.error(error);
        throw error;
      }
    }

}

export default new TypeAlarmService();