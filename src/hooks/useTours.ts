import { useState, useEffect } from 'react';
import apiService from '@/services';
import type { Tour } from '@/types';

export const useTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTours() {
      try {
        setLoading(true);
        setTours(await apiService.getAllTours());
      } catch {
        setError('Failed to fetch tours');
      } finally {
        setLoading(false);
      }
    }

    loadTours();
  }, []);

  return { tours, loading, error };
};

export const useTour = (id: string) => {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function loadTour() {
      try {
        setLoading(true);

        const tourData = await apiService.getTourById(id);

        try {
          tourData.performances = await apiService.getTourPerformances(id);
        } catch {
          tourData.performances = [];
        }

        setTour(tourData);
      } catch {
        setError(`Failed to fetch tour ${id}`);
      } finally {
        setLoading(false);
      }
    }

    loadTour();
  }, [id]);

  return { tour, loading, error };
};
