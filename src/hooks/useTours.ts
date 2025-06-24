import { useState, useEffect } from 'react';
import apiService from '../services/api';
import type { Tour } from '../types/tour.types';

export const useTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const data = await apiService.getAllTours();
        setTours(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch tours');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return { tours, loading, error };
};

export const useTour = (id: string) => {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTourWithPerformances = async () => {
      try {
        setLoading(true);
        const tourData = await apiService.getTourById(id);

        try {
          // Fetch performances for this tour
          const performances = await apiService.getTourPerformances(id);
          // Add performances to the tour data
          tourData.performances = performances;
        } catch (perfErr) {
          console.error(`Error fetching performances for tour ${id}:`, perfErr);
          // Don't fail the whole request if performances fail
          // Just log the error and continue with the tour data
        }

        setTour(tourData);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch tour with ID: ${id}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTourWithPerformances();
    }
  }, [id]);

  return { tour, loading, error };
};
