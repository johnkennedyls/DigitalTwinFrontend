import axios from './utils/axios';
// const API_URL = import.meta.env.VITE_API_URL;

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
  console.log(plant);
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

export const getDelimitedData = (plantId, startDate, endDate) => {
  return new Promise((resolve, reject) => {
    axios.get(`plants/delimited/${plantId}/${startDate}/${endDate}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};
