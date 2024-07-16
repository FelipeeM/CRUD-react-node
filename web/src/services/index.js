import axios from "axios";

const apiService = axios.create({
    baseURL: process.env.URL_API,
    timeout: 10000,
});

export default apiService;
