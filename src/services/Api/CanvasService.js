import { ErrorAlert, SuccessAlert } from '../../components/utils/Alert';
import axios from '../axios';

export function getChartTypes () {
  return axios.get('chart_types')
    .then(response => response.data)
    .catch(error => {
      ErrorAlert(error.response.data);
    });
}

export function getChartType (typeId) {
  return axios.get(`chart_types/${typeId}`)
    .then(response => response.data)
    .catch(error => {
      ErrorAlert(error.response.data);
    });
}

export function getCanvasData () {
  return axios.get('canvases')
    .then(response => response.data)
    .catch(error => {
      ErrorAlert(error.response.data);
    });
}

export function getCanvas (canvasId) {
  return axios.get(`canvases/${canvasId}`)
    .then(response => response.data)
    .catch(error => {
      ErrorAlert(error.response.data);
    });
}

export function saveCanvas (canvas) {
  return axios.post('canvases', canvas)
    .then(response => {
      SuccessAlert(response.data.message)
      return response.data.canvasId
    })
    .catch(error => {
      ErrorAlert(error.response.data[0]);
    });
}

export function editCanvas (canvas, canvasId) {
  return axios.put(`canvases/${canvasId}`, canvas)
    .then(response => {
      SuccessAlert(response.data)
    })
    .catch(error => {
      ErrorAlert(error.response.data[0] || error.response.data);
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

export function addChartToCanvas (canvasId, chart) {
  return axios.post(`charts`, { ...chart, canvasId })
    .then(response => {
      SuccessAlert(response.data)
    })
    .catch(error => {
      ErrorAlert(error.response.data);
    });
}

export function editChartFromCanvas (chartId, chart) {
  return axios.put(`charts/${chartId}`, chart)
    .then(response => {
      SuccessAlert(response.data)
    })
    .catch(error => {
      ErrorAlert(error.response.data);
    });
}

export function deleteChartFromCanvas (chartId) {
  return axios.delete(`charts/${chartId}`)
    .then(response => {
      SuccessAlert(response.data)
    })
    .catch(error => {
      ErrorAlert(error.response.data);
    });
}