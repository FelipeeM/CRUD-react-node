import axios from "axios";
const apiService = axios.create({
    baseURL: process.env.NODE_ENV === 'development'?  "http://localhost:3333/api/v1" : process.env.URL_API,
    timeout: 10000,
});

export default apiService;
