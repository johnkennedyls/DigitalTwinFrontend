import axios from 'axios';
const API_URL = "http://localhost:8080"

class AlarmService{

    async getAlarms() {
        try {
        const response = await axios.get(API_URL+"/alarms");
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
}

export default new AlarmService();