import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { Config } from '../constants/config';
import { useAuthStore } from '../store/authStore';

export const apiClient = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor for token refresh / error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired, trigger logout or refresh
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default apiClient;

