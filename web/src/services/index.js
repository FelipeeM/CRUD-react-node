import axios from "axios";
const apiService = axios.create({
    baseURL: process.env.URL_API || "http://localhost:3333/api/v1",
    timeout: 10000,
});

export default apiService;
