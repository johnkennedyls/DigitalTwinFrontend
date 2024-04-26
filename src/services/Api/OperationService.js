import axios from '../axios';

export const getOperations = () => {
    return new Promise((resolve, reject) => {
        axios.get('operation')
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            console.error(error);
            reject(error);
          });
    });
}

export const applyOperation = (operation) => {
    return new Promise((resolve, reject) => {
        axios.post('operation', operation)
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            console.error(error);
            reject(error);
          });
    });
}