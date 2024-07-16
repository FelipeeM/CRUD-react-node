import axios from "axios";
const apiService = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    timeout: 10000,
});

export default apiService;
