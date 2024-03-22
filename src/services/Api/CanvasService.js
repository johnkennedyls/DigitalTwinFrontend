import { ErrorAlert, SuccessAlert } from '../../components/utils/Alert';
import axios from '../axios';

export function getCanvasData () {
  return axios.get('canvases')
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function getCanvas (canvasId) {
  return axios.get(`canvases/${canvasId}`)
    .then(response => response.data)
    .catch(error => {
      ErrorAlert(error.response.data);
    });
}

export function deleteCanvas (canvasId) {
  return axios.delete(`canvases/${canvasId}`)
    .then(response => {
        SuccessAlert(response.data)
        window.location.reload()  
      }
    )
    .catch(error => {
      ErrorAlert(error.response.data);
    });
}