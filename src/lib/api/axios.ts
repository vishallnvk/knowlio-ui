import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';
import appConfig from '../../app-config.json';

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: appConfig.api,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Get the current auth session from AWS Amplify
      const session = await fetchAuthSession();
      
      // Extract the access token from the session
      const accessToken = session.tokens?.accessToken?.toString();
      
      if (accessToken) {
        // Add the Authorization header with Bearer token
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      // If there's no valid session, continue without auth header
      console.warn('No valid auth session found:', error);
    }
    
    return config;
  }
);

// Export the configured axios instance
export default apiClient;
