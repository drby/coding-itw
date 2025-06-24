import { useState, type FC, type ChangeEvent } from 'react';

import { Box, Heading, Text, Spinner, Flex } from "@chakra-ui/react";

import { useTours, useFilteredTours } from "@/hooks";
import { type StatusFilterType } from "@/types";

import { SearchBar, StatusFilter, TourCards, TourStats } from '@/components/Dashboard';

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

  const filteredTours = useFilteredTours(tours, searchQuery, statusFilter);

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
      <Heading as="h1" mb={4}>Tournées Théâtrales</Heading>

      <TourStats tours={tours} isLoading={loading} />

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
