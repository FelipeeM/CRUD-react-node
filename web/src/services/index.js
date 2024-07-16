import axios from "axios";

const apiService = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    timeout: 10000,
});

export default apiService;
