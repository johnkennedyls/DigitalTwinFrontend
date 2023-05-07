import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const getPlantsData = () => {
    return new Promise((resolve, reject) => {
        axios.get(API_URL + "/plants")
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
}

