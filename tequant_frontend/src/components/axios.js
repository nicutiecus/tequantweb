import axios from 'axios';

// The logic you provided:
const API_BASE = (process.env.REACT_APP_API_URL) || 'http://127.0.0.1:8000';

//console.log("Current API Base:", API_BASE); // for debugging

// Create a configured axios instance
const api = axios.create({
    baseURL: API_BASE,
});

export default api;