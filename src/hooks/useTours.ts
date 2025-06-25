import { useState, useEffect } from 'react';
import apiService from '@/services';
import type { Tour } from '@/types';
import { useAppContext } from '@/context';

export const useTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getCachedTours, setCachedTours } = useAppContext();

  useEffect(() => {
    async function loadTours() {
      try {
        setLoading(true);

        const cachedTours = getCachedTours();
        if (cachedTours.length > 0) {
          setTours(cachedTours);
          setLoading(false);
          return;
        }

        const apiTours = await apiService.getAllTours();
        setTours(apiTours);
        setCachedTours(apiTours);
      } catch {
        setError('Failed to fetch tours');
      } finally {
        setLoading(false);
      }
    }

    loadTours();
  }, [getCachedTours, setCachedTours]);

  return { tours, loading, error };
};

export const useTour = (id: string) => {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    getCachedTourDetails,
    setCachedTourDetails,
    getCachedApiPerformances,
    setCachedApiPerformances
  } = useAppContext();

  useEffect(() => {
    if (!id) return;

    async function loadTour() {
      try {
        setLoading(true);

        const cachedTour = getCachedTourDetails(id);
        if (cachedTour) {
          const cachedPerformances = getCachedApiPerformances(id);
          cachedTour.performances = cachedPerformances;
          setTour(cachedTour);
          setLoading(false);
          return;
        }

        const tourData = await apiService.getTourById(id);
        try {
          const apiPerformances = await apiService.getTourPerformances(id);
          tourData.performances = apiPerformances;
          setCachedApiPerformances(id, apiPerformances);
        } catch {
          tourData.performances = [];
        }
        setCachedTourDetails(id, tourData);
        setTour(tourData);
      } catch {
        setError(`Failed to fetch tour ${id}`);
      } finally {
        setLoading(false);
      }
    }

    loadTour();
  }, [id, getCachedTourDetails, setCachedTourDetails, getCachedApiPerformances, setCachedApiPerformances]);

  return { tour, loading, error };
};
