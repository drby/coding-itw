import { createContext } from 'react';
import type { Performance, Tour } from '@/types';

export interface AppContextType {
  performances: Record<string, Performance[]>;
  addPerformance: (tourId: string, performance: Omit<Performance, 'id'>) => void;
  getPerformances: (tourId: string) => Performance[];

  cachedTours: Tour[];
  cachedTourDetails: Record<string, Tour>;
  cachedApiPerformances: Record<string, Performance[]>;

  setCachedTours: (tours: Tour[]) => void;
  setCachedTourDetails: (tourId: string, tour: Tour) => void;
  setCachedApiPerformances: (tourId: string, performances: Performance[]) => void;
  getCachedTours: () => Tour[];
  getCachedTourDetails: (tourId: string) => Tour | null;
  getCachedApiPerformances: (tourId: string) => Performance[];
}

export const AppContext = createContext<AppContextType>({
  performances: {},
  addPerformance: () => {},
  getPerformances: () => [],
  cachedTours: [],
  cachedTourDetails: {},
  cachedApiPerformances: {},
  setCachedTours: () => {},
  setCachedTourDetails: () => {},
  setCachedApiPerformances: () => {},
  getCachedTours: () => [],
  getCachedTourDetails: () => null,
  getCachedApiPerformances: () => []
});
