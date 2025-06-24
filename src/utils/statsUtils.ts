import type { Tour } from '@/types';

export interface TourStats {
  totalPerformances: number;
  totalRevenue: number;
  averageFillRate: number;
}

export const calculateTourStats = (tours: Tour[]): TourStats => {
  if (!tours.length) {
    return {
      totalPerformances: 0,
      totalRevenue: 0,
      averageFillRate: 0
    };
  }

  const totalPerformances = tours.reduce((sum, tour) => sum + tour.totalPerformances, 0);
  const totalRevenue = tours.reduce((sum, tour) => sum + tour.totalRevenue, 0);

  const weightedFillRateSum = tours.reduce(
    (sum, tour) => sum + (tour.averageFillRate * tour.totalPerformances),
    0
  );

  const averageFillRate = totalPerformances > 0
    ? Math.round(weightedFillRateSum / totalPerformances)
    : 0;

  return {
    totalPerformances,
    totalRevenue,
    averageFillRate
  };
};
