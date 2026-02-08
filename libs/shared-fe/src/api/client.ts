import 'dotenv/config'

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_ENDPOINTS } from './endpoints';

// API client configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || `http://${process.env.NX_API_GATEWAY_HOST}:${process.env.NX_API_GATEWAY_PORT}`;
console.log(">>>check api base : ", API_BASE_URL)
// Create axios instance
export const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

let isRefreshing = false
let failQueue: any[] = []

const processQueue = (error: any, token: string | null) => {
    failQueue.forEach((p) => {
        if (error) p.reject(error)
        else p.resolve(token)
    })
    failQueue = []
}

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        try {
            // Get token from localStorage or cookie
            const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            return Promise.reject(error)
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors and token refresh
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Handle 401 Unauthorized - Token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failQueue.push({ resolve, reject })
                })
                    .then(token => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return apiClient(originalRequest);
                    })
                    .catch(error => {
                        return Promise.reject(error);
                    })
            }

            isRefreshing = true

            try {
                // Try to refresh token
                const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;

                if (refreshToken) {
                    const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`, {
                        refreshToken,
                    });

                    const { accessToken } = response.data.data;

                    if (typeof window !== 'undefined') {
                        localStorage.setItem('accessToken', accessToken);
                    }

                    // Retry original request with new token
                    if (originalRequest.headers) {
                        processQueue(null, accessToken);
                        isRefreshing = false;
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    }

                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                isRefreshing = false;
                processQueue(refreshError, null);
                // Refresh failed - logout user
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
