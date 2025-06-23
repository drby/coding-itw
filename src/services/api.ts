import axios from 'axios';
import type { Tour, Performance } from '../types/tour.types';

const API_BASE_URL = '/api';
const TOURS_CACHE_KEY = 'tours_cache';
const TOUR_CACHE_PREFIX = 'tour_';
const PERFORMANCES_CACHE_PREFIX = 'performances_tour_';
const CACHE_EXPIRY = 5 * 60 * 1000;

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = false;

const getCachedData = <T>(key: string): T | null => {
  const cachedData = localStorage.getItem(key);
  if (!cachedData) return null;
  try {
    const { data, timestamp } = JSON.parse(cachedData);

    if (Date.now() - timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(key);
      return null;
    }

    return data as T;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};

const setCachedData = <T>(key: string, data: T): void => {
  const cacheData = {
    data,
    timestamp: Date.now()
  };

  localStorage.setItem(key, JSON.stringify(cacheData));
};

export const apiService = {
  async getAllTours(): Promise<Tour[]> {
    const cachedTours = getCachedData<Tour[]>(TOURS_CACHE_KEY);

    if (cachedTours) {
      console.log('Using cached tours data');
      return cachedTours;
    }

    try {
      console.log('Fetching tours from API...');
      const response = await axios.get<Tour[]>(`${API_BASE_URL}/tours`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('API response:', response);
      const tours = response.data;

      setCachedData(TOURS_CACHE_KEY, tours);
      console.log('Tours cached successfully');

      return tours;
    } catch (err: unknown) {
      console.error('Error fetching tours:', err);

      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
          console.error('Response headers:', err.response.headers);
          throw `API error: ${err.response.status} - ${JSON.stringify(err.response.data)}`;
        } else if (err.request) {
          console.error('No response received:', err.request);
          throw 'No response from server. Please check if the API server is running.';
        } else {
          console.error('Error setting up request:', err.message);
          throw `Request setup error: ${err.message}`;
        }
      } else {
        const errorMessage = err instanceof Error ? err.message : String(err);
        throw `Unknown error: ${errorMessage}`;
      }
    }
  },

  async getTourById(id: string): Promise<Tour> {
    const cacheKey = `${TOUR_CACHE_PREFIX}${id}`;
    const cachedTour = getCachedData<Tour>(cacheKey);

    if (cachedTour) {
      console.log(`Using cached data for tour ${id}`);
      return cachedTour;
    }

    try {
      console.log(`Fetching tour ${id} from API...`);
      const response = await axios.get<Tour>(`${API_BASE_URL}/tours/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(`API response for tour ${id}:`, response);
      const tour = response.data;

      setCachedData(cacheKey, tour);
      console.log(`Tour ${id} cached successfully`);

      return tour;
    } catch (err: unknown) {
      console.error(`Error fetching tour ${id}:`, err);

      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
          throw `API error: ${err.response.status} - ${JSON.stringify(err.response.data)}`;
        } else if (err.request) {
          console.error('No response received:', err.request);
          throw 'No response from server. Please check if the API server is running.';
        } else {
          console.error('Error setting up request:', err.message);
          throw `Request setup error: ${err.message}`;
        }
      } else {
        const errorMessage = err instanceof Error ? err.message : String(err);
        throw `Unknown error: ${errorMessage}`;
      }
    }
  },

  async getTourPerformances(tourId: string): Promise<Performance[]> {
    const cacheKey = `${PERFORMANCES_CACHE_PREFIX}${tourId}`;
    const cachedPerformances = getCachedData<Performance[]>(cacheKey);

    if (cachedPerformances) {
      console.log(`Using cached performances data for tour ${tourId}`);
      return cachedPerformances;
    }

    try {
      console.log(`Fetching performances for tour ${tourId} from API...`);
      const response = await axios.get<Performance[]>(`${API_BASE_URL}/tours/${tourId}/performances`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('API response for performances:', response);
      const performances = response.data;

      setCachedData(cacheKey, performances);
      console.log('Tour performances cached successfully');

      return performances;
    } catch (err: unknown) {
      console.error(`Error fetching performances for tour ${tourId}:`, err);

      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
          throw `API error: ${err.response.status} - ${JSON.stringify(err.response.data)}`;
        } else if (err.request) {
          throw 'No response from server. Please check if the API server is running.';
        } else {
          throw `Request setup error: ${err.message}`;
        }
      } else {
        const errorMessage = err instanceof Error ? err.message : String(err);
        throw `Unknown error: ${errorMessage}`;
      }
    }
  },

  clearCache(): void {
    localStorage.removeItem(TOURS_CACHE_KEY);

    // Clear individual tour caches
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith(TOUR_CACHE_PREFIX) || key.startsWith(PERFORMANCES_CACHE_PREFIX))) {
        localStorage.removeItem(key);
      }
    }
  }
};

export default apiService;
