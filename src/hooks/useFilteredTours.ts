import { useMemo } from 'react';

import type { Tour, StatusFilterType } from '@/types';

export const useFilteredTours = (
  tours: Tour[],
  searchQuery: string,
  statusFilter: StatusFilterType
) => {
  return useMemo(() => {
    let filtered = [...tours];

    // Status filtering
    if (statusFilter !== 'all') {
      const statusMap = {
        'planifiée': ['planifiée', 'planifiee', 'planned'],
        'en cours': ['en cours', 'ongoing', 'in progress'],
        'terminée': ['terminée', 'terminee', 'completed'],
        'annulée': ['annulée', 'annulee', 'cancelled', 'canceled']
      };

      const matchingStatuses = statusMap[statusFilter as keyof typeof statusMap] || [];
      filtered = filtered.filter(tour => 
        matchingStatuses.includes(tour.status.trim().toLowerCase())
      );
    }

    // Search filtering
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(tour =>
        tour.name.toLowerCase().includes(query) ||
        tour.show.title.toLowerCase().includes(query) ||
        tour.status.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [tours, searchQuery, statusFilter]);
};
