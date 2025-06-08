import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Define a type for your API response shape (adjust as needed)
type ApiResponse<T = any> = {
  data: T;
  message?: string;
  success: boolean;
};

// Create a configured Axios instance
const createApi = (baseURL?: string): AxiosInstance => {
  const api = axios.create({
    baseURL: baseURL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
    withCredentials: true, // Send cookies automatically
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor (client-side only)
  if (typeof window !== 'undefined') {
    api.interceptors.request.use((config) => {
      // Add auth token from localStorage if it exists
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Response interceptor
  api.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      // You can standardize successful responses here
      return response.data; // Return only the data part by default
    },
    (error: AxiosError<ApiResponse>) => {
      // Handle errors globally
      if (error.response?.status === 401) {
        console.error('Unauthorized - Redirect to login');
        // window.location.href = '/login'; // Client-side redirect
      }
      return Promise.reject(error.response?.data || error.message);
    }
  );

  return api;
};

// Export the configured instance (client-side)
const Api = createApi();
export default Api;

// For server-side usage (e.g., in getServerSideProps)
export const ServerApi = (ctx?: any) => {
  // Pass cookies from the context (Next.js server-side)
  const instance = createApi(process.env.API_BASE_URL);

  if (ctx?.req?.cookies) {
    instance.interceptors.request.use((config) => {
      config.headers.Cookie = ctx.req.headers.cookie || '';
      return config;
    });
  }

  return instance;
};