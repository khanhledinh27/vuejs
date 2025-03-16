import axios from 'axios';

// Create axios instance with custom config
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // You can add auth token here if needed
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors globally
        if (error.response) {
            // Handle specific status codes if needed
            switch (error.response.status) {
                case 401:
                    // Handle unauthorized
                    break;
                case 404:
                    // Handle not found
                    break;
                case 500:
                    // Handle server error
                    break;
            }
        }
        return Promise.reject(error);
    }
);

export default api; 