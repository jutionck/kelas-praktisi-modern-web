import axios from 'axios';
import { API_BASE_URL } from '../constants';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      _t: Date.now(),
    };

    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'An error occurred';
    console.error(
      `API Error: ${error.response?.status || 'Unknown'} - ${message}`
    );

    const enhancedError = {
      ...error,
      userMessage: getUserFriendlyMessage(error),
      statusCode: error.response?.status,
      isNetworkError: !error.response,
    };

    return Promise.reject(enhancedError);
  }
);

const getUserFriendlyMessage = (error) => {
  if (!error.response) {
    return 'Network error. Please check your internet connection and try again.';
  }

  const { status, data } = error.response;

  switch (status) {
    case 400:
      return data?.message || 'Invalid request. Please check your input.';
    case 404:
      return 'Item not found.';
    case 429:
      return 'Too many requests. Please wait a moment and try again.';
    case 500:
      return 'Server error. Please try again later.';
    default:
      return data?.message || 'Something went wrong. Please try again.';
  }
};

export default apiClient;
