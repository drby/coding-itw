import { useState, useEffect, type ReactNode } from 'react';
import { AppContext } from './AppContext';

import type { Performance, Tour } from '@/types';

interface AppProviderProps {
  children: ReactNode;
}

const USER_PERFORMANCES_KEY = 'app_user_performances';
const API_TOURS_KEY = 'app_api_tours';
const API_TOUR_DETAILS_KEY = 'app_api_tour_details';
const API_PERFORMANCES_KEY = 'app_api_performances';

const CACHE_EXPIRY = 5 * 60 * 1000;

type CachedItem<T> = {
  data: T;
  timestamp: number;
};

const saveToStorage = <T,>(key: string, data: T): boolean => {
  try {
    const cachedItem: CachedItem<T> = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(cachedItem));
    return true;
  } catch (err) {
    console.error(`Failed to save ${key} to localStorage:`, err instanceof Error ? err.message : String(err));
    return false;
  }
};

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;

    const cachedItem = JSON.parse(item) as CachedItem<T>;

    if (Date.now() - cachedItem.timestamp > CACHE_EXPIRY) {
      localStorage.removeItem(key);
      return defaultValue;
    }

    return cachedItem.data;
  } catch (err) {
    console.error(`Failed to load ${key} from localStorage:`, err instanceof Error ? err.message : String(err));
    return defaultValue;
  }
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [performances, setPerformances] = useState<Record<string, Performance[]>>(() => {
    return loadFromStorage(USER_PERFORMANCES_KEY, {});
  });
  const [cachedTours, setCachedTours] = useState<Tour[]>(() => {
    return loadFromStorage(API_TOURS_KEY, []);
  });
  const [cachedTourDetails, setCachedTourDetails] = useState<Record<string, Tour>>(() => {
    return loadFromStorage(API_TOUR_DETAILS_KEY, {});
  });
  const [cachedApiPerformances, setCachedApiPerformances] = useState<Record<string, Performance[]>>(() => {
    return loadFromStorage(API_PERFORMANCES_KEY, {});
  });

  useEffect(() => {
    saveToStorage(USER_PERFORMANCES_KEY, performances);
  }, [performances]);
  useEffect(() => {
    saveToStorage(API_TOURS_KEY, cachedTours);
  }, [cachedTours]);

  useEffect(() => {
    saveToStorage(API_TOUR_DETAILS_KEY, cachedTourDetails);
  }, [cachedTourDetails]);

  useEffect(() => {
    saveToStorage(API_PERFORMANCES_KEY, cachedApiPerformances);
  }, [cachedApiPerformances]);

  const addPerformance = (tourId: string, performance: Omit<Performance, 'id'>) => {
    setPerformances(prev => {
      const tourPerformances = prev[tourId] || [];
      return {
        ...prev,
        [tourId]: [
          ...tourPerformances,
          { ...performance, id: `local-${Date.now()}` }
        ]
      };
    });
  };

  const getPerformances = (tourId: string): Performance[] => {
    return performances[tourId] || [];
  };

  const handleSetCachedTours = (tours: Tour[]) => {
    setCachedTours(tours);
  };

  const handleSetCachedTourDetails = (tourId: string, tour: Tour) => {
    setCachedTourDetails(prev => ({
      ...prev,
      [tourId]: tour
    }));
  };

  const handleSetCachedApiPerformances = (tourId: string, apiPerformances: Performance[]) => {
    setCachedApiPerformances(prev => ({
      ...prev,
      [tourId]: apiPerformances
    }));
  };

  const getCachedTours = (): Tour[] => {
    return cachedTours;
  };

  const getCachedTourDetails = (tourId: string): Tour | null => {
    return cachedTourDetails[tourId] || null;
  };

  const getCachedApiPerformances = (tourId: string): Performance[] => {
    return cachedApiPerformances[tourId] || [];
  };

  return (
    <AppContext.Provider value={{
      performances,
      addPerformance,
      getPerformances,
      cachedTours,
      cachedTourDetails,
      cachedApiPerformances,
      setCachedTours: handleSetCachedTours,
      setCachedTourDetails: handleSetCachedTourDetails,
      setCachedApiPerformances: handleSetCachedApiPerformances,
      getCachedTours,
      getCachedTourDetails,
      getCachedApiPerformances
    }}>
      {children}
    </AppContext.Provider>
  );
};
