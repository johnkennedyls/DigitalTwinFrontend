import axios from './utils/axios'

export const getProcessesData = () => {
    return new Promise((resolve, reject) => {
        axios.get("processes")
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
}

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
}

export const addProcess = (process) => {
    return new Promise((resolve, reject) => {
        axios.post("processes/add", process)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
}

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
}

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
}
