import axios from 'axios';
import type { Tour, Performance } from '@/types';

const API_BASE_URL = '/api';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.timeout = 10000;

const handleApiError = (err: unknown): never => {
  if (axios.isAxiosError(err)) {
    const message = err.response
      ? `API error: ${err.response.status} - ${err.response.statusText}`
      : err.request
      ? 'No response from server. Is the API server running?'
      : `Request error: ${err.message}`;
    throw message;
  }
  throw String(err);
};


const apiService = {
  async getAllTours(): Promise<Tour[]> {
    try {
      const response = await axios.get<Tour[]>(`${API_BASE_URL}/tours`);
      return response.data;
    } catch (err) {
      return handleApiError(err);
    }
  },

  async getTourById(id: string): Promise<Tour> {
    try {
      const response = await axios.get<Tour>(`${API_BASE_URL}/tours/${id}`);
      return response.data;
    } catch (err) {
      return handleApiError(err);
    }
  },

  async getTourPerformances(tourId: string): Promise<Performance[]> {
    try {
      const response = await axios.get<Performance[]>(`${API_BASE_URL}/tours/${tourId}/performances`);
      return response.data;
    } catch (err) {
      return handleApiError(err);
    }
  }
};

export default apiService;
