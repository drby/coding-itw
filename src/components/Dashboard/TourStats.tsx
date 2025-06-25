import { type FC } from 'react';

import { Box, SimpleGrid, Text, Heading, Skeleton } from "@chakra-ui/react";
import { FillRateDisplay } from "@/components/common";
import { calculateTourStats } from "@/utils";
import type { Tour } from "@/types";

interface TourStatsProps {
  tours: Tour[];
  isLoading: boolean;
}

const TourStats: FC<TourStatsProps> = ({ tours, isLoading }) => {
  const stats = calculateTourStats(tours);

  return (
    <Box mb={6} p={4} borderWidth="1px" borderRadius="md" bg="var(--bg-surface)" shadow="sm">
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
        <Box>
          <Text fontSize="sm" color="var(--text-secondary)">Nombre Total de Représentations</Text>
          {isLoading ? (
            <Skeleton height="24px" width="80px" />
          ) : (
            <Heading size="md">{stats.totalPerformances}</Heading>
          )}
        </Box>

        <Box>
          <Text fontSize="sm" color="var(--text-secondary)">Revenu Total</Text>
          {isLoading ? (
            <Skeleton height="24px" width="120px" />
          ) : (
            <Heading size="md">€{stats.totalRevenue.toLocaleString()}</Heading>
          )}
        </Box>

        <Box>
          <Text fontSize="sm" color="var(--text-secondary)">Taux de Remplissage Moyen</Text>
          {isLoading ? (
            <Skeleton height="24px" width="100%" />
          ) : (
            <Box pt={1}>
              <FillRateDisplay
                fillRate={stats.averageFillRate}
                height="10px"
              />
            </Box>
          )}
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default TourStats;
