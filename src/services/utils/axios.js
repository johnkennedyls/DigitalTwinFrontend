
import axios from "axios";

export default axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
        Authorization: {
            toString() {
                return `Bearer ${localStorage.getItem("access_token")}`;
            },
        },
    },

    /*
    validateStatus: function validateStatus(status) {
        if (status === 401 || status === 403) {
            localStorage.removeItem("access_token");
            
            window.location.href = "/dashboard";
        }
        return status >= 200 && status < 300;
    },
    */
});