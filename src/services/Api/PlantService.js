import { LIMIT_STORED_DATA } from '../../config';
import axios from '../axios';

export const getPlantsData = () => {
  return new Promise((resolve, reject) => {
    axios.get('plants')
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const getPlantData = (plantId) => {
  return new Promise((resolve, reject) => {
    axios.get(`plants/${plantId}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const addPlant = (plant) => {
  return new Promise((resolve, reject) => {
    axios.post('plants/add', plant)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const editPlant = (plant, plantId) => {
  return new Promise((resolve, reject) => {
    axios.put(`plants/edit/${plantId}`, plant)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const deletePlant = (plantId) => {
  return new Promise((resolve, reject) => {
    axios.delete(`plants/delete/${plantId}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const getDelimitedData = (assetId, startDate, endDate) => {
  return new Promise((resolve, reject) => {
    axios.get(`measures?assetId=${assetId}&startDate=${startDate}&endDate=${endDate}&maxLimit=${LIMIT_STORED_DATA}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};
