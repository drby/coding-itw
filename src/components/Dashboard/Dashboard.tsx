import { useState, useMemo, type FC, type ChangeEvent } from 'react';

import { Box, Heading, Text, Spinner, Flex } from "@chakra-ui/react";

import { useTours } from "../../hooks/useTours";
import { type StatusFilterType } from "../../types/dashboard.types";

import SearchBar from "./SearchBar";
import StatusFilter from "./StatusFilter";
import TourCards from "./TourCards";

interface DashboardProps {
  onSelectTour?: (tourId: string | number) => void;
}

const Dashboard: FC<DashboardProps> = ({ onSelectTour }) => {
  const { tours, loading, error } = useTours();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>('all');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilter = (status: StatusFilterType) => {
    setStatusFilter(status);
  };

  const filteredTours = useMemo(() => {
    let filtered = [...tours];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(tour => {
        const normalizedStatus = tour.status.trim().toLowerCase();

        switch (statusFilter) {
          case 'planifiée':
            return ['planifiée', 'planifiee', 'planned'].includes(normalizedStatus);
          case 'en cours':
            return ['en cours', 'ongoing', 'in progress'].includes(normalizedStatus);
          case 'terminée':
            return ['terminée', 'terminee', 'completed'].includes(normalizedStatus);
          case 'annulée':
            return ['annulée', 'annulee', 'cancelled', 'canceled'].includes(normalizedStatus);
          default:
            return true;
        }
      });
    }

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

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" color="teal.500" />
        <Text mt={4} fontSize="lg" fontWeight="medium">Chargement des tournées...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={10} color="red.500">
        <Text fontSize="lg" fontWeight="medium">
          Erreur lors du chargement des tournées: {error}
        </Text>
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Heading mb={4}>Tournées Théâtrales</Heading>

      <Flex direction={{ base: 'column', md: 'row' }} gap={4} mb={6}>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <StatusFilter
          currentFilter={statusFilter}
          onFilterChange={handleStatusFilter}
        />
      </Flex>

      <TourCards tours={filteredTours} onSelectTour={onSelectTour} />
    </Box>
  );
};

export default Dashboard;
