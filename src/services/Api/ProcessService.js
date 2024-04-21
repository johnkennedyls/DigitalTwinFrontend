import { ErrorRounded } from '@mui/icons-material';
import axios from '../axios';

export const getProcessesData = () => {
  return new Promise((resolve, reject) => {
    axios.get('processes')
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const getProcessData = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`processes/${id}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const addProcess = (process) => {
  return new Promise((resolve, reject) => {
    axios.post('processes/', process)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const editProcess = (process) => {
  return new Promise((resolve, reject) => {
    axios.put(`processes/edit/${process.id}`, process)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const deleteProcess = (id) => {
  return new Promise((resolve, reject) => {
    axios.delete(`processes/delete/${id}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const getExutionsByProcess = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`processes/${id}/executions`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const getProcessByPlant = (assetId) => {
  return new Promise((resolve, reject) => {
    axios.get(`processes/${assetId}/processes`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const startProcess = (id) => {
  return new Promise((resolve, reject) => {
    axios.post(`processes/start/${id}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const pauseProcess = (id) => {
  return new Promise((resolve, reject) => {
    axios.post(`processes/pause/${id}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const stopProcess = (id) => {
  return new Promise((resolve, reject) => {
    axios.post(`processes/stop/${id}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const addManualMeasurement = (manualMeasurement) => {
  return new Promise((resolve, reject) => {
    axios.post(`processes/manual`, manualMeasurement)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};
