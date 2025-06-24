import axios from 'axios';
import type { Tour, Performance } from '@/types';

const API_BASE_URL = '/api';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.timeout = 10000;

type CacheItem<T> = {
  data: T;
  timestamp: number;
};

const cache = {
  get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      const parsed = JSON.parse(item) as CacheItem<T>;

      if (Date.now() - parsed.timestamp > CACHE_EXPIRY) {
        localStorage.removeItem(key);
        return null;
      }

      return parsed.data;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  },

  set<T>(key: string, data: T): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  clear(prefix?: string): void {
    if (prefix) {
      // Clear items with specific prefix
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(prefix)) {
          localStorage.removeItem(key);
        }
      }
    } else {
      localStorage.removeItem('tours');
      this.clear('tour_');
      this.clear('performances_');
    }
  }
};

const handleApiError = (err: unknown): never => {
  if (axios.isAxiosError(err)) {
    if (err.response) {
      throw `API error: ${err.response.status} - ${err.response.statusText}`;
    } else if (err.request) {
      throw 'No response from server. Is the API server running?';
    } else {
      throw `Request error: ${err.message}`;
    }
  }
  throw String(err);
};

const apiService = {
  async getAllTours(): Promise<Tour[]> {
    const cachedTours = cache.get<Tour[]>('tours');
    if (cachedTours) return cachedTours;

    try {
      const response = await axios.get<Tour[]>(`${API_BASE_URL}/tours`);
      cache.set('tours', response.data);
      return response.data;
    } catch (err) {
      return handleApiError(err);
    }
  },

  async getTourById(id: string): Promise<Tour> {
    const cacheKey = `tour_${id}`;
    const cachedTour = cache.get<Tour>(cacheKey);
    if (cachedTour) return cachedTour;

    try {
      const response = await axios.get<Tour>(`${API_BASE_URL}/tours/${id}`);
      cache.set(cacheKey, response.data);
      return response.data;
    } catch (err) {
      return handleApiError(err);
    }
  },

  async getTourPerformances(tourId: string): Promise<Performance[]> {
    const cacheKey = `performances_${tourId}`;
    const cachedPerformances = cache.get<Performance[]>(cacheKey);
    if (cachedPerformances) return cachedPerformances;

    try {
      const response = await axios.get<Performance[]>(`${API_BASE_URL}/tours/${tourId}/performances`);
      cache.set(cacheKey, response.data);
      return response.data;
    } catch (err) {
      return handleApiError(err);
    }
  },

  clearCache(): void {
    cache.clear();
  }
};

export default apiService;
