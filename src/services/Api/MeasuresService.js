import axios from '../axios';

export const registerManualMeasurement = (manualMeasurement) => {
    return new Promise((resolve, reject) => {
      axios.post('measures/', manualMeasurement)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
};