import apiClient from './axios';
import { AxiosResponse } from 'axios';

// Generic API client class
export class ApiClient {
  /**
   * Generic GET request
   * @param url - The endpoint URL
   * @param params - Optional query parameters
   * @returns Promise with the response data
   */
  static async get<T = any>(
    url: string,
    params?: Record<string, any>
  ): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.get(url, { params });
    return response.data;
  }

  /**
   * Generic POST request
   * @param url - The endpoint URL
   * @param data - The request payload
   * @param config - Optional axios config
   * @returns Promise with the response data
   */
  static async post<T = any, D = any>(
    url: string,
    data?: D,
    config?: Record<string, any>
  ): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.post(url, data, config);
    return response.data;
  }

  /**
   * Generic PUT request
   * @param url - The endpoint URL
   * @param data - The request payload
   * @param config - Optional axios config
   * @returns Promise with the response data
   */
  static async put<T = any, D = any>(
    url: string,
    data?: D,
    config?: Record<string, any>
  ): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.put(url, data, config);
    return response.data;
  }

  /**
   * Generic DELETE request
   * @param url - The endpoint URL
   * @param config - Optional axios config
   * @returns Promise with the response data
   */
  static async delete<T = any>(
    url: string,
    config?: Record<string, any>
  ): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.delete(url, config);
    return response.data;
  }
}

// Convenience functions for direct usage
export const api = {
  get: <T = any>(url: string, params?: Record<string, any>) => 
    ApiClient.get<T>(url, params),
  
  post: <T = any, D = any>(url: string, data?: D, config?: Record<string, any>) => 
    ApiClient.post<T, D>(url, data, config),
  
  put: <T = any, D = any>(url: string, data?: D, config?: Record<string, any>) => 
    ApiClient.put<T, D>(url, data, config),
  
  delete: <T = any>(url: string, config?: Record<string, any>) => 
    ApiClient.delete<T>(url, config),
};

// Export default as the convenience api object
export default api;
