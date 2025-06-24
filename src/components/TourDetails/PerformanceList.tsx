import type { FC } from 'react';

import {
  Box,
  Heading,
  Text,
  Grid,
  SimpleGrid,
} from "@chakra-ui/react";

import type { Performance } from '@/types';
import { FillRateDisplay } from "@/components/common";

interface PerformanceListProps {
  performances: Performance[];
}

const PerformanceList: FC<PerformanceListProps> = ({ performances }) => {
  if (!performances || performances.length === 0) {
    return (
      <Box mt={8} p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
        <Text>Aucune représentation n'est disponible pour cette tournée.</Text>
      </Box>
    );
  }

  return (
    <Box mt={8}>
      <Heading size="md" mb={4}>Liste des Représentations</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {performances.map((performance) => {
          const soldTickets = Number(performance.ticketsSold) || 0;
          const capacity = Number(performance.capacity) || 1;
          const ticketPrice = Number(performance.ticketPrice) || 0;

          const fillRate = Math.round((soldTickets / capacity) * 100);
          const revenue = soldTickets * ticketPrice;

          return (
            <Box
              key={performance.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              transition="all 0.2s"
            >
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Heading size="sm">{new Date(performance.date).toLocaleDateString('fr-FR')}</Heading>
              </Box>
              <Box mb={3}>
                <FillRateDisplay fillRate={fillRate} height="8px" />
              </Box>

              <Text fontWeight="bold" mb={1}>{performance.city}</Text>
              <Text mb={3}>{performance.venue}</Text>

              <Grid templateColumns="1fr 1fr" gap={2} fontSize="sm">
                <Text>Capacité:</Text>
                <Text textAlign="right">{performance.capacity}</Text>

                <Text>Billets vendus:</Text>
                <Text textAlign="right">{performance.ticketsSold}</Text>

                <Text>Prix du billet:</Text>
                <Text textAlign="right">€{performance.ticketPrice}</Text>

                <Text fontWeight="bold">Revenu:</Text>
                <Text textAlign="right" fontWeight="bold">€{revenue.toLocaleString()}</Text>
              </Grid>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default PerformanceList;
